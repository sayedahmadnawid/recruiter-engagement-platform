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
}
