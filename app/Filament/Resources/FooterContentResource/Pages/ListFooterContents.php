<?php

declare(strict_types=1);

namespace App\Filament\Resources\FooterContentResource\Pages;

use App\Filament\Resources\FooterContentResource;
use App\Models\FooterContent;
use Filament\Resources\Pages\ListRecords;

class ListFooterContents extends ListRecords
{
    protected static string $resource = FooterContentResource::class;

    public function mount(): void
    {
        $record = FooterContent::current();

        $this->redirect(FooterContentResource::getUrl('edit', ['record' => $record->getKey()]));
    }
}
