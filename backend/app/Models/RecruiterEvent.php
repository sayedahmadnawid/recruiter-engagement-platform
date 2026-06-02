<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecruiterEvent extends Model
{
    protected $fillable = [
        'event_type',
        'name',
        'email',
        'metadata',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];
}
