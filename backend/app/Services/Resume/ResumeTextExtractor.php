<?php

namespace App\Services\Resume;

use Smalot\PdfParser\Parser;
use ZipArchive;

class ResumeTextExtractor
{
    public function extract(string $filePath): string
    {
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);

        return $extension === 'docx' ? $this->extractDocx($filePath) : $this->extractPdf($filePath);
    }

    private function extractPdf(string $path): string
    {
        return (new Parser())->parseFile($path)->getText();
    }

    private function extractDocx(string $path): string
    {
        $zip = new ZipArchive();
        if ($zip->open($path) === true) {
            $content = $zip->getFromName('word/document.xml');
            $zip->close();
            return strip_tags($content);
        }
        return '';
    }
}
