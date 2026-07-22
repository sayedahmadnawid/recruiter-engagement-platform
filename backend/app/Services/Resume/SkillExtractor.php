<?php

namespace App\Services\Resume;

class SkillExtractor
{
    private array $dictionary = [
        'Laravel',
        'PHP',
        'Java',
        'React',
        'Vue',
        'Docker',
        'AWS',
        'Azure',
        'Git',
        'MySQL',
        'PostgreSQL',
        'Redis',
        'Linux',
        'Python',
        'Node.js',
        'TypeScript',
        'Kubernetes',
    ];

    public function extract(string $text): array
    {
        $found = [];
        foreach ($this->dictionary as $skill) {
            // Use word boundaries (\b) so "Java" doesn't match "JavaScript"
            if (preg_match('/\b' . preg_quote($skill, '/') . '\b/i', $text)) {
                $found[] = $skill;
            }
        }
        return $found;
    }
}
