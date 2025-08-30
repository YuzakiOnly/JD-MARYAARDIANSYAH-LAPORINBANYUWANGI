<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Laporan extends Model
{
    protected $fillable = [
        "judul_laporan",
        "slug",
        "no_telpon",
        "category_id",
        "kecamatan_id",
        "lokasi_asli",
        "deskripsi",
        "tanggal_kejadian",
        "waktu_kejadian",
        "image",
        "status",
        "user_id",
        'is_active'
    ];

    protected $casts = [
        "tanggal_kejadian" => "date",
        "waktu_kejadian"   => "datetime:H:i",
        'is_active' => 'boolean'
    ];

    protected static function booted()
    {
        static::deleting(function (self $laporan) {
            if ($laporan->image) {
                Storage::disk('public')->delete('laporan_images/' . $laporan->image);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($laporan) {
            $laporan->slug = $laporan->generateSlug($laporan->judul_laporan, $laporan->kecamatan_id);
        });

        static::updating(function ($laporan) {
            if ($laporan->isDirty('judul_laporan') || $laporan->isDirty('kecamatan_id')) {
                $laporan->slug = $laporan->generateSlug($laporan->judul_laporan, $laporan->kecamatan_id);
            }
        });
    }

    private function generateSlug($judul, $kecamatan_id)
    {
        $kecamatan = Kecamatan::find($kecamatan_id);
        $kecamatanName = $kecamatan ? $kecamatan->name : 'unknown';

        // Create slug 
        $baseSlug = Str::slug($judul . ' ' . $kecamatanName);

        // uniqe
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->where('id', '!=', $this->id ?? 0)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}