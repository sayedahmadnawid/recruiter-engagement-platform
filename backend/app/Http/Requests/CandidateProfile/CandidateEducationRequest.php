<?php

namespace App\Http\Requests\CandidateProfile;

use Illuminate\Foundation\Http\FormRequest;

class CandidateEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'education'             => ['required', 'array'],
            'education.*.school'    => ['required', 'string', 'max:255'],
            'education.*.degree'    => ['nullable', 'string', 'max:255'],
            'education.*.field'     => ['nullable', 'string', 'max:255'],
            'education.*.start_year' => ['nullable', 'digits:4'],
            'education.*.end_year'  => ['nullable', 'digits:4'],
        ];
    }
}
