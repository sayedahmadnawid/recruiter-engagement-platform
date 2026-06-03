<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request): JsonResponse
    {
        $message = Message::create(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Message submitted successfully.',
            'data' => $message,
        ], 201);
    }
}
