<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Daftar ikon yang tersedia untuk kategori layanan.
 *
 * Kunci disimpan ke kolom `service_categories.icon` dan dipetakan ke komponen
 * SVG di `resources/js/Components/Landing/ServiceIcons.tsx`. Menyimpan nama
 * ikon (bukan emoji) membuat tampilan konsisten di seluruh perangkat.
 *
 * Saat menambah ikon baru, tambahkan kuncinya di sini DAN komponennya di
 * ServiceIcons.tsx agar keduanya tetap sinkron.
 */
final class ServiceIcon
{
    /** @var array<string, string> */
    private const ICONS = [
        'sparkles' => 'Sparkles — perawatan & kecantikan',
        'leaf' => 'Leaf — alami & herbal',
        'heart' => 'Heart — kesehatan & wellness',
        'shopping-bag' => 'Shopping Bag — ritel & fashion',
        'shirt' => 'Shirt — busana',
        'gem' => 'Gem — produk premium',
        'globe' => 'Globe — travel & internasional',
        'plane' => 'Plane — penerbangan & tur',
        'map-pin' => 'Map Pin — lokasi & destinasi',
        'monitor' => 'Monitor — teknologi',
        'smartphone' => 'Smartphone — aplikasi mobile',
        'chart' => 'Chart — pemasaran & analitik',
        'briefcase' => 'Briefcase — bisnis & korporat',
        'store' => 'Store — gerai & franchise',
        'truck' => 'Truck — logistik & distribusi',
        'utensils' => 'Utensils — kuliner',
        'coffee' => 'Coffee — minuman & kafe',
        'graduation-cap' => 'Graduation Cap — pelatihan & edukasi',
        'shield' => 'Shield — keamanan & jaminan',
        'users' => 'Users — komunitas & mitra',
    ];

    /** @return array<string, string> */
    public static function options(): array
    {
        return self::ICONS;
    }

    public static function exists(?string $key): bool
    {
        return $key !== null && array_key_exists($key, self::ICONS);
    }
}
