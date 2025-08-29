<?php

namespace App\Filament\Resources\Laporans\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class LaporanInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('judul_laporan'),
                TextEntry::make('slug'),
                TextEntry::make('no_telpon'),
                TextEntry::make('category_id')
                    ->numeric(),
                TextEntry::make('kecamatan_id')
                    ->numeric(),
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('lokasi_asli'),
                TextEntry::make('tanggal_kejadian')
                    ->date(),
                TextEntry::make('waktu_kejadian')
                    ->time(),
                ImageEntry::make('image'),
                TextEntry::make('status'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
