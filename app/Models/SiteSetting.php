<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SiteSetting extends Model
{
    protected $fillable = [
        'setting_key',
        'setting_value',
        'setting_type',
        'category',
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('setting_key', $key)->first();

        if (! $setting) {
            return $default;
        }

        return match ($setting->setting_type) {
            'json' => json_decode($setting->setting_value ?? '[]', true),
            'boolean' => (bool) $setting->setting_value,
            'number' => (int) $setting->setting_value,
            default => $setting->setting_value,
        };
    }

    public static function set(string $key, mixed $value, string $type = 'text', string $category = 'general'): void
    {
        static::updateOrCreate(
            ['setting_key' => $key],
            [
                'setting_value' => is_array($value) ? json_encode($value) : (string) $value,
                'setting_type' => $type,
                'category' => $category,
            ],
        );
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query;
    }
}
