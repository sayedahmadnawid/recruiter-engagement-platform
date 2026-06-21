<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class MessageApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $authUser;
    protected function setUp(): void
    {
        parent::setUp();

        $this->authUser = User::factory()->create();
        Sanctum::actingAs($this->authUser);
    }

    public function test_message_can_be_submitted(): void
    {
        $payload = [
            'name' => 'Sayed Nawid',
            'email' => 'sayed@example.com',
            'company' => 'ABC Corp',
            'message' => 'Interested in discussing an opportunity.',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response
            ->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Message submitted successfully.',
            ]);

        $this->assertDatabaseHas('messages', [
            'name' => 'Sayed Nawid',
            'email' => 'sayed@example.com',
            'company' => 'ABC Corp',
        ]);
    }

    public function test_name_is_required(): void
    {
        $payload = [
            'email' => 'sayed@example.com',
            'message' => 'Test message',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors([
            'name',
        ]);
    }

    public function test_email_is_required(): void
    {
        $payload = [
            'name' => 'Syed Nawid',
            'message' => 'Test message',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors([
            'email',
        ]);
    }

    public function test_message_is_required(): void
    {
        $payload = [
            'name' => 'Sayed Nawid',
            'email' => 'sayed@example.com',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors([
            'message',
        ]);
    }
}
