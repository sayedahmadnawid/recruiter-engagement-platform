<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:50'],
            'company' => ['required', 'string', 'max:255'],
            'job_title' => ['required', 'string', 'max:50'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'status' => [
                'required',
                Rule::in([
                    'new',
                    'contacted',
                    'responded',
                    'interviewing',
                    'offer',
                    'hired',
                    'rejected',
                ]),
            ],
            'notes' => ['nullable', 'string'],
            'resume'       => 'required|file|mimes:pdf,docx|max:4096',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.max' => 'The name may not be greater than 50 characters.',
            'email.required' => 'The email field is required.',
            'company.required' => 'The company field is required.',
            'job_title.required' => 'The job title field is required.',
            'linkedin_url.required' => 'The LinkedIn URL field is required.',
            'linkedin_url.url' => 'The LinkedIn URL must be a valid URL.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The selected status is invalid.',
            'email.unique' => 'A lead with this email address already exists.',
            'resume.mimes' => 'The resume must be a PDF file.',
            'resume.max' => 'The resume size must not exceed 4MB.',
            'resume.required' => 'The resume field is required.',


        ];
    }
}
