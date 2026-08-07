<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CandidateProfile\CandidateProfileRequest;
use App\Http\Resources\CandidateProfileResource;
use App\Models\CandidateProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class CandidateProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CandidateProfileRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CandidateProfile $candidateProfile)
    {
        return new CandidateProfileResource($candidateProfile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CandidateProfileRequest $request, CandidateProfile $candidateProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CandidateProfile $candidateProfile)
    {
        //
    }
}
