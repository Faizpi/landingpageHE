<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\HeroContentResource\Pages;
use App\Models\HeroContent;
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

class HeroContentResource extends Resource
{
    protected static ?string $model = HeroContent::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-home';

    protected static string | UnitEnum | null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Hero Section';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Hero Content')
                ->description('Isi kolom Bahasa Indonesia saja. Kolom English terisi otomatis saat disimpan — boleh Anda timpa manual bila hasilnya kurang pas.')
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('badge_text')
                            ->label('Badge Text (ID)')
                            ->maxLength(255),
                        TextInput::make('badge_text_en')
                            ->label('Badge Text (EN)')
                            ->placeholder('Terisi otomatis')
                            ->maxLength(255),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('title')
                            ->label('Title (ID)')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('title_en')
                            ->label('Title (EN)')
                            ->placeholder('Terisi otomatis')
                            ->maxLength(255),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('title_highlight')
                            ->label('Title Highlight (ID)')
                            ->maxLength(255),
                        TextInput::make('title_highlight_en')
                            ->label('Title Highlight (EN)')
                            ->placeholder('Terisi otomatis')
                            ->maxLength(255),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('subtitle')
                            ->label('Subtitle (ID)')
                            ->maxLength(255),
                        TextInput::make('subtitle_en')
                            ->label('Subtitle (EN)')
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
                ]),

            Section::make('Buttons')->schema([
                Grid::make(3)->schema([
                    TextInput::make('button_primary_text')
                        ->label('Primary Button Text (ID)')
                        ->maxLength(255),
                    TextInput::make('button_primary_text_en')
                        ->label('Primary Button Text (EN)')
                        ->placeholder('Terisi otomatis')
                        ->maxLength(255),
                    TextInput::make('button_primary_link')
                        ->label('Primary Button Link')
                        ->maxLength(255),
                ]),
                Grid::make(3)->schema([
                    TextInput::make('button_secondary_text')
                        ->label('Secondary Button Text (ID)')
                        ->maxLength(255),
                    TextInput::make('button_secondary_text_en')
                        ->label('Secondary Button Text (EN)')
                        ->placeholder('Terisi otomatis')
                        ->maxLength(255),
                    TextInput::make('button_secondary_link')
                        ->label('Secondary Button Link')
                        ->maxLength(255),
                ]),
            ]),

            Section::make('Statistics')->schema([
                Grid::make(3)->schema([
                    TextInput::make('stat_1_value')->label('Stat 1 Value'),
                    TextInput::make('stat_2_value')->label('Stat 2 Value'),
                    TextInput::make('stat_3_value')->label('Stat 3 Value'),
                ]),
                Grid::make(3)->schema([
                    TextInput::make('stat_1_label')->label('Stat 1 Label (ID)'),
                    TextInput::make('stat_2_label')->label('Stat 2 Label (ID)'),
                    TextInput::make('stat_3_label')->label('Stat 3 Label (ID)'),
                ]),
                Grid::make(3)->schema([
                    TextInput::make('stat_1_label_en')->label('Stat 1 Label (EN)')->placeholder('Terisi otomatis'),
                    TextInput::make('stat_2_label_en')->label('Stat 2 Label (EN)')->placeholder('Terisi otomatis'),
                    TextInput::make('stat_3_label_en')->label('Stat 3 Label (EN)')->placeholder('Terisi otomatis'),
                ]),
            ]),

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
            'index' => Pages\ListHeroContents::route('/'),
            'edit' => Pages\EditHeroContent::route('/{record}/edit'),
        ];
    }
}
