<?php

namespace App\Jobs;

use App\Contracts\ResumeParserInterface;
use App\Models\Resume;
use App\Services\Resume\ResumeProcessingService;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\CandidateProfileService;
use App\Services\Resume\ResumeTextExtractor;

class ProcessResume implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Resume $resume) {}

    /**
     * Execute the job.
     */
    public function handle(
        ResumeTextExtractor $extractor,
        ResumeParserInterface $parser,
        CandidateProfileService $profileBuilder
    ): void {

        // Mark as processing
        $this->resume->update(['status' => 'processing']);

        try {
            $path = $this->resume->absolute_path;

            if (!$this->resume->fileExists()) {
                $this->resume->update(['status' => 'failed']);

                // Log the error for debugging
                \Log::error("Resume file not found at: {$path} for Resume ID: {$this->resume->id}");

                return; // Stop processing
            }

            $rawText = $extractor->extract($path);

            $parsedData = $parser->parse($rawText);

            $this->resume->update([
                'raw_text' => $rawText,
                'parsed_data' => $parsedData,
                'status' => 'completed',
            ]);

            $profileBuilder->buildFromParsedResume($this->resume->lead, $this->resume);
        } catch (\Exception $e) {
            $this->resume->update(['status' => 'failed']);
            // Re-throw to allow Laravel to log the failure in 'failed_jobs'
            throw $e;
        }
    }
}
