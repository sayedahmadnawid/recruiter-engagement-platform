<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'company' => fake()->company(),
            'job_title' => fake()->jobTitle(),
            'linkedin_url' => 'https://linkedin.com/in/' . fake()->userName(),
            'status' => 'new',
            'notes' => fake()->sentence(),
        ];
    }
}
