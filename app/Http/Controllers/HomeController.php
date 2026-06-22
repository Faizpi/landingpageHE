<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Inspiration;
use App\Models\Product;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredProducts = Product::with('category')
            ->where('status', 'publish')
            ->where('featured', true)
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));

        $latestProducts = Product::with('category')
            ->where('status', 'publish')
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));

        $categories = Category::withCount([
            'products' => fn ($q) => $q->where('status', 'publish'),
        ])->get();

        $inspirations = Inspiration::where('status', 'publish')
            ->latest()
            ->take(3)
            ->get();

        $settings = SiteSetting::all()->pluck('setting_value', 'setting_key');

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'latestProducts' => $latestProducts,
            'categories' => $categories,
            'inspirations' => $inspirations,
            'settings' => $settings,
        ]);
    }

    private function formatProduct($p): array
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'description' => $p->description,
            'price' => $p->price,
            'price_formatted' => 'Rp ' . number_format((float) $p->price, 0, ',', '.'),
            'discount_price' => $p->discount_price,
            'discount_price_formatted' => $p->discount_price ? 'Rp ' . number_format((float) $p->discount_price, 0, ',', '.') : null,
            'category' => $p->category ? ['id' => $p->category->id, 'name' => $p->category->name, 'slug' => $p->category->slug] : null,
            'image' => $p->image,
            'featured' => $p->featured,
            'shopee_link' => $p->shopee_link,
            'tokopedia_link' => $p->tokopedia_link,
            'whatsapp' => $p->whatsapp,
        ];
    }
}
