<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\RecruiterEventController;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication endpoints
Route::post('/login', [AuthController::class, 'login']);

// Protected API routes
Route::middleware('auth:sanctum')->group(function () {
    // Get current user info
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Message submission endpoint
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);

    // Dashboard stats endpoint
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Recruiter events endpoint
    Route::get('/recruiter-events', [RecruiterEventController::class, 'index']);
});

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok'
    ]);
});
