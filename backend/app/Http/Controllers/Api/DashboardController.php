<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Message;
use App\Models\RecruiterEvent;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'messages' => Message::count(),
            'events' => RecruiterEvent::count(),
            'message_events' => RecruiterEvent::where(
                'event_type',
                'message_sent'
            )->count(),
        ]);
    }
}
