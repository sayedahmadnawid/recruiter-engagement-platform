<?php

namespace App\Services\Parsers;

use App\Contracts\ResumeParserInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiResumeParser implements ResumeParserInterface
{
    public function parse(string $rawText): array
    {
        $apiKey = config('services.gemini.api_key');

        if (!$apiKey) {
            Log::error('Gemini API key is not set.');
            return [];
        }

        $model = config('services.gemini.model');
        $apiKey = config('services.gemini.api_key');

        $prompt = "You are an expert HR applicant tracking system parser. Extract candidate information from the following raw resume text into strict JSON matching the required schema.\n\nResume Text:\n" . $rawText;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'response_mime_type' => 'application/json',
                'response_schema' => [
                    'type' => 'OBJECT',
                    'properties' => [
                        'full_name'      => ['type' => 'STRING', 'nullable' => true],
                        'email'          => ['type' => 'STRING', 'nullable' => true],
                        'phone'          => ['type' => 'STRING', 'nullable' => true],
                        'current_title'  => ['type' => 'STRING', 'nullable' => true],
                        'location'       => ['type' => 'STRING', 'nullable' => true],
                        'skills'         => [
                            'type' => 'ARRAY',
                            'items' => ['type' => 'STRING']
                        ],
                        'experience'     => [
                            'type' => 'ARRAY',
                            'items' => [
                                'type' => 'OBJECT',
                                'properties' => [
                                    'title'       => ['type' => 'STRING'],
                                    'company'     => ['type' => 'STRING'],
                                    'dates'       => ['type' => 'STRING', 'nullable' => true],
                                    'description' => ['type' => 'STRING', 'nullable' => true],
                                ],
                                'required' => ['title', 'company']
                            ]
                        ],
                        'education'      => [
                            'type' => 'ARRAY',
                            'items' => [
                                'type' => 'OBJECT',
                                'properties' => [
                                    'degree'      => ['type' => 'STRING'],
                                    'institution' => ['type' => 'STRING'],
                                    'year'        => ['type' => 'STRING', 'nullable' => true],
                                ],
                                'required' => ['degree', 'institution']
                            ]
                        ],
                        'certifications' => [
                            'type' => 'ARRAY',
                            'items' => ['type' => 'STRING']
                        ]
                    ],
                    'required' => ['skills', 'experience', 'education', 'certifications']
                ]
            ]
        ]);

        if ($response->failed()) {
            Log::error('Gemini Resume Parsing Failed', [
                'status' => $response->status(),
                'error'  => $response->body()
            ]);
            return [];
        }

        $jsonText = $response->json('candidates.0.content.parts.0.text');

        return $jsonText ? json_decode($jsonText, true) : [];
    }
}
