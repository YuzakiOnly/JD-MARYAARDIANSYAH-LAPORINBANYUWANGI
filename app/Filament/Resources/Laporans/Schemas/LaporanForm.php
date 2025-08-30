<?php

namespace App\Filament\Resources\Laporans\Schemas;

use App\Models\Category;
use App\Models\Kecamatan;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Schema;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LaporanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('judul_laporan')
                    ->placeholder(('Contoh: Jalan Berlubang di Jl. Ahmad Yani'))
                    ->maxLength(60)
                    ->required(),

                Hidden::make('slug')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('no_telpon')
                    ->label('Nomor Telepon')
                    ->placeholder('08xxxxxxxxxx')
                    ->required()
                    ->maxLength(15)
                    ->extraInputAttributes([
                        'inputmode' => 'numeric',
                        'pattern' => '[0-9]*',
                        'onkeypress' => 'return event.charCode >= 48 && event.charCode <= 57',
                    ])
                    ->rules(['regex:/^[0-9]+$/', 'min:10', 'max:15']),

                Select::make('category_id')
                    ->label('Select Category')
                    ->placeholder('Select an Category')
                    ->options(Category::pluck('name', 'id'))
                    ->required()
                    ->searchable(),

                Select::make('kecamatan_id')
                    ->label('Select Kecamatan')
                    ->placeholder('Select an Kecamatan')
                    ->options(Kecamatan::pluck('name', 'id'))
                    ->required()
                    ->searchable(),

                Hidden::make('user_id')
                    ->default(auth()->id()),

                TextInput::make('lokasi_asli')
                    ->placeholder('Contoh: Depan Toko Makmur, Jl. Ahmad Yani')
                    ->required(),

                Select::make('status')
                    ->label('Select Status')
                    ->placeholder('Select an Status')
                    ->options(['belum_diproses' => 'Belum diproses', 'proses' => 'Proses', 'selesai' => 'Selesai'])
                    ->default('belum_diproses')
                    ->required()
                    ->searchable(),

                Textarea::make('deskripsi')
                    ->required()
                    ->required()
                    ->maxLength(1000)
                    ->minLength(25)
                    ->columnSpanFull(),

                DatePicker::make('tanggal_kejadian')
                    ->label('Tanggal Kejadian')
                    ->required(),

                TimePicker::make('waktu_kejadian')
                    ->label('Waktu Kejadian')
                    ->seconds(false)
                    ->displayFormat('H:i')
                    ->timezone('Asia/Jakarta')
                    ->required(),

                FileUpload::make('image')
                    ->image()
                    ->directory('laporan_images')
                    ->disk('public')
                    ->visibility('public')
                    ->getUploadedFileNameForStorageUsing(fn($file) => $file->hashName())
                    ->saveUploadedFileUsing(function (UploadedFile $file, $record) {
                        $old = $record?->image;
                        $path = $file->store('laporan_images', 'public');
                        $new = basename($path);

                        if ($old && $old !== $new) {
                            Storage::disk('public')->delete('laporan_images/' . $old);
                        }

                        return $new; 
                    })
                    ->getUploadedFileUsing(
                        fn($file) => $file
                        ? [
                            'name' => $file,
                            'url' => Storage::disk('public')->url('laporan_images/' . $file),
                        ]
                        : null
                    )
                    ->afterStateHydrated(function ($component, $state) {
                        if ($state && is_string($state)) {
                            $component->state([
                                'name' => $state,
                                'url' => Storage::disk('public')->url('laporan_images/' . $state),
                            ]);
                        }
                    })
                    ->required(fn($livewire) => $livewire instanceof CreateRecord)
                    ->maxSize(10240)
                    ->columnSpanFull(),

            ]);
    }
}
