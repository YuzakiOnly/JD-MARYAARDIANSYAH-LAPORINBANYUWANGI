<?php

namespace App\Filament\Resources\Messages\Schemas;

use App\Models\Kecamatan;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\SelectColumn;

class MessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_lengkap')
                    ->label('Full Name')
                    ->placeholder('Ahmad Cihuy')
                    ->required(),
                Select::make('kecamatan_id')
                    ->label('Kecamatan')
                    ->placeholder('Select an Kecamatan')
                    ->options(Kecamatan::pluck('name', 'id'))
                    ->required()
                    ->searchable(),
                Select::make('user_id')
                    ->label('User')
                    ->placeholder('Select User')
                    ->options(User::pluck('name', 'id'))
                    ->required()
                    ->searchable(),
                TextInput::make('no_telpon')
                    ->label('Telpone')
                    ->placeholder('085231823088')
                    ->tel()
                    ->required(),
                TextInput::make('alamat_email')
                    ->label('Email')
                    ->placeholder('example@gmail.com')
                    ->columnSpanFull()
                    ->email()
                    ->required(),
                Textarea::make('deskripsi')
                    ->label('Description')
                    ->columnSpanFull()
                    ->required(),
            ]);
    }
}
