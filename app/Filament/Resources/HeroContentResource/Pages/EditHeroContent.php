<?php

declare(strict_types=1);

namespace App\Filament\Resources\HeroContentResource\Pages;

use App\Filament\Resources\HeroContentResource;
use App\Models\HeroContent;
use Filament\Resources\Pages\EditRecord;

class EditHeroContent extends EditRecord
{
    protected static string $resource = HeroContentResource::class;

    protected function resolveRecord(int|string $key): \Illuminate\Database\Eloquent\Model
    {
        return HeroContent::current();
    }

    protected function getHeaderActions(): array
    {
        return [];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('edit', ['record' => $this->getRecord()->getKey()]);
    }
}
