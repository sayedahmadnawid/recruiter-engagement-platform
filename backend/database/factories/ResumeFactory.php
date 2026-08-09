<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\Resume;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Resume>
 */
class ResumeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id'       => Lead::factory(),
            'original_name' => $this->faker->word() . '.pdf',
            'file_path'     => 'resumes/' . $this->faker->uuid() . '.pdf',
            'mime_type'     => 'application/pdf',
            'file_size'     => $this->faker->numberBetween(50_000, 500_000),
            'status'        => 'pending',
        ];
    }
}
