<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::withCount([
            'products' => fn ($q) => $q->where('status', 'publish'),
        ])->get();

        $query = Product::with('category')->where('status', 'publish');

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        $products = $query->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($p) => $this->formatProduct($p));

        return Inertia::render('Catalog', [
            'products' => $products,
            'categories' => $categories,
            'activeCategory' => $request->category,
        ]);
    }

    public function category(Category $category): Response
    {
        $categories = Category::withCount([
            'products' => fn ($q) => $q->where('status', 'publish'),
        ])->get();

        $products = Product::with('category')
            ->where('status', 'publish')
            ->where('category_id', $category->id)
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($p) => $this->formatProduct($p));

        return Inertia::render('Catalog', [
            'products' => $products,
            'categories' => $categories,
            'activeCategory' => $category->slug,
        ]);
    }

    public function show(Product $product): Response
    {
        $product->load('category');

        $related = Product::with('category')
            ->where('status', 'publish')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->latest()
            ->take(4)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));

        return Inertia::render('ProductDetail', [
            'product' => $this->formatProduct($product),
            'related' => $related,
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
