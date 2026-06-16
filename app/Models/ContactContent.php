<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ContactContent extends Model
{
    protected $fillable = [
        'section_label',
        'title',
        'title_highlight',
        'description',
        'contact_info',
        'social_links',
        'map_embed',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'contact_info' => 'array',
            'social_links' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public static function current(): static
    {
        return static::where('is_active', true)->first() ?? static::create([
            'title' => 'Hubungi Kami',
            'contact_info' => ['email' => '', 'phone' => '', 'whatsapp' => '', 'address' => ''],
            'social_links' => ['whatsapp' => '', 'instagram' => '', 'facebook' => ''],
            'is_active' => true,
        ]);
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
