<?php

declare(strict_types=1);

namespace App\Filament\Resources\HeroContentResource\Pages;

use App\Filament\Resources\HeroContentResource;
use App\Models\HeroContent;
use Filament\Resources\Pages\ListRecords;

class ListHeroContents extends ListRecords
{
    protected static string $resource = HeroContentResource::class;

    public function mount(): void
    {
        $record = HeroContent::current();

        $this->redirect(HeroContentResource::getUrl('edit', ['record' => $record->getKey()]));
    }
}
