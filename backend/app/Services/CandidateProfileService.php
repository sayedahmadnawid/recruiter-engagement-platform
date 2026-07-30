<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\Resume;
use App\Models\CandidateProfile;

class CandidateProfileService
{

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
}
