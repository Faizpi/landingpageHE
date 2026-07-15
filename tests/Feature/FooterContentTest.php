<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\FooterContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FooterContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_fresh_footer_exposes_empty_links_arrays(): void
    {
        $footer = FooterContent::current();

        $this->assertSame([], $footer->links);
        $this->assertSame([], $footer->social_links);
    }
}
