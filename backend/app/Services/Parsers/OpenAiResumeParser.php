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

        $prompt = "You are an expert HR applicant tracking system parser. Extract candidate information from the following raw resume text into strict JSON matching the required schema.\n\nResume Text:\n" . $rawText;

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
                                            'dates'       => ['type' => ['string', 'null']],
                                            'description' => ['type' => ['string', 'null']],
                                        ],
                                        'required' => ['title', 'company', 'dates', 'description'],
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
                                            'year'        => ['type' => ['string', 'null']],
                                        ],
                                        'required' => ['degree', 'institution', 'year'],
                                        'additionalProperties' => false,
                                    ],
                                ],
                                'certifications' => [
                                    'type' => 'array',
                                    'items' => ['type' => 'string'],
                                ],
                            ],
                            'required' => [
                                'full_name', 'email', 'phone', 'current_title', 'location',
                                'skills', 'experience', 'education', 'certifications',
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