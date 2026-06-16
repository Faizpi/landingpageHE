<?php

declare(strict_types=1);

namespace App\Filament\Resources\FooterContentResource\Pages;

use App\Filament\Resources\FooterContentResource;
use App\Models\FooterContent;
use Filament\Resources\Pages\EditRecord;

class EditFooterContent extends EditRecord
{
    protected static string $resource = FooterContentResource::class;

    protected function resolveRecord(int|string $key): \Illuminate\Database\Eloquent\Model
    {
        return FooterContent::current();
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
