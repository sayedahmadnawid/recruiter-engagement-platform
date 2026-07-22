<?php

namespace App\Services\Resume;

class ResumeProcessingService
{
    public function __construct(
        protected ResumeTextExtractor $extractor,
        protected ResumeParser $parser,
        protected SkillExtractor $skillExtractor
    ) {}

    /**
     * Orchestrates the full parsing pipeline.
     * 
     * @param string $filePath The storage path of the file
     * @return array The complete structured resume data
     */
    public function process(string $filePath): array
    {
        // 1. Extract raw text from the file
        $text = $this->extractor->extract($filePath);

        // 2. Parse basic contact info
        $data = $this->parser->parse($text);

        // 3. Extract skills from the text
        $data['skills'] = $this->skillExtractor->extract($text);

        // 4. Return the full payload (plus raw text for debugging/fallback)
        return [
            'extracted_text' => $text,
            'parsed_data'    => $data,
        ];
    }
}
