<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Deodorant Roll On' => [
                [
                    'name' => 'MBK Deodorant Roll On Pink (Women)',
                    'price' => 15000,
                    'featured' => true,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Deodorant Roll On Purple (Women)',
                    'price' => 15000,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Deodorant Roll On Black (Men)',
                    'price' => 15000,
                    'featured' => true,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Deodorant Roll On Blue (Men)',
                    'price' => 15000,
                    'status' => 'publish',
                ],
            ],
            'P.O. Powder' => [
                [
                    'name' => 'MBK P.O. Powder Silver Sachet',
                    'price' => 35000,
                    'featured' => true,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK P.O. Powder Putih Tin',
                    'price' => 14000,
                    'featured' => true,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK P.O. Powder Putih Sachet',
                    'price' => 26000,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK P.O. Powder Silver Tin',
                    'price' => 16000,
                    'status' => 'publish',
                ],
            ],
            'Bedak Biang Keringat' => [
                [
                    'name' => 'MBK Bedak Biang Keringat Biru Botol',
                    'price' => 9000,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Bedak Biang Keringat Hijau Botol',
                    'price' => 9000,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Bedak Biang Keringat Hijau Tin',
                    'price' => 9000,
                    'status' => 'publish',
                ],
                [
                    'name' => 'MBK Bedak Biang Keringat Biru Tin',
                    'price' => 9000,
                    'status' => 'publish',
                ],
            ],
            'Body Mist' => [
                [
                    'name' => 'MBK Body Mist Fresh',
                    'price' => 25000,
                    'featured' => true,
                    'status' => 'publish',
                ],
            ],
            'Body Lotion' => [
                [
                    'name' => 'MBK Body Lotion Eleven',
                    'price' => 35000,
                    'status' => 'publish',
                ],
            ],
        ];

        $index = 0;

        foreach ($categories as $categoryName => $products) {
            $category = Category::firstOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($categoryName)],
                ['name' => $categoryName],
            );

            foreach ($products as $productData) {
                $discountPrice = null;

                // Apply discount_price to ~30% of products
                if ($index % 3 === 0) {
                    $discountPrice = round($productData['price'] * 0.8, 2);
                }

                Product::updateOrCreate(
                    ['slug' => \Illuminate\Support\Str::slug($productData['name'])],
                    [
                        'name' => $productData['name'],
                        'price' => $productData['price'],
                        'discount_price' => $discountPrice,
                        'category_id' => $category->id,
                        'status' => $productData['status'],
                        'featured' => $productData['featured'] ?? false,
                    ],
                );

                $index++;
            }
        }
    }
}
