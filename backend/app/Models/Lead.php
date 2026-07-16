<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
     * Get the resume associated with the lead.
     */
    public function resume(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Resume::class);
    }
}
