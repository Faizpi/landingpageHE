<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactContentResource\Pages;

use App\Filament\Resources\ContactContentResource;
use App\Models\ContactContent;
use Filament\Resources\Pages\EditRecord;

class EditContactContent extends EditRecord
{
    protected static string $resource = ContactContentResource::class;

    protected function resolveRecord(int|string $key): \Illuminate\Database\Eloquent\Model
    {
        return ContactContent::current();
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
