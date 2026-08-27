<?php

namespace App\Http\Requests\CandidateProfile;

use Illuminate\Foundation\Http\FormRequest;

class CandidateCertificationsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'certifications'               => ['required', 'array'],
            'certifications.*.name'        => ['required', 'string', 'max:255'],
            'certifications.*.issuing_organization'      => ['nullable', 'string', 'max:255'],
            'certifications.*.issued_date' => ['nullable', 'date'],
            'certifications.*.credential_id_or_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
