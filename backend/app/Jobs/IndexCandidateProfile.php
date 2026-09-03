<?php

namespace App\Jobs;

use App\Models\CandidateProfile;
use App\Services\Vector\EmbeddingGenerator;
use App\Services\Vector\PineconeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class IndexCandidateProfile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 10;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $candidateProfileId,
    ) {}

    public function backoff(): array
    {
        return [10, 30, 60]; // retry delays for attempts 1, 2, 3
    }

    /**
     * Execute the job.
     */
    public function handle(EmbeddingGenerator $embeddings, PineconeService $pinecone): void
    {
        $profile = CandidateProfile::find($this->candidateProfileId);

        if (!$profile) {
            // Profile was deleted before the job ran — nothing to do.
            return;
        }

        $text = $this->buildEmbeddingText($profile);

        if (trim($text) === '') {
            Log::info('Skipping embedding: no content', ['candidate_profile_id' => $profile->id]);
            return;
        }

        $vector = $embeddings->embed($text);

        $pinecone->upsert(
            id: (string) $profile->id,
            vector: $vector,
            metadata: [
                'candidate_id' => $profile->id,
                'title' => $profile->current_title,
                'location' => $profile->location,
            ],
        );

        $profile->update(['embedded_at' => now()]);
    }


    protected function buildEmbeddingText(CandidateProfile $profile): string
    {

        $result = collect([
            $profile->current_title ? "Title: {$profile->current_title}" : null,
            $this->flattenSkills($profile->skills) ? "Skills: " . $this->flattenSkills($profile->skills) : null,
            $this->flattenExperience($profile->experience) ? "Experience:\n" . $this->flattenExperience($profile->experience) : null,
        ])
            ->filter()
            ->implode("\n\n");

        return $result;
    }

    protected function flattenSkills(?array $skills): ?string
    {
        if (empty($skills)) {
            return '';
        }

        // Handle raw JSON string if model attribute isn't cast to array
        if (is_string($skills)) {
            $skills = json_decode($skills, true) ?? [];
        }

        return is_array($skills)
            ? implode(', ', array_filter($skills))
            : (string) $skills;
    }

    protected function flattenExperience(?array $experience): ?string
    {
        if (empty($experience)) {
            return '';
        }

        if (is_string($experience)) {
            $experience = json_decode($experience, true) ?? [];
        }

        if (!is_array($experience)) {
            return (string) $experience;
        }

        return collect($experience)
            ->map(function ($item) {
                $title = $item['title'] ?? '';
                $company = $item['company'] ?? '';
                $desc = $item['description'] ?? '';

                if (!$title && !$company && !$desc) {
                    return null;
                }

                return "{$title} at {$company}: {$desc}";
            })
            ->filter()
            ->implode("\n");
    }
}
