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
                TextEntry::make('judul_laporan')
                    ->label('Judul Laporan'),

                TextEntry::make('slug')
                    ->label('Slug'),

                TextEntry::make('no_telpon')
                    ->label('Nomor Telepon'),

                TextEntry::make('category.name')
                    ->label('Kategori'),

                TextEntry::make('kecamatan.name')
                    ->label('Kecamatan'),

                TextEntry::make('user.name')
                    ->label('Pelapor'),

                TextEntry::make('lokasi_asli')
                    ->label('Lokasi Kejadian'),

                TextEntry::make('deskripsi')
                    ->label('Deskripsi')
                    ->columnSpanFull(),

                TextEntry::make('tanggal_kejadian')
                    ->label('Tanggal Kejadian')
                    ->date('d/m/Y'),

                TextEntry::make('waktu_kejadian')
                    ->label('Waktu Kejadian')
                    ->time('H:i'),

                ImageEntry::make('image')
                    ->label('Bukti Gambar')
                    ->disk('public')
                    ->getStateUsing(fn ($record) => $record->image
                        ? 'laporan_images/' . $record->image
                        : null)
                    ->size(300)
                    ->square()
                    ->extraImgAttributes(['class' => 'rounded shadow']),

                TextEntry::make('status')
                    ->label('Status')
                    ->badge(),

                TextEntry::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime('d/m/Y H:i'),

                TextEntry::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime('d/m/Y H:i'),
            ]);
    }
}