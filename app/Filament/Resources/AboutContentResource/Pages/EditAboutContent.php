<?php

declare(strict_types=1);

namespace App\Filament\Resources\AboutContentResource\Pages;

use App\Filament\Resources\AboutContentResource;
use App\Models\AboutContent;
use Filament\Resources\Pages\EditRecord;

class EditAboutContent extends EditRecord
{
    protected static string $resource = AboutContentResource::class;

    protected function resolveRecord(int|string $key): \Illuminate\Database\Eloquent\Model
    {
        return AboutContent::current();
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
