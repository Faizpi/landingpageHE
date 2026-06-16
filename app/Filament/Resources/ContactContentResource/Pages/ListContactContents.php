<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactContentResource\Pages;

use App\Filament\Resources\ContactContentResource;
use App\Models\ContactContent;
use Filament\Resources\Pages\ListRecords;

class ListContactContents extends ListRecords
{
    protected static string $resource = ContactContentResource::class;

    public function mount(): void
    {
        $record = ContactContent::current();

        $this->redirect(ContactContentResource::getUrl('edit', ['record' => $record->getKey()]));
    }
}
