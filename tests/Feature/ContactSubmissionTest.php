<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_submit_route_persists_a_valid_submission_and_flashes_success(): void
    {
        $response = $this->from(route('home'))->post(route('contact.submit'), [
            'name' => 'Alya Putri',
            'email' => 'alya@example.com',
            'subject' => 'Kemitraan',
            'message' => 'Saya ingin mengetahui informasi kemitraan.',
        ]);

        $response
            ->assertRedirect(route('home'))
            ->assertSessionHas('success', 'Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.');

        $this->assertDatabaseHas('contact_submissions', [
            'name' => 'Alya Putri',
            'email' => 'alya@example.com',
            'subject' => 'Kemitraan',
            'message' => 'Saya ingin mengetahui informasi kemitraan.',
            'is_read' => false,
            'is_replied' => false,
        ]);
    }

    public function test_contact_submit_route_is_throttled_after_five_requests_per_minute(): void
    {
        $payload = [
            'name' => 'Alya Putri',
            'email' => 'alya@example.com',
            'message' => 'Saya ingin mengetahui informasi kemitraan.',
        ];

        foreach (range(1, 5) as $_) {
            $this->post(route('contact.submit'), $payload)->assertRedirect();
        }

        $this->post(route('contact.submit'), $payload)->assertTooManyRequests();
    }

    public function test_contact_submit_route_validates_required_fields_and_email(): void
    {
        $response = $this->from(route('home'))->post(route('contact.submit'), [
            'name' => '',
            'email' => 'not-an-email',
            'message' => '',
        ]);

        $response
            ->assertRedirect(route('home'))
            ->assertSessionHasErrors(['name', 'email', 'message']);

        $this->assertDatabaseCount('contact_submissions', 0);
    }
}
