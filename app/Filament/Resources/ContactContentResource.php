<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\ContactContentResource\Pages;
use App\Models\ContactContent;
use BackedEnum;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class ContactContentResource extends Resource
{
    protected static ?string $model = ContactContent::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-phone';

    protected static string | UnitEnum | null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 5;

    protected static ?string $navigationLabel = 'Contact Section';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Contact Content')->schema([
                TextInput::make('section_label')
                    ->label('Section Label')
                    ->maxLength(255),
                Grid::make(2)->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('title_highlight')
                        ->label('Title Highlight')
                        ->maxLength(255),
                ]),
                Textarea::make('description')
                    ->rows(3)
                    ->maxLength(1000),
            ]),

            Section::make('Contact Information')->schema([
                TextInput::make('contact_info.email')
                    ->label('Email')
                    ->email()
                    ->maxLength(255),
                TextInput::make('contact_info.phone')
                    ->label('Phone')
                    ->tel()
                    ->maxLength(50),
                TextInput::make('contact_info.whatsapp')
                    ->label('WhatsApp')
                    ->tel()
                    ->maxLength(50),
                TextInput::make('contact_info.address')
                    ->label('Address')
                    ->maxLength(500),
            ]),

            Section::make('Social Links')->schema([
                TextInput::make('social_links.whatsapp')
                    ->label('WhatsApp URL')
                    ->url()
                    ->maxLength(255),
                TextInput::make('social_links.instagram')
                    ->label('Instagram URL')
                    ->url()
                    ->maxLength(255),
                TextInput::make('social_links.facebook')
                    ->label('Facebook URL')
                    ->url()
                    ->maxLength(255),
            ]),

            Section::make('Map & Status')->schema([
                Textarea::make('map_embed')
                    ->label('Map Embed Code')
                    ->rows(4),
                Toggle::make('is_active')
                    ->default(true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactContents::route('/'),
            'edit' => Pages\EditContactContent::route('/{record}/edit'),
        ];
    }
}
