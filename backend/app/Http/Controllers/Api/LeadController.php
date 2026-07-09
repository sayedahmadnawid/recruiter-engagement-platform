<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;
use App\Services\LeadService;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(
            LeadService::search($request)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create(
            $request->validated()
        );

        return response()->json($lead, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        return response()->json($lead);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update(
            $request->validated()
        );

        return response()->json($lead);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return response()->json([
            'message' => 'Lead deleted successfully',
        ]);
    }

    /**
     * Update the status of the specified lead.
     */
    public function updateStatus(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update(
            $request->only('status')
        );

        return response()->json([
            'message' => 'Status updated successfully.',
        ]);
    }

    /**
     * Retrieve aggregated statistics for the metric dashboard charts and summaries.
     */
    public function dashboard()
    {
        return response()->json(
            LeadService::getDashboardStats()
        );
    }
}
