<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AboutContent extends Model
{
    protected $fillable = [
        'section_label',
        'title',
        'title_highlight',
        'description',
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
