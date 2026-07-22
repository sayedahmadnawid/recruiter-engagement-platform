<?php

namespace App\Services\Resume;

class ResumeParser
{
    public function parse(string $text): array
    {
        return [
            'name'  => $this->extractName($text),
            'email' => $this->extractEmail($text),
            'phone' => $this->extractPhone($text),
        ];
    }

    private function extractEmail(string $text): ?string
    {
        preg_match('/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i', $text, $matches);
        return $matches[0] ?? null;
    }

    private function extractPhone(string $text): ?string
    {
        // Matches common formats: (123) 456-7890, 123-456-7890, +1 123 456 7890
        preg_match('/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/', $text, $matches);
        return $matches[0] ?? null;
    }

    private function extractName(string $text): ?string
    {
        // Simplest approach: The first line of the document is often the name
        return explode("\n", trim($text))[0] ?? null;
    }
}
