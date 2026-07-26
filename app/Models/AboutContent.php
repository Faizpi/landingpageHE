<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\AutoTranslatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AboutContent extends Model
{
    use AutoTranslatable;

    /** @var array<string, string> */
    protected array $translatable = [
        'section_label' => 'section_label_en',
        'title' => 'title_en',
        'title_highlight' => 'title_highlight_en',
        'description' => 'description_en',
    ];

    protected $fillable = [
        'section_label',
        'section_label_en',
        'title',
        'title_en',
        'title_highlight',
        'title_highlight_en',
        'description',
        'description_en',
        'features',
        'stats',
        'image',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'stats' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public static function current(): static
    {
        return static::where('is_active', true)->first() ?? static::create([
            'title' => 'Tentang Kami',
            'features' => [],
            'stats' => [],
            'is_active' => true,
        ]);
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
