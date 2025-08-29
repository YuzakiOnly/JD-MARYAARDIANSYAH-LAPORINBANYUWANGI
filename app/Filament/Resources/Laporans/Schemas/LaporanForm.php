<?php

namespace App\Filament\Resources\Laporans\Schemas;

use App\Models\Category;
use App\Models\Kecamatan;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class LaporanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('judul_laporan')
                    ->placeholder(('Jalan Berlubang Di Jl Ahmad Yani'))
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(fn ($state, callable $set) =>
                        $set('slug', Str::slug($state))
                    ),
                    
                Hidden::make('slug')
                    ->disabled() 
                    ->dehydrated(false),

                TextInput::make('no_telpon')
                    ->tel()
                    ->required()
                    ->maxLength(15),
                    
                Select::make('category_id')
                    ->label('Select Category')
                    ->placeholder('Select an Category')
                    ->options(Category::pluck('name','id'))
                    ->required()
                    ->searchable(),

                Select::make('kecamatan_id')
                    ->label('Select Kecamatan')
                    ->placeholder('Select an Kecamatan')
                    ->options(Kecamatan::pluck('name','id'))
                    ->required()
                    ->searchable(),

                Hidden::make('user_id')
                    ->default(auth()->id()),

                TextInput::make('lokasi_asli')
                    ->required(),

                Textarea::make('deskripsi')
                    ->required()
                    ->columnSpanFull(),

                DatePicker::make('tanggal_kejadian')
                    ->required(),

                TimePicker::make('waktu_kejadian')
                    ->required(),

                FileUpload::make('image')
                    ->image()
                    ->directory('laporan_images')
                    ->maxFiles(10240),

                Select::make('status')
                    ->options(['belum_diproses' => 'Belum diproses', 'proses' => 'Proses', 'selesai' => 'Selesai'])
                    ->default('belum_diproses')
                    ->required(),
            ]);
    }
}
