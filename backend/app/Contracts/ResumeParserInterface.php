<?php

namespace App\Contracts;

interface ResumeParserInterface
{
    /**
     * Takes raw text extracted from a resume and returns a structured array.
     *
     * @return array{
     *   full_name: ?string,
     *   email: ?string,
     *   phone: ?string,
     *   current_title: ?string,
     *   location: ?string,
     *   skills: array<string>,
     *   experience: array<array{title: string, company: string, dates: ?string, description: ?string}>,
     *   education: array<array{degree: string, institution: string, year: ?string}>,
     *   certifications: array<string>
     * }
     */
    public function parse(string $rawText): array;
}
