<?php

namespace App\Services\Parsers;

use App\Contracts\ResumeParserInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAiResumeParser implements ResumeParserInterface
{
    public function parse(string $rawText): array
    {
        $apiKey = config('services.openai.api_key');

        if (!$apiKey) {
            Log::error('OpenAI API key is not set.');
            return [];
        }

        $model = config('services.openai.model', 'gpt-4o-mini');

        /**  1# prompt
        $prompt = "You are an expert HR applicant tracking system parser. Extract candidate information from the following 
        raw resume text into strict JSON matching the required schema.\n\nResume Text:\n" . $rawText;
         */

        /**  #2 prompt
        $prompt = "You are an expert HR applicant tracking system parser. Extract candidate information "
            . "from the following raw resume text into strict JSON matching the required schema.\n\n"
            . "For each work experience entry:\n"
            . "- start_date and end_date must be formatted as YYYY-MM (year and month). If only a year is "
            . "given, use YYYY-01.\n"
            . "- If the role is current/ongoing (e.g. \"Present\", \"Current\", no end date given), set "
            . "is_current to true and end_date to null.\n"
            . "- If dates cannot be determined at all, set start_date and/or end_date to null.\n\n"
            . "Resume Text:\n" . $rawText;
         */
        // 3# prompt
        $prompt = "You are an expert HR applicant tracking system parser. Extract candidate information "
            . "from the following raw resume text into strict JSON matching the required schema.\n\n"
            . "For each work experience entry:\n"
            . "- start_date and end_date must be formatted as YYYY-MM (year and month). If only a year is "
            . "given, use YYYY-01.\n"
            . "- If the role is current/ongoing (e.g. \"Present\", \"Current\", no end date given), set "
            . "is_current to true and end_date to null.\n"
            . "- If dates cannot be determined at all, set start_date and/or end_date to null.\n\n"
            . "For each education entry:\n"
            . "- degree and institution are required. If either is missing or cannot be determined, do not "
            . "include that education entry.\n"
            . "- field is the area of study (e.g. \"Computer Science\", \"Business Administration\"). If not "
            . "stated, set it to null.\n"
            . "- start_date and end_date must be formatted as YYYY-MM (year and month). If only a year is "
            . "given, use YYYY-01. If a date cannot be determined, set it to null.\n"
            . "- If the education is current/ongoing (e.g. \"Present\", \"Expected 2026\"), set end_date to "
            . "null.\n\n"
            . "Resume Text:\n" . $rawText;

        $response = Http::withToken($apiKey)
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => $model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
                'response_format' => [
                    'type' => 'json_schema',
                    'json_schema' => [
                        'name' => 'resume_extraction',
                        'strict' => true,
                        'schema' => [
                            'type' => 'object',
                            'properties' => [
                                'full_name'     => ['type' => ['string', 'null']],
                                'email'         => ['type' => ['string', 'null']],
                                'phone'         => ['type' => ['string', 'null']],
                                'current_title' => ['type' => ['string', 'null']],
                                'location'      => ['type' => ['string', 'null']],
                                'skills'        => [
                                    'type' => 'array',
                                    'items' => ['type' => 'string'],
                                ],
                                'experience' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'title'       => ['type' => 'string'],
                                            'company'     => ['type' => 'string'],
                                            'location'    => ['type' => ['string', 'null']],
                                            'start_date'  => ['type' => ['string', 'null']],
                                            'end_date'    => ['type' => ['string', 'null']],
                                            'is_current'  => ['type' => 'boolean'],
                                            'description' => ['type' => ['string', 'null']],
                                        ],
                                        'required' => [
                                            'title',
                                            'company',
                                            'location',
                                            'start_date',
                                            'end_date',
                                            'is_current',
                                            'description',
                                        ],
                                        'additionalProperties' => false,
                                    ],
                                ],
                                'education' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'degree'      => ['type' => 'string'],
                                            'institution' => ['type' => 'string'],
                                            'field'       => ['type' => ['string', 'null']],
                                            'start_date'  => ['type' => ['string', 'null']],
                                            'end_date'    => ['type' => ['string', 'null']],
                                        ],
                                        'required' => ['degree', 'institution', 'field', 'start_date', 'end_date'],
                                        'additionalProperties' => false,
                                    ],
                                ],
                                'certifications' => [
                                    'type' => 'array',
                                    'items' => ['type' => 'string'],
                                ],
                            ],
                            'required' => [
                                'full_name',
                                'email',
                                'phone',
                                'current_title',
                                'location',
                                'skills',
                                'experience',
                                'education',
                                'certifications',
                            ],
                            'additionalProperties' => false,
                        ],
                    ],
                ],
            ]);

        if ($response->failed()) {
            Log::error('OpenAI Resume Parsing Failed', [
                'status' => $response->status(),
                'error'  => $response->body(),
            ]);
            return [];
        }

        $jsonText = $response->json('choices.0.message.content');

        return $jsonText ? json_decode($jsonText, true) : [];
    }
}
