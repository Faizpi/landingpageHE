<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\AboutContent;
use App\Models\ContactContent;
use App\Models\FooterContent;
use App\Models\HeroContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_landing_page_provides_its_cms_content_as_inertia_props(): void
    {
        $hero = HeroContent::create(['title' => 'Hero', 'is_active' => true]);
        $about = AboutContent::create([
            'title' => 'About',
            'features' => [],
            'stats' => [],
            'is_active' => true,
        ]);
        $category = ServiceCategory::create(['title' => 'Category', 'is_active' => true]);
        $service = Service::create([
            'category_id' => $category->id,
            'name' => 'Service',
            'is_active' => true,
        ]);
        $contact = ContactContent::create([
            'title' => 'Contact',
            'contact_info' => [],
            'social_links' => [],
            'is_active' => true,
        ]);
        $footer = FooterContent::create(['company_name' => 'Hibiscus Efsya', 'is_active' => true]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Landing')
                ->where('hero.id', $hero->id)
                ->where('about.id', $about->id)
                ->has('categories', 1)
                ->where('categories.0.id', $category->id)
                ->where('categories.0.services.0.id', $service->id)
                ->where('contact.id', $contact->id)
                ->where('footer.id', $footer->id));
    }
}
