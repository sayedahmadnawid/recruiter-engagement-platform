<?php

namespace App\Http\Requests\CandidateProfile;

use Illuminate\Foundation\Http\FormRequest;

class CandidateSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skills'   => ['required', 'array'],
            'skills.*' => ['required', 'string', 'max:100'],
        ];
    }
}
