<?php

namespace App\Http\Requests\CandidateProfile;

use Illuminate\Foundation\Http\FormRequest;

class CandidateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lead_id' => ['required', 'exists:leads,id'],
            'full_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'current_title' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],

            // Structured JSON attributes
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string'],
            'experience' => ['nullable', 'array'],
            'education' => ['nullable', 'array'],
            'certifications' => ['nullable', 'array'],
        ];
    }
}