<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use BackedEnum;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-envelope';

    protected static string | UnitEnum | null $navigationGroup = 'Messages';

    protected static ?int $navigationSort = 7;

    protected static ?string $navigationLabel = 'Contact Messages';

    public static function getNavigationBadge(): ?string
    {
        $count = ContactSubmission::where('is_read', false)->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Message Details')->schema([
                TextInput::make('name')->disabled(),
                TextInput::make('email')->disabled(),
                TextInput::make('subject')->disabled(),
                Textarea::make('message')->disabled()->rows(5),
            ]),
            Section::make('Status')->schema([
                Toggle::make('is_read'),
                Toggle::make('is_replied'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('email')->searchable(),
                TextColumn::make('subject')->searchable()->limit(50),
                TextColumn::make('message')->limit(50),
                IconColumn::make('is_read')
                    ->label('Read')
                    ->boolean(),
                IconColumn::make('is_replied')
                    ->label('Replied')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('is_read')
                    ->label('Read Status')
                    ->options([0 => 'Unread', 1 => 'Read']),
            ])
            ->actions([
                Action::make('mark_read')
                    ->label('Mark as Read')
                    ->icon('heroicon-o-check')
                    ->requiresConfirmation()
                    ->visible(fn (ContactSubmission $record) => ! $record->is_read)
                    ->action(fn (ContactSubmission $record) => $record->update(['is_read' => true])),
                ViewAction::make(),
            ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactSubmissions::route('/'),
            'view' => Pages\ViewContactSubmission::route('/{record}'),
        ];
    }
}
