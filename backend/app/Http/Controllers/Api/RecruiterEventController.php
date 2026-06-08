<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\RecruiterEvent;

class RecruiterEventController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            RecruiterEvent::latest()->paginate(10)
        );
    }
}
