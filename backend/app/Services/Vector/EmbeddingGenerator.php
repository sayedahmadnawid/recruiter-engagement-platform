<?php

namespace App\Services\Vector;

use Illuminate\Support\Facades\Http;
use RuntimeException;
use Illuminate\Support\Facades\Log;

class EmbeddingGenerator
{
    protected string $apiKey;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key');
        $this->model = config('services.openai.embedding_model');
    }

    /**
     * @return float[]
     */
    public function embed(string $text): array
    {
        $text = trim($text);
        if ($text === '') {
            throw new RuntimeException('Cannot generate an embedding for empty text.');
        }

        $response = Http::withToken($this->apiKey)
            ->post('https://api.openai.com/v1/embeddings', [
                'model' => $this->model,
                'input' => $text,
                'dimensions' => 1024,
            ]);

        if ($response->failed()) {
            Log::error('Cannot not generate Embedding', ['body' => $response->body()]);
            $response->throw();
        }

        return $response->json('data.0.embedding');
    }
}
