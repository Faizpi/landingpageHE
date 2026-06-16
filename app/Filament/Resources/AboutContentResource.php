<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\AboutContentResource\Pages;
use App\Models\AboutContent;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class AboutContentResource extends Resource
{
    protected static ?string $model = AboutContent::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-information-circle';

    protected static string | UnitEnum | null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'About Section';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('About Content')->schema([
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
                    ->rows(4)
                    ->maxLength(2000),
            ]),

            Section::make('Features')->schema([
                Repeater::make('features')
                    ->schema([
                        TextInput::make('icon')
                            ->label('Icon (Heroicon name)')
                            ->maxLength(255),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('description')
                            ->rows(2)
                            ->maxLength(500),
                    ])
                    ->columns(3)
                    ->defaultItems(4)
                    ->addActionLabel('Add Feature'),
            ]),

            Section::make('Statistics')->schema([
                Repeater::make('stats')
                    ->schema([
                        TextInput::make('value')
                            ->required()
                            ->maxLength(50),
                        TextInput::make('label')
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2)
                    ->addActionLabel('Add Stat'),
            ]),

            Section::make('Image & Status')->schema([
                FileUpload::make('image')
                    ->label('About Image')
                    ->image()
                    ->disk('public')
                    ->directory('images')
                    ->maxSize(2048),
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
            'index' => Pages\ListAboutContents::route('/'),
            'edit' => Pages\EditAboutContent::route('/{record}/edit'),
        ];
    }
}
