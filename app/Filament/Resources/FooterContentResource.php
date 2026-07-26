<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\FooterContentResource\Pages;
use App\Models\FooterContent;
use App\Rules\SafeLinkDestination;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class FooterContentResource extends Resource
{
    protected static ?string $model = FooterContent::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 6;

    protected static ?string $navigationLabel = 'Footer Section';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Footer Content')
                ->description('Isi kolom Bahasa Indonesia saja. Kolom English terisi otomatis saat disimpan — boleh Anda timpa manual bila hasilnya kurang pas.')
                ->schema([
                    TextInput::make('company_name')
                        ->label('Company Name')
                        ->required()
                        ->maxLength(255),
                    Grid::make(2)->schema([
                        TextInput::make('tagline')
                            ->label('Tagline (ID)')
                            ->maxLength(255),
                        TextInput::make('tagline_en')
                            ->label('Tagline (EN)')
                            ->placeholder('Terisi otomatis')
                            ->maxLength(255),
                    ]),
                    Grid::make(2)->schema([
                        Textarea::make('description')
                            ->label('Description (ID)')
                            ->rows(3)
                            ->maxLength(1000),
                        Textarea::make('description_en')
                            ->label('Description (EN)')
                            ->placeholder('Terisi otomatis')
                            ->rows(3)
                            ->maxLength(1000),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('copyright_text')
                            ->label('Copyright Text (ID)')
                            ->maxLength(255),
                        TextInput::make('copyright_text_en')
                            ->label('Copyright Text (EN)')
                            ->placeholder('Terisi otomatis')
                            ->maxLength(255),
                    ]),
                ]),

            Section::make('Links')->schema([
                Repeater::make('links')
                    ->schema([
                        TextInput::make('label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('url')
                            ->required()
                            ->rule(new SafeLinkDestination)
                            ->maxLength(255),
                    ])
                    ->columns(2)
                    ->addActionLabel('Add Link'),
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
            ])->columns(3),

            Section::make('Status')->schema([
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
            'index' => Pages\ListFooterContents::route('/'),
            'edit' => Pages\EditFooterContent::route('/{record}/edit'),
        ];
    }
}
