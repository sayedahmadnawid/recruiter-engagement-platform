<?php

namespace App\Http\Requests\CandidateProfile;

use Illuminate\Foundation\Http\FormRequest;

class CandidateExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'experience'               => ['required', 'array'],
            'experience.*.title'       => ['required', 'string', 'max:255'],
            'experience.*.company'     => ['required', 'string', 'max:255'],
            'experience.*.location'    => ['nullable', 'string', 'max:255'],
            'experience.*.start_date'  => ['nullable', 'date'],
            'experience.*.end_date'    => ['nullable', 'date'],
            'experience.*.description' => ['nullable', 'string'],
        ];
    }
}
