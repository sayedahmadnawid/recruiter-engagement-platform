<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\Resume;
use App\Models\CandidateProfile;
use App\Services\Vector\EmbeddingGenerator;
use App\Services\Vector\PineconeService;
use Illuminate\Support\Collection;

class CandidateProfileService
{

    public function __construct(
        protected EmbeddingGenerator $embeddings,
        protected PineconeService $pinecone,
    ) {}

    /**
     * Build or update a candidate profile from parsed resume data.
     *
     * @param Lead $lead
     * @param Resume $resume
     * @return CandidateProfile
     */
    public function buildFromParsedResume(Lead $lead, Resume $resume): CandidateProfile
    {
        $parsed = $resume->parsed_data ?? [];

        return CandidateProfile::updateOrCreate(
            ['lead_id' => $lead->id],
            [
                'full_name'      => $parsed['name'] ?? $lead->name,
                'email'          => $parsed['email'] ?? $lead->email,
                'phone'          => $parsed['phone'] ?? null,
                'current_title'  => $parsed['current_title'] ?? null,
                'location'       => $parsed['location'] ?? null,
                'skills'         => $parsed['skills'] ?? [],
                'experience'     => $parsed['experience'] ?? [],
                'education'      => $parsed['education'] ?? [],
                'certifications' => $parsed['certifications'] ?? [],
            ]
        );
    }

    /**
     * @return Collection<int, array{profile: CandidateProfile, score: float}>
     */
    public function search(string $query, int $topK = 5): Collection
    {
        $vector = $this->embeddings->embed($query);

        $matches = $this->pinecone->query(vector: $vector, topK: $topK);

        if (empty($matches)) {
            return collect();
        }

        $scoresById = collect($matches)->pluck('score', 'id');

        $profiles = CandidateProfile::with('lead:id')->whereIn('id', $scoresById->keys())
            ->get()
            ->keyBy('id');

        return $scoresById
            ->map(function (float $score, string $id) use ($profiles) {
                $profile = $profiles->get((int) $id);

                if (!$profile) {
                    return null;
                }

                return [
                    'profile' => $profile,
                    'score' => $score,
                ];
            })
            ->filter()
            ->sortByDesc('score')
            ->values();
    }
}
