<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'email',
        'company',
        'job_title',
        'linkedin_url',
        'status',
        'notes',
    ];
}