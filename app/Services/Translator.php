<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Menerjemahkan teks Bahasa Indonesia ke Bahasa Inggris untuk mengisi kolom `*_en`.
 *
 * Terjemahan hanya dijalankan di panel admin saat konten disimpan, lalu hasilnya
 * disimpan permanen ke database. Halaman publik tidak pernah memanggil layanan ini,
 * sehingga tidak ada latensi tambahan untuk pengunjung.
 *
 * Bila jaringan gagal, metode akan mengembalikan null dan pemanggil membiarkan
 * kolom EN kosong — frontend otomatis jatuh kembali ke teks Bahasa Indonesia.
 */
class Translator
{
    private const ENDPOINT = 'https://translate.googleapis.com/translate_a/single';

    private const TIMEOUT_SECONDS = 8;

    private const CACHE_TTL_SECONDS = 604800; // 7 hari

    private const MAX_INPUT_LENGTH = 5000;

    /**
     * Frasa ajakan bertindak yang sering salah diterjemahkan secara harfiah.
     * Dicocokkan pada keseluruhan teks (bukan sebagian), sebelum memanggil API,
     * sehingga tombol tetap terdengar wajar dalam Bahasa Inggris.
     *
     * @var array<string, string>
     */
    private const PHRASES = [
        'mulai sekarang' => 'Get Started',
        'mulai bermitra' => 'Become a Partner',
        'pelajari lebih lanjut' => 'Learn More',
        'lihat layanan' => 'Explore Services',
        'hubungi kami' => 'Contact Us',
        'tentang kami' => 'About Us',
        'kirim pesan' => 'Send Message',
        'selengkapnya' => 'Read More',
        'daftar sekarang' => 'Register Now',
        'gabung sekarang' => 'Join Now',
        'konsultasi gratis' => 'Free Consultation',
    ];

    /**
     * Istilah yang harus tetap apa adanya (nama brand, singkatan, istilah bisnis).
     * Kunci dicocokkan tanpa memperhatikan huruf besar/kecil.
     *
     * @var array<string, string>
     */
    private const GLOSSARY = [
        'Hibiscus Efsya' => 'Hibiscus Efsya',
        'M.B.K Indonesia' => 'M.B.K Indonesia',
        'MBK Indonesia' => 'MBK Indonesia',
        'ROI' => 'ROI',
        'WhatsApp' => 'WhatsApp',
        'Instagram' => 'Instagram',
        'Facebook' => 'Facebook',
        'Umrah' => 'Umrah',
        'Haji' => 'Hajj',
        'Hijab' => 'Hijab',
    ];

    /**
     * Terjemahkan satu teks. Mengembalikan null bila input kosong atau layanan gagal.
     */
    public function toEnglish(?string $text): ?string
    {
        $trimmed = trim((string) $text);

        if ($trimmed === '' || mb_strlen($trimmed) > self::MAX_INPUT_LENGTH) {
            return null;
        }

        // Frasa tombol pendek dipetakan langsung agar tidak diterjemahkan
        // secara harfiah (misalnya "Mulai Sekarang" menjadi "From now on").
        $phrase = self::PHRASES[mb_strtolower($trimmed)] ?? null;

        if ($phrase !== null) {
            return $phrase;
        }

        $cacheKey = 'translate:id-en:'.md5($trimmed);

        $cached = Cache::get($cacheKey);

        if (is_string($cached)) {
            return $cached;
        }

        $translated = $this->requestTranslation($trimmed);

        if ($translated === null) {
            return null;
        }

        $restored = $this->restoreGlossary($translated);

        Cache::put($cacheKey, $restored, self::CACHE_TTL_SECONDS);

        return $restored;
    }

    /**
     * Terjemahkan beberapa field sekaligus.
     *
     * @param  array<string, string|null>  $values  peta nama field => teks Indonesia
     * @return array<string, string> hanya berisi field yang berhasil diterjemahkan
     */
    public function translateMany(array $values): array
    {
        $result = [];

        foreach ($values as $key => $value) {
            $translated = $this->toEnglish($value);

            if ($translated !== null) {
                $result[$key] = $translated;
            }
        }

        return $result;
    }

    private function requestTranslation(string $text): ?string
    {
        try {
            $response = Http::timeout(self::TIMEOUT_SECONDS)
                ->retry(2, 250, throw: false)
                ->get(self::ENDPOINT, [
                    'client' => 'gtx',
                    'sl' => 'id',
                    'tl' => 'en',
                    'dt' => 't',
                    'q' => $text,
                ]);

            if ($response->failed()) {
                return null;
            }

            return $this->extractSentences($response->json());
        } catch (Throwable $exception) {
            Log::warning('Auto-translate gagal', [
                'message' => $exception->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Struktur balasan: [[["hasil","asli",null,null,...], ...], ...]
     */
    private function extractSentences(mixed $payload): ?string
    {
        if (! is_array($payload) || ! isset($payload[0]) || ! is_array($payload[0])) {
            return null;
        }

        $sentences = '';

        foreach ($payload[0] as $segment) {
            if (is_array($segment) && isset($segment[0]) && is_string($segment[0])) {
                $sentences .= $segment[0];
            }
        }

        $sentences = trim($sentences);

        return $sentences === '' ? null : $sentences;
    }

    private function restoreGlossary(string $text): string
    {
        foreach (self::GLOSSARY as $source => $target) {
            $pattern = '/\b'.preg_quote($source, '/').'\b/iu';
            $text = (string) preg_replace($pattern, $target, $text);
        }

        return $text;
    }
}
