<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'company',
        'job_title',
        'linkedin_url',
        'status',
        'notes',
    ];

    /**
     * Get the resumes associated with the lead.
     */
    public function resume(): HasMany
    {
        return $this->hasMany(Resume::class);
    }

    /**
     * Get the candidate profile associated with the lead.
     */
    public function profile(): HasOne
    {
        return $this->hasOne(CandidateProfile::class);
    }
}
