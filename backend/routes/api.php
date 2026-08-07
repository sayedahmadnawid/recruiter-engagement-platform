<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\RecruiterEventController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateProfileController;

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
    //Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Recruiter events endpoint
    Route::get('/recruiter-events', [RecruiterEventController::class, 'index']);

    // Lead management endpoints
    Route::apiResource('leads', LeadController::class);

    // Update lead status endpoint
    Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus']);

    // Dashboard stats endpoint
    Route::get('/dashboard/stats', [LeadController::class, 'dashboard']);

    // Candidate profile endpoints
    Route::apiResource('candidate-profiles', CandidateProfileController::class);
});

// Candidate profile endpoints
    Route::apiResource('candidate-profiles', CandidateProfileController::class);

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok'
    ]);
});
