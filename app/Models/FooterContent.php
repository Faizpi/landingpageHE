<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\AutoTranslatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class FooterContent extends Model
{
    use AutoTranslatable;

    /** @var array<string, string> */
    protected array $translatable = [
        'tagline' => 'tagline_en',
        'description' => 'description_en',
        'copyright_text' => 'copyright_text_en',
    ];

    protected $attributes = [
        'links' => '[]',
        'social_links' => '[]',
    ];

    protected $fillable = [
        'company_name',
        'tagline',
        'tagline_en',
        'description',
        'description_en',
        'copyright_text',
        'copyright_text_en',
        'links',
        'social_links',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'links' => 'array',
            'social_links' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Menyeragamkan `social_links` menjadi objek berkunci platform.
     *
     * Data lama tersimpan sebagai daftar (`[{platform: "WhatsApp", url: "..."}]`),
     * sedangkan panel admin dan frontend memakai bentuk berkunci
     * (`{whatsapp: "..."}`). Akesor ini menerjemahkan bentuk lama saat dibaca
     * sehingga tautan media sosial dapat diedit maupun ditampilkan tanpa
     * memerlukan migrasi data.
     *
     * @return array<string, string>
     */
    public function getSocialLinksAttribute(mixed $value): array
    {
        $decoded = is_string($value) ? json_decode($value, true) : $value;

        if (! is_array($decoded)) {
            return [];
        }

        if (! array_is_list($decoded)) {
            /** @var array<string, string> */
            return array_filter($decoded, 'is_string');
        }

        $normalized = [];

        foreach ($decoded as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            $platform = strtolower(trim((string) ($entry['platform'] ?? '')));
            $url = $entry['url'] ?? null;

            if ($platform !== '' && is_string($url) && $url !== '') {
                $normalized[$platform] = $url;
            }
        }

        return $normalized;
    }

    public static function current(): static
    {
        return static::where('is_active', true)->first() ?? static::create([
            'company_name' => 'Hibiscus Efsya',
            'is_active' => true,
        ]);
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
