<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\AboutContent;
use App\Models\ContactContent;
use App\Models\ContactSubmission;
use App\Models\FooterContent;
use App\Models\HeroContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function index(): Response
    {
        $hero = HeroContent::current();
        $about = AboutContent::current();
        $categories = ServiceCategory::active()
            ->ordered()
            ->with(['services' => fn ($query) => $query->active()->ordered()])
            ->get();
        $contact = ContactContent::current();
        $footer = FooterContent::current();

        return Inertia::render('Landing', [
            'hero' => $hero,
            'about' => $about,
            'categories' => $categories,
            'contact' => $contact,
            'footer' => $footer,
        ]);
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactSubmission::create($validated);

        return redirect()->back()->with('success', 'Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.');
    }
}
