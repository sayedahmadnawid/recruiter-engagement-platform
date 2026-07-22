<?php

namespace App\Jobs;

use App\Models\Resume;
use App\Services\Resume\ResumeProcessingService;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

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
    public function handle(ResumeProcessingService $service): void
    {

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

            $result = $service->process($path);

            $this->resume->update([
                'extracted_text' => $result['extracted_text'],
                'parsed_data'    => $result['parsed_data'],
                'status'         => 'completed',
            ]);
        } catch (\Exception $e) {
            $this->resume->update(['status' => 'failed']);
            // Re-throw to allow Laravel to log the failure in 'failed_jobs'
            throw $e;
        }
    }
}
