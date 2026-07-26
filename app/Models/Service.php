<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\AutoTranslatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use AutoTranslatable;

    /** @var array<string, string> */
    protected array $translatable = [
        'name' => 'name_en',
        'description' => 'description_en',
    ];

    protected $fillable = [
        'category_id',
        'name',
        'name_en',
        'description',
        'description_en',
        'image',
        'link',
        'is_coming_soon',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_coming_soon' => 'boolean',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /** @return BelongsTo<ServiceCategory, $this> */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }

    /** @param Builder<self> $query */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /** @param Builder<self> $query */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('display_order');
    }
}
