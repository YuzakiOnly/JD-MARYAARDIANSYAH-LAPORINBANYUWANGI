<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->placeholder('Ahmad Cihuy')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->placeholder('example@gmail.com')
                    ->email()
                    ->required(),
                Hidden::make('email_verified_at'),
                Select::make('role')
                    ->options(['admin' => 'Admin', 'user' => 'User'])
                    ->default('user')
                    ->searchable()
                    ->required(),
                TextInput::make('password')
                    ->label('Password')
                    ->placeholder('Password')
                    ->required()
                    ->password(),
                Hidden::make('google_id'),
                Hidden::make('avatar'),
            ]);
    }
}
