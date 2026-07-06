<?php

namespace Tests\Feature;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_create_a_lead(): void
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', [
                'name' => 'Sayed Nawid',
                'email' => 'sayed@example.com',
                'company' => 'ABC Corp',
                'job_title' => 'Software Engineer',
                'linkedin_url' => 'https://www.linkedin.com/in/sayednawid',
                'status' => 'new',
                'notes' => 'Potential opportunity',
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('leads', [
            'email' => 'sayed@example.com',
        ]);
    }

    public function test_validation_fails_when_required_fields_are_missing(): void
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', []);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors([
            'name',
            'email',
        ]);
    }

    public function test_authenticated_user_can_list_leads(): void
    {
        Lead::factory()->count(3)->create();

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson('/api/leads');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    public function test_authenticated_user_can_view_a_single_lead(): void
    {
        $lead = Lead::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/leads/{$lead->id}");

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $lead->id,
        ]);
    }

    public function test_authenticated_user_can_update_a_lead(): void
    {
        $lead = Lead::factory()->create([
            'status' => 'new',
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/leads/{$lead->id}", [
                'status' => 'contacted',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('leads', [
            'id' => $lead->id,
            'status' => 'contacted',
        ]);
    }

    public function test_authenticated_user_can_delete_a_lead(): void
    {
        $lead = Lead::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')
            ->deleteJson("/api/leads/{$lead->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('leads', [
            'id' => $lead->id,
        ]);
    }

    public function test_authenticated_user_rejects_invalid_status_values()
    {
        $user = User::factory()->create();
        $lead = Lead::factory()->create(['status' => 'new']);

        $response = $this->actingAs($user, 'sanctum')
            ->patchJson("/api/leads/{$lead->id}/status", [
                'status' => 'invalid-status-value'
            ]);

        $response->assertStatus(422);
    }


    public function test_guest_cannot_access_lead_endpoints(): void
    {
        $response = $this->getJson('/api/leads');

        $response->assertStatus(401);
    }
}
