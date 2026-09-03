<?php

namespace App\Services\Vector;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PineconeService
{

    protected string $apiKey;
    protected string $host;

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->apiKey = config('services.pinecone.api_key');
        $this->host = rtrim(config('services.pinecone.host'), '/');
    }


    protected function client()
    {
        return Http::withHeaders([
            'Api-Key' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])->baseUrl($this->host);
    }

    /**
     * Upsert a vector embedding into Pinecone.
     */
    public function upsert(string $id, array $vector, array $metadata = []): array
    {
        $response = $this->client()->post("{$this->host}/vectors/upsert", [
            'vectors' => [
                [
                    'id' => (string) $id,
                    'values' => $vector,
                    'metadata' => $metadata,
                ]
            ]
        ]);

        if ($response->failed()) {
            Log::error('Pinecone Upsert Error', ['body' => $response->body()]);
            $response->throw();
        }

        return $response->json();
    }

    /**
     * Query Pinecone for top K nearest neighbor vectors.
     */
    public function query(array $vector, int $topK = 5, array $filter = []): array
    {

        $payload = [
            'vector' => $vector,
            'topK' => $topK,
            'includeMetadata' => true,
        ];

        if (!empty($filter)) {
            $payload['filter'] = $filter;
        }

        $response = $this->client()->post("/query", $payload);

        if ($response->failed()) {
            Log::error('Pinecone Query Error', ['body' => $response->body()]);
            $response->throw();
        }

        return $response->json()['matches'] ?? [];
    }

    public function delete(string $id): void
    {
        $this->client()->post('/vectors/delete', [
            'ids' => [$id],
        ])->throw();
    }
}
