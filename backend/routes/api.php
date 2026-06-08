<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\RecruiterEventController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok'
    ]);
});

// Message submission endpoint
Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);

// Dashboard stats endpoint
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Recruiter events endpoint
Route::get('/recruiter-events', [RecruiterEventController::class, 'index']);
