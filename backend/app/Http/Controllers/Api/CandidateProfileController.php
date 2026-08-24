<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CandidateProfile\CandidateProfileRequest;
use App\Http\Resources\CandidateProfileResource;
use App\Models\CandidateProfile;
use App\Http\Controllers\Controller;
use App\Models\Lead;

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
     * Display the specified resource by lead.
     */

    public function showByLead(Lead $lead)
    {
        $profile = $lead->candidateProfile;

        if (!$profile) {
            return response()->json(['message' => 'Candidate profile not found'], 404);
        }

        return response()->json($profile);
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
        $candidateProfile->update($request->validated());

        return response()->json([
            'message' => 'Candidate profile updated successfully.',
            'data' => $candidateProfile->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CandidateProfile $candidateProfile)
    {
        //
    }
}
