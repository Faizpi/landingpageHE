<?php

declare(strict_types=1);

namespace App\Filament\Resources\AboutContentResource\Pages;

use App\Filament\Resources\AboutContentResource;
use App\Models\AboutContent;
use Filament\Resources\Pages\ListRecords;

class ListAboutContents extends ListRecords
{
    protected static string $resource = AboutContentResource::class;

    public function mount(): void
    {
        $record = AboutContent::current();

        $this->redirect(AboutContentResource::getUrl('edit', ['record' => $record->getKey()]));
    }
}
