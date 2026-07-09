<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadService
{
    /**
     * Search, filter, and paginate leads.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function search(Request $request)
    {
        // 1. Initialize a dynamic builder instance starting with latest entries
        $query = Lead::latest();

        // 2. Conditional Filter: Global String Search (Name, Email, Company)
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('email', 'like', "%{$searchTerm}%")
                    ->orWhere('company', 'like', "%{$searchTerm}%");
            });
        }

        // 3. Conditional Filter: Strict Column Status Matching
        // Skip filtering if the status payload value is explicitly set to 'all'
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        // 4. Return standard length-aware pagination payload (e.g., 10 entries per page)
        // Laravel reads the matching 'page' query URL query parameter automatically under the hood
        return $query->paginate(10);
    }

    /**
     * Retrieve aggregated statistics for the metric dashboard charts and summaries.
     *
     * @return array
     */
    public static function getDashboardStats()
    {
        // 1. Run a conditional aggregation query to fetch all counts in 1 hit
        $stats = Lead::selectRaw("
            COUNT(*) as total_leads,
            COUNT(CASE WHEN status = 'new' THEN 1 END) as new,
            COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted,
            COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded,
            COUNT(CASE WHEN status = 'interviewing' THEN 1 END) as interviewing,
            COUNT(CASE WHEN status = 'offer' THEN 1 END) as offer,
            COUNT(CASE WHEN status = 'hired' THEN 1 END) as hired,
            COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
        ")->first();

        // 2. Fetch the top 5 most recent leads for the sidebar preview list
        $recentLeads = Lead::latest()->take(5)->get();

        // 3. Package it neatly matching your target JSON payload requirements
        return [
            'total_leads'  => (int) $stats->total_leads,
            'new'          => (int) $stats->new,
            'contacted'    => (int) $stats->contacted,
            'responded'    => (int) $stats->responded,
            'interviewing' => (int) $stats->interviewing,
            'offer'        => (int) $stats->offer,
            'hired'        => (int) $stats->hired,
            'rejected'     => (int) $stats->rejected,
            'recent_leads' => $recentLeads,
        ];
    }
    
}
