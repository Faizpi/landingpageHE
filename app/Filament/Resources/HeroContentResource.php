<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\HeroContentResource\Pages;
use App\Models\HeroContent;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
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
            Section::make('Hero Content')->schema([
                TextInput::make('badge_text')
                    ->label('Badge Text')
                    ->maxLength(255),
                Grid::make(2)->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('title_highlight')
                        ->label('Title Highlight (Gradient)')
                        ->maxLength(255),
                ]),
                TextInput::make('subtitle')
                    ->maxLength(255),
                Textarea::make('description')
                    ->rows(3)
                    ->maxLength(1000),
            ]),

            Section::make('Buttons')->schema([
                Grid::make(2)->schema([
                    TextInput::make('button_primary_text')
                        ->label('Primary Button Text')
                        ->maxLength(255),
                    TextInput::make('button_primary_link')
                        ->label('Primary Button Link')
                        ->maxLength(255),
                ]),
                Grid::make(2)->schema([
                    TextInput::make('button_secondary_text')
                        ->label('Secondary Button Text')
                        ->maxLength(255),
                    TextInput::make('button_secondary_link')
                        ->label('Secondary Button Link')
                        ->maxLength(255),
                ]),
            ]),

            Section::make('Hero Image')->schema([
                FileUpload::make('hero_image')
                    ->label('Hero Image')
                    ->image()
                    ->disk('public')
                    ->directory('images')
                    ->maxSize(2048),
            ]),

            Section::make('Statistics')->schema([
                Grid::make(3)->schema([
                    TextInput::make('stat_1_value')->label('Stat 1 Value'),
                    TextInput::make('stat_2_value')->label('Stat 2 Value'),
                    TextInput::make('stat_3_value')->label('Stat 3 Value'),
                ]),
                Grid::make(3)->schema([
                    TextInput::make('stat_1_label')->label('Stat 1 Label'),
                    TextInput::make('stat_2_label')->label('Stat 2 Label'),
                    TextInput::make('stat_3_label')->label('Stat 3 Label'),
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
