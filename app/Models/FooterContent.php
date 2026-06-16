<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class FooterContent extends Model
{
    protected $fillable = [
        'company_name',
        'tagline',
        'description',
        'copyright_text',
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
