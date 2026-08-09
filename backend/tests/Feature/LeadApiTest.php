<?php

namespace Tests\Feature;

use App\Contracts\ResumeParserInterface;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use App\Jobs\ProcessResume;
use App\Models\Resume;
use App\Services\CandidateProfileService;
use App\Services\Resume\ResumeTextExtractor;

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
        Storage::fake('local');
        Queue::fake(); // ProcessResume is dispatched but never actually runs

        $resumeFile = UploadedFile::fake()->create('resume.pdf', 500, 'application/pdf');

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', [
                'name' => 'Sayed Nawid',
                'email' => 'sayed@example.com',
                'company' => 'ABC Corp',
                'job_title' => 'Software Engineer',
                'linkedin_url' => 'https://www.linkedin.com/in/sayednawid',
                'status' => 'new',
                'notes' => 'Potential opportunity',
                'resume' => $resumeFile,
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('leads', [
            'email' => 'sayed@example.com',
        ]);

        Queue::assertPushed(ProcessResume::class);
    }

    public function test_process_resume_job_extracts_and_marks_completed()
    {
        Storage::fake('local');

        $resume = Resume::factory()->create(['status' => 'pending']);

        // Use a real, small PDF fixture — not UploadedFile::fake()
        Storage::disk('local')->put(
            $resume->file_path,
            file_get_contents(base_path('tests/Fixtures/sample_resume.pdf'))
        );

        (new ProcessResume($resume))->handle(
            app(ResumeTextExtractor::class),
            app(ResumeParserInterface::class),
            app(CandidateProfileService::class)
        );

        $resume->refresh();
        $this->assertEquals('completed', $resume->status);
        //$this->assertNotEmpty($resume->raw_text);
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
        $response->assertJsonCount(3, 'data');
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

    /** @test */
    public function test_authenticated_user_can_create_a_lead_with_a_resume_upload(): void
    {
        // 1. Fake the local storage driver so we don't write physical files to disk
        Storage::fake('local');

        // 1.5 Fake the queue to prevent actual job dispatching during the test
        Queue::fake();

        // 2. Generate a fake PDF document
        $fakeResume = UploadedFile::fake()->create('my_resume.pdf', 500, 'application/pdf');

        $payload = [
            'name'         => 'Sayed Nawid',
            'email'        => 'sayed@example.com',
            'company'      => 'ABC Corp',
            'job_title'    => 'Software Engineer',
            'linkedin_url' => 'https://www.linkedin.com/in/sayednawid',
            'status'       => 'new',
            'notes'        => 'Potential opportunity',
            'resume'       => $fakeResume,
        ];

        // 3. Authenticate using Sanctum and send the POST payload
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', $payload);

        // 4. Assert response is successful
        $response->assertStatus(201);

        // 5. Assert Lead was created in the database
        $this->assertDatabaseHas('leads', [
            'name'  => 'Sayed Nawid',
            'email' => 'sayed@example.com',
        ]);

        $lead = Lead::where('email', 'sayed@example.com')->first();

        // 6. Assert that the resume relationship record was written to the database
        $this->assertDatabaseHas('resumes', [
            'lead_id'       => $lead->id,
            'original_name' => 'my_resume.pdf',
            'mime_type'     => 'application/pdf',
        ]);

        // 7. Verify the file actually saved to our fake storage folder
        $resume = $lead->resume->first();
        $this->assertNotNull($resume);
        Storage::disk('local')->assertExists($resume->file_path);

        Queue::assertPushed(ProcessResume::class, function ($job) use ($resume) {
            return $job->resume->id === $resume->id;
        });
    }

    /** @test */
    public function test_it_can_create_a_lead_without_a_resume()
    {
        Storage::fake('local');

        // Exceeds the 4096KB (4MB) max size rule
        $resumeFile = UploadedFile::fake()->create('resume.pdf', 5000, 'application/pdf');

        $payload = [
            'name'         => 'Sayed Ahmad Nawid',
            'email'        => 'sayed@example.com',
            'resume'       => $resumeFile,
            'company'      => 'ABC Corp',
            'job_title'    => 'Software Engineer',
            'linkedin_url' => 'https://www.linkedin.com/in/sayednawid',
            'status'       => 'new',
        ];

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['resume']);

        $this->assertDatabaseMissing('leads', [
            'email' => 'sayed@example.com',
        ]);
    }

    /** @test */
    public function test_it_fails_validation_if_resume_is_not_an_allowed_file_type(): void
    {
        // 1. Fake the local storage driver
        Storage::fake('local');

        // 2. Generate an invalid file (e.g., an executable)
        $invalidFile = UploadedFile::fake()->create('malicious_payload.exe', 100, 'application/octet-stream');

        $payload = [
            'name'         => 'Sayed Nawid',
            'email'        => 'sayed@example.com',
            'company'      => 'ABC Corp',
            'job_title'    => 'Software Engineer',
            'linkedin_url' => 'https://www.linkedin.com/in/sayednawid',
            'status'       => 'new',
            'notes'         => 'Potential opportunity',
            'resume'       => $invalidFile, // Attaching the invalid file
        ];

        // 3. Send authenticated request
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/leads', $payload);

        // 4. Assert that validation fails with 422 Unprocessable Entity
        $response->assertStatus(422);

        // 5. Assert the exact error key is returned for the resume field
        $response->assertJsonValidationErrors(['resume']);

        // 6. Double check that the database remains untouched
        $this->assertDatabaseMissing('leads', [
            'email' => 'sayed@example.com',
        ]);
    }
}
