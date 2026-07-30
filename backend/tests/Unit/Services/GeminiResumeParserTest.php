<?php

namespace Tests\Services\Unit;

use App\Services\Parsers\GeminiResumeParser;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GeminiResumeParserTest extends TestCase
{
    /** @test */
    public function test_it_parses_raw_text_into_structured_array()
    {
        config(['services.gemini.api_key' => 'fake-key']);
        config(['services.gemini.model' => 'gemini-3.6-flash']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => '{"full_name": "Sayed Nawid", "skills": ["React.js"]}']
                            ]
                        ]
                    ]
                ]
            ], 200),
        ]);

        $parser = new GeminiResumeParser();
        $result = $parser->parse('Sayed Nawid - React.js Developer');

        $this->assertEquals('Sayed Nawid', $result['full_name']);
        $this->assertContains('React.js', $result['skills']);
    }
}