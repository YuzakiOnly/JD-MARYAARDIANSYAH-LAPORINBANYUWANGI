<?php

namespace App\Filament\Resources\Messages\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_lengkap')
                    ->required(),
                TextInput::make('kecamatan_id')
                    ->required()
                    ->numeric(),
                TextInput::make('user_id')
                    ->numeric(),
                TextInput::make('no_telpon')
                    ->tel()
                    ->required(),
                TextInput::make('alamat_email')
                    ->email()
                    ->required(),
                TextInput::make('deskripsi')
                    ->required(),
            ]);
    }
}
