<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Inspiration extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'status',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $inspiration): void {
            if (empty($inspiration->slug)) {
                $inspiration->slug = Str::slug($inspiration->title);
            }
        });
    }

    /** @param Builder<self> $query */
    public function scopePublish(Builder $query): Builder
    {
        return $query->where('status', 'publish');
    }
}
