<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Category;
use App\Models\Product;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-shopping-bag';

    protected static string | UnitEnum | null $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Grid::make(2)->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Select::make('category_id')
                    ->label('Category')
                    ->options(Category::pluck('name', 'id'))
                    ->searchable()
                    ->nullable(),
            ]),
            Textarea::make('description')
                ->rows(3)
                ->maxLength(1000),
            Grid::make(3)->schema([
                TextInput::make('price')
                    ->label('Price (Rp)')
                    ->numeric()
                    ->required()
                    ->prefix('Rp'),
                TextInput::make('discount_price')
                    ->label('Discount Price (Rp)')
                    ->numeric()
                    ->nullable()
                    ->prefix('Rp'),
                FileUpload::make('image')
                    ->label('Product Image')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->maxSize(2048),
            ]),
            Grid::make(3)->schema([
                TextInput::make('shopee_link')
                    ->label('Shopee Link')
                    ->url()
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('tokopedia_link')
                    ->label('Tokopedia Link')
                    ->url()
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('whatsapp')
                    ->label('WhatsApp')
                    ->tel()
                    ->maxLength(255)
                    ->nullable(),
            ]),
            Grid::make(2)->schema([
                Select::make('status')
                    ->options([
                        'publish' => 'Publish',
                        'draft' => 'Draft',
                    ])
                    ->default('draft')
                    ->required(),
                Toggle::make('featured')
                    ->default(false),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->circular(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable(),
                TextColumn::make('price')
                    ->label('Price')
                    ->formatStateUsing(fn ($state): string => 'Rp ' . number_format((float) $state, 0, ',', '.'))
                    ->sortable(),
                TextColumn::make('discount_price')
                    ->label('Discount Price')
                    ->formatStateUsing(fn (?float $state): ?string => $state ? 'Rp ' . number_format($state, 0, ',', '.') : null)
                    ->sortable()
                    ->toggleable(),
                IconColumn::make('featured')
                    ->boolean(),
                IconColumn::make('status')
                    ->label('Status')
                    ->boolean()
                    ->getStateUsing(fn ($state): bool => $state === 'publish'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('category_id')
                    ->label('Category')
                    ->options(Category::pluck('name', 'id')),
                SelectFilter::make('status')
                    ->options([
                        'publish' => 'Published',
                        'draft' => 'Draft',
                    ]),
                SelectFilter::make('featured')
                    ->options([
                        1 => 'Featured',
                        0 => 'Not Featured',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
