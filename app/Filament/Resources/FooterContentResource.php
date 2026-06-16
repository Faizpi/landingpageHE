<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\FooterContentResource\Pages;
use App\Models\FooterContent;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class FooterContentResource extends Resource
{
    protected static ?string $model = FooterContent::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected static string | UnitEnum | null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 6;

    protected static ?string $navigationLabel = 'Footer Section';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Footer Content')->schema([
                TextInput::make('company_name')
                    ->label('Company Name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('tagline')
                    ->maxLength(255),
                Textarea::make('description')
                    ->rows(3)
                    ->maxLength(1000),
                TextInput::make('copyright_text')
                    ->label('Copyright Text')
                    ->maxLength(255),
            ]),

            Section::make('Links')->schema([
                Repeater::make('links')
                    ->schema([
                        TextInput::make('label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('url')
                            ->required()
                            ->url()
                            ->maxLength(255),
                    ])
                    ->columns(2)
                    ->addActionLabel('Add Link'),
            ]),

            Section::make('Social Links')->schema([
                Repeater::make('social_links')
                    ->schema([
                        TextInput::make('platform')
                            ->required()
                            ->maxLength(50),
                        TextInput::make('url')
                            ->required()
                            ->url()
                            ->maxLength(255),
                        TextInput::make('icon')
                            ->label('Icon (Heroicon name)')
                            ->maxLength(255),
                    ])
                    ->columns(3)
                    ->addActionLabel('Add Social Link'),
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
            'index' => Pages\ListFooterContents::route('/'),
            'edit' => Pages\EditFooterContent::route('/{record}/edit'),
        ];
    }
}
