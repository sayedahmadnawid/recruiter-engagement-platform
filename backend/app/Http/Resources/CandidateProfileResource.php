<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'lead_id' => $this->lead_id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'current_title' => $this->current_title,
            'location' => $this->location,

            // JSON Attributes
            'skills' => $this->skills ?? [],
            'experience' => $this->experience ?? [],
            'education' => $this->education ?? [],
            'certifications' => $this->certifications ?? [],

            // Relationships (included when loaded)
            'lead' => $this->whenLoaded('lead'),

            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
