<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CandidateProfile\CandidateProfileRequest;
use App\Http\Requests\CandidateProfile\CandidateBasicInfoRequest;
use App\Http\Requests\CandidateProfile\CandidateSkillRequest;
use App\Http\Requests\CandidateProfile\CandidateExperienceRequest;
use App\Http\Requests\CandidateProfile\CandidateEducationRequest;
use App\Http\Requests\CandidateProfile\CandidateCertificationsRequest;
use App\Http\Resources\CandidateProfileResource;
use App\Models\CandidateProfile;
use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Services\Vector\PineconeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
     * Update core/basic info (name, title, email, phone, location).
     */
    public function updateBasicInfo(CandidateBasicInfoRequest $request, CandidateProfile $candidateProfile)
    {
        $candidateProfile->update($request->validated());

        return $this->respond($candidateProfile);
    }

    /**
     * Update skills (JSON array of strings).
     */
    public function updateSkills(CandidateSkillRequest $request, CandidateProfile $candidateProfile)
    {
        $candidateProfile->update([
            'skills' => $request->validated('skills'),
        ]);

        return $this->respond($candidateProfile);
    }

    /**
     * Update experience (JSON array of objects).
     */
    public function updateExperience(CandidateExperienceRequest $request, CandidateProfile $candidateProfile)
    {
        $candidateProfile->update([
            'experience' => $request->validated('experience'),
        ]);

        return $this->respond($candidateProfile);
    }

    /**
     * Update education (JSON array of objects).
     */
    public function updateEducation(CandidateEducationRequest $request, CandidateProfile $candidateProfile)
    {
        $candidateProfile->update([
            'education' => $request->validated('education'),
        ]);

        return $this->respond($candidateProfile);
    }

    /**
     * Update certifications (JSON array of objects).
     */
    public function updateCertifications(CandidateCertificationsRequest $request, CandidateProfile $candidateProfile)
    {
        $candidateProfile->update([
            'certifications' => $request->validated('certifications'),
        ]);

        return $this->respond($candidateProfile);
    }


    /**
     * Shared response shape for every update endpoint.
     */
    private function respond(CandidateProfile $candidateProfile)
    {
        return response()->json([
            'message' => 'Candidate profile updated successfully.',
            'data' => $candidateProfile->fresh(),
        ]);
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

    public function search(Request $request, PineconeService $pinecone): JsonResponse
    {
        $request->validate(['query' => 'required|string']);

        // 1. Embed search query
        $response = Http::withToken(config('services.openai.secret'))
            ->post('https://api.openai.com/v1/embeddings', [
                'model' => 'text-embedding-3-small',
                'input' => $request->input('query'),
            ]);

        $queryVector = $response->json('data.0.embedding');

        // 2. Search Pinecone for top matching vector IDs
        $matches = $pinecone->query($queryVector, topK: 5);

        $candidateIds = collect($matches)->pluck('id')->all();

        // 3. Fetch actual candidate data from MySQL
        $candidates = CandidateProfile::whereIn('id', $candidateIds)->get();

        return response()->json([
            'query' => $request->input('query'),
            'results' => $candidates,
        ]);
    }
}
