<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AboutContent;
use App\Models\ContactContent;
use App\Models\FooterContent;
use App\Models\HeroContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HibiscusSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedAdmin();
        $this->seedHero();
        $this->seedAbout();
        $this->seedServices();
        $this->seedContact();
        $this->seedFooter();
    }

    private function seedAdmin(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@hibiscusefsya.com'],
            [
                'name' => 'admin',
                'full_name' => 'Administrator',
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
                'is_active' => true,
            ],
        );
    }

    private function seedHero(): void
    {
        HeroContent::updateOrCreate(
            ['id' => 1],
            [
                'badge_text' => 'Peluang Bisnis Franchise #1',
                'title' => 'Bangun Bisnis Impian Anda Bersama',
                'title_highlight' => 'Hibiscus Efsya',
                'subtitle' => 'Mitra Bisnis Terpercaya di Indonesia',
                'description' => 'Hibiscus Efsya menghadirkan peluang franchise terbaik dengan dukungan penuh dari tim profesional. Bergabunglah dengan ratusan mitra sukses kami dan wujudkan impian bisnis Anda.',
                'button_primary_text' => 'Mulai Sekarang',
                'button_primary_link' => '#contact',
                'button_secondary_text' => 'Pelajari Lebih Lanjut',
                'button_secondary_link' => '#about',
                'stat_1_value' => '500+',
                'stat_1_label' => 'Mitra Aktif',
                'stat_2_value' => '50+',
                'stat_2_label' => 'Kota di Indonesia',
                'stat_3_value' => '98%',
                'stat_3_label' => 'Tingkat Kepuasan',
                'is_active' => true,
            ],
        );
    }

    private function seedAbout(): void
    {
        AboutContent::updateOrCreate(
            ['id' => 1],
            [
                'section_label' => 'TENTANG KAMI',
                'title' => 'Mengapa Memilih',
                'title_highlight' => 'Hibiscus Efsya?',
                'description' => 'Kami adalah perusahaan franchise terpercaya yang telah membantu ratusan mitra sukses di seluruh Indonesia. Dengan sistem yang teruji dan dukungan penuh, kami siap membantu Anda membangun bisnis impian.',
                'features' => [
                    [
                        'icon' => '🛡️',
                        'title' => 'Sistem Teruji',
                        'description' => 'Model bisnis yang telah terbukti sukses dengan ratusan mitra aktif di seluruh Indonesia.',
                    ],
                    [
                        'icon' => '🎓',
                        'title' => 'Pelatihan Lengkap',
                        'description' => 'Program pelatihan komprehensif untuk memastikan setiap mitra siap menjalankan bisnis.',
                    ],
                    [
                        'icon' => '💰',
                        'title' => 'ROI Cepat',
                        'description' => 'Return on investment yang cepat dengan dukungan strategi pemasaran yang efektif.',
                    ],
                    [
                        'icon' => '👥',
                        'title' => 'Dukungan 24/7',
                        'description' => 'Tim support yang siap membantu Anda kapan saja dalam menjalankan bisnis.',
                    ],
                ],
                'stats' => [
                    ['value' => '500+', 'label' => 'Mitra Aktif'],
                    ['value' => '50+', 'label' => 'Kota'],
                    ['value' => '10+', 'label' => 'Tahun Pengalaman'],
                    ['value' => '98%', 'label' => 'Kepuasan Mitra'],
                ],
                'is_active' => true,
            ],
        );
    }

    private function seedServices(): void
    {
        $categories = [
            [
                'title' => 'Body Care',
                'icon' => '✨',
                'color' => '#ec4899',
                'bg_color' => '#fdf2f8',
                'sort_order' => 1,
                'services' => [
                    ['name' => 'Perawatan Wajah', 'description' => 'Produk perawatan wajah berkualitas tinggi untuk semua jenis kulit.', 'display_order' => 1],
                    ['name' => 'Perawatan Tubuh', 'description' => 'Rangkaian produk body care premium untuk kulit sehat dan cerah.', 'display_order' => 2],
                    ['name' => 'Aromaterapi', 'description' => 'Produk aromaterapi alami untuk relaksasi dan kesehatan tubuh.', 'display_order' => 3],
                ],
            ],
            [
                'title' => 'Fashion',
                'icon' => '🛍️',
                'color' => '#8b5cf6',
                'bg_color' => '#f5f3ff',
                'sort_order' => 2,
                'services' => [
                    ['name' => 'Busana Muslim', 'description' => 'Koleksi busana muslim modern dan trendy untuk segala occasion.', 'display_order' => 1],
                    ['name' => 'Aksesoris', 'description' => 'Berbagai aksesoris fashion yang melengkapi gaya Anda.', 'display_order' => 2],
                    ['name' => 'Hijab Premium', 'description' => 'Koleksi hijab berkualitas premium dengan berbagai pilihan warna.', 'display_order' => 3],
                ],
            ],
            [
                'title' => 'Travel',
                'icon' => '🌍',
                'color' => '#06b6d4',
                'bg_color' => '#ecfeff',
                'sort_order' => 3,
                'services' => [
                    ['name' => 'Paket Wisata', 'description' => 'Paket wisata domestik dan internasional dengan harga terjangkau.', 'display_order' => 1],
                    ['name' => 'Umrah & Haji', 'description' => 'Layanan perjalanan umrah dan haji dengan bimbingan profesional.', 'display_order' => 2],
                    ['name' => 'Tiket & Akomodasi', 'description' => 'Booking tiket pesawat, hotel, dan transportasi dengan mudah.', 'display_order' => 3],
                ],
            ],
            [
                'title' => 'Technology',
                'icon' => '💻',
                'color' => '#10b981',
                'bg_color' => '#ecfdf5',
                'sort_order' => 4,
                'services' => [
                    ['name' => 'Aplikasi Bisnis', 'description' => 'Solusi aplikasi bisnis untuk meningkatkan efisiensi operasional.', 'display_order' => 1],
                    ['name' => 'Digital Marketing', 'description' => 'Layanan pemasaran digital untuk memperluas jangkauan bisnis Anda.', 'display_order' => 2],
                    ['name' => 'Sistem POS', 'description' => 'Sistem kasir modern untuk mengelola transaksi bisnis dengan mudah.', 'is_coming_soon' => true, 'display_order' => 3],
                ],
            ],
        ];

        foreach ($categories as $categoryData) {
            $services = $categoryData['services'];
            unset($categoryData['services']);

            $category = ServiceCategory::updateOrCreate(
                ['title' => $categoryData['title']],
                $categoryData,
            );

            foreach ($services as $serviceData) {
                Service::updateOrCreate(
                    ['name' => $serviceData['name'], 'category_id' => $category->id],
                    array_merge($serviceData, [
                        'category_id' => $category->id,
                        'is_coming_soon' => $serviceData['is_coming_soon'] ?? false,
                        'is_active' => true,
                    ]),
                );
            }
        }
    }

    private function seedContact(): void
    {
        ContactContent::updateOrCreate(
            ['id' => 1],
            [
                'section_label' => 'HUBUNGI KAMI',
                'title' => 'Siap Memulai Bisnis',
                'title_highlight' => 'Bersama Kami?',
                'description' => 'Hubungi tim kami untuk informasi lebih lanjut tentang peluang franchise Hibiscus Efsya. Kami siap membantu Anda!',
                'contact_info' => [
                    'email' => 'info@hibiscusefsya.com',
                    'phone' => '+62 21 1234 5678',
                    'whatsapp' => '+62 812 3456 7890',
                    'address' => 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
                ],
                'social_links' => [
                    'whatsapp' => 'https://wa.me/6281234567890',
                    'instagram' => 'https://instagram.com/hibiscusefsya',
                    'facebook' => 'https://facebook.com/hibiscusefsya',
                ],
                'is_active' => true,
            ],
        );
    }

    private function seedFooter(): void
    {
        FooterContent::updateOrCreate(
            ['id' => 1],
            [
                'company_name' => 'Hibiscus Efsya',
                'tagline' => 'Mitra Bisnis Terpercaya',
                'description' => 'Hibiscus Efsya adalah perusahaan franchise terkemuka yang membantu Anda membangun bisnis sukses dengan dukungan penuh dan sistem yang teruji.',
                'copyright_text' => '© 2025 Hibiscus Efsya. All rights reserved.',
                'links' => [
                    ['label' => 'Beranda', 'url' => '/'],
                    ['label' => 'Tentang Kami', 'url' => '#about'],
                    ['label' => 'Layanan', 'url' => '#services'],
                    ['label' => 'Kontak', 'url' => '#contact'],
                ],
                'social_links' => [
                    ['platform' => 'WhatsApp', 'url' => 'https://wa.me/6281234567890', 'icon' => 'heroicon-o-phone'],
                    ['platform' => 'Instagram', 'url' => 'https://instagram.com/hibiscusefsya', 'icon' => 'heroicon-o-camera'],
                    ['platform' => 'Facebook', 'url' => 'https://facebook.com/hibiscusefsya', 'icon' => 'heroicon-o-globe-alt'],
                ],
                'is_active' => true,
            ],
        );
    }
}
