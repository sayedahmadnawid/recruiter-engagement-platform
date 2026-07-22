<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'original_name',
        'file_path',
        'mime_type',
        'file_size',
        'status',
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

    /**
     * Get the absolute path to the resume file in storage.
     *
     * @return string
     */
    public function getAbsolutePathAttribute(): string
    {
        return Storage::disk($this->disk ?? 'local')->path($this->file_path);
    }

    /**
     * Check if the resume file exists in storage.
     *
     * @return bool
     */
    public function fileExists(): bool
    {
        return Storage::disk($this->disk ?? 'local')->exists($this->file_path);
    }
}
