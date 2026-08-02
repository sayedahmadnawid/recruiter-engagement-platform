<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            // Foreign key linking directly to the parent leads table records
            $table->foreignId('lead_id')->constrained()->onDelete('cascade');
            $table->string('original_name');
            $table->string('file_path');
            $table->string('status')->default('pending');
            $table->string('mime_type');
            $table->unsignedInteger('file_size');
            // Text boxes storing raw files vs micro-managed JSON extractions
            $table->longText('extracted_text')->nullable();
            $table->json('parsed_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
