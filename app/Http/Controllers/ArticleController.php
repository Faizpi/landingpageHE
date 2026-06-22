<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Inspiration;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        $inspirations = Inspiration::where('status', 'publish')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Articles', [
            'inspirations' => $inspirations,
        ]);
    }

    public function show(Inspiration $inspiration): Response
    {
        abort_if($inspiration->status !== 'publish', 404);

        $related = Inspiration::where('status', 'publish')
            ->where('id', '!=', $inspiration->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('ArticleDetail', [
            'inspiration' => $inspiration,
            'related' => $related,
        ]);
    }
}
