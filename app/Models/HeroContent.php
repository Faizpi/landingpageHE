<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\AutoTranslatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class HeroContent extends Model
{
    use AutoTranslatable;

    protected $hidden = [
        'hero_image',
    ];

    /** @var array<string, string> */
    protected array $translatable = [
        'badge_text' => 'badge_text_en',
        'title' => 'title_en',
        'title_highlight' => 'title_highlight_en',
        'subtitle' => 'subtitle_en',
        'description' => 'description_en',
        'button_primary_text' => 'button_primary_text_en',
        'button_secondary_text' => 'button_secondary_text_en',
        'stat_1_label' => 'stat_1_label_en',
        'stat_2_label' => 'stat_2_label_en',
        'stat_3_label' => 'stat_3_label_en',
    ];

    protected $fillable = [
        'badge_text',
        'badge_text_en',
        'title',
        'title_en',
        'title_highlight',
        'title_highlight_en',
        'subtitle',
        'subtitle_en',
        'description',
        'description_en',
        'button_primary_text',
        'button_primary_text_en',
        'button_primary_link',
        'button_secondary_text',
        'button_secondary_text_en',
        'button_secondary_link',
        'stat_1_value',
        'stat_1_label',
        'stat_1_label_en',
        'stat_2_value',
        'stat_2_label',
        'stat_2_label_en',
        'stat_3_value',
        'stat_3_label',
        'stat_3_label_en',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public static function current(): static
    {
        return static::where('is_active', true)->first() ?? static::create([
            'title' => 'Hibiscus Efsya',
            'is_active' => true,
        ]);
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
