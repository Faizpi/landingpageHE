<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Inspiration;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InspirationSeeder extends Seeder
{
    public function run(): void
    {
        $inspirations = [
            [
                'title' => 'Tips Mengatasi Bau Badan',
                'excerpt' => 'Ketahui cara efektif mengatasi bau badan dengan langkah sederhana dan produk yang tepat.',
                'content' => '<p>Bau badan bisa menjadi masalah yang mengganggu aktivitas sehari-hari. Berikut tips untuk mengatasinya:</p><ol><li>Mandi minimal 2 kali sehari</li><li>Gunakan deodorant roll on yang sesuai dengan jenis kulit Anda</li><li>Perhatikan asupan makanan</li><li>Kenakan pakaian yang menyerap keringat</li></ol><p>Dengan rutinitas yang tepat, bau badan bisa diatasi secara efektif.</p>',
                'status' => 'publish',
            ],
            [
                'title' => 'Manfaat Bedak Tabur untuk Tubuh',
                'excerpt' => 'Bedak tabur bukan hanya untuk wajah. Ketahui manfaatnya untuk tubuh.',
                'content' => '<p>Bedak tabur memiliki banyak manfaat untuk kesehatan kulit tubuh, antara lain:</p><ul><li>Mengurangi kelembapan berlebih pada kulit</li><li>Mencegah biang keringat</li><li>Membuat kulit terasa halus dan segar</li><li>Mengurangi gesekan pada area lipatan tubuh</li></ul><p>Pilih bedak tabur yang berkualitas untuk hasil terbaik.</p>',
                'status' => 'publish',
            ],
            [
                'title' => 'Cara Memilih Deodorant yang Tepat',
                'excerpt' => 'Memilih deodorant yang tepat penting untuk kenyamanan sehari-hari.',
                'content' => '<p>Memilih deodorant tidak bisa sembarangan. Berikut panduannya:</p><ol><li>Tentukan jenis kulit Anda (sensitif, normal, atau berminyak)</li><li>Pilih produk yang sudah teruji klinis</li><li>Perhatikan aroma yang sesuai dengan selera</li><li>Gunakan roll on untuk perlindungan lebih tahan lama</li></ol><p>MBK Deodorant Roll On hadir dengan formula yang lembut dan efektif untuk semua jenis kulit.</p>',
                'status' => 'publish',
            ],
        ];

        foreach ($inspirations as $data) {
            Inspiration::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                $data,
            );
        }
    }
}
