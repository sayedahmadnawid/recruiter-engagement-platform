<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'original_name',
        'file_path',
        'mime_type',
        'file_size',
        'extracted_text',
        'parsed_data',
    ];

    // Automatically cast JSON data directly to a clean PHP array structure
    protected $casts = [
        'parsed_data' => 'array',
    ];

    /**
     * Get the lead that owns the resume.
     */
    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }
}
