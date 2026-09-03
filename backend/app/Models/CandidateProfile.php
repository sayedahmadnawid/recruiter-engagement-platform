<?php

namespace App\Models;

use App\Jobs\IndexCandidateProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class CandidateProfile extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'skills' => 'array',
        'experience' => 'array',
        'education' => 'array',
        'certifications' => 'array',
    ];

    protected static function booted(): void
    {
        static::saved(function (CandidateProfile $profile) {
            $embeddingFields = [
                'current_title',
                'skills',
                'experience',
            ];

            if ($profile->wasRecentlyCreated || $profile->wasChanged($embeddingFields)) {
                IndexCandidateProfile::dispatch($profile->id);
            }
        });

        static::deleted(function (CandidateProfile $profile) {
            app(\App\Services\Vector\PineconeService::class)->delete((string) $profile->id);
        });
    }


    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }
}
