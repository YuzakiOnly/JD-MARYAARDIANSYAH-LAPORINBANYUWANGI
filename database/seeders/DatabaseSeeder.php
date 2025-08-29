<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Kecamatan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Yuzaki Aryaa',
            'email' => 'aryamenk2007@gmail.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => Hash::make(Str::random(10)),
            'google_id' => null,
            'avatar' => null,
        ]);

        $categories = [
            ['name' => 'Infrastruktur Jalan'],
            ['name' => 'Fasilitas Umum'],
            ['name' => 'Kebersihan Lingkungan'],
            ['name' => 'Keamanan dan Ketertiban'],
            ['name' => 'Pelayanan Publik'],
            ['name' => 'Lainnya']
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $kecamatans = [
            ['name' => 'Banyuwangi'],
            ['name' => 'Rogojampi'],
            ['name' => 'Kabat'],
            ['name' => 'Srono'],
            ['name' => 'Genteng'],
            ['name' => 'Glenmore'],
            ['name' => 'Kalibaru'],
            ['name' => 'Singojuruh'],
            ['name' => 'Sempu'],
            ['name' => 'Songgon'],
            ['name' => 'Muncar'],
            ['name' => 'Cluring'],
            ['name' => 'Purwoharjo'],
            ['name' => 'Tegaldlimo'],
            ['name' => 'Bangorejo'],
            ['name' => 'Pesanggaran'],
            ['name' => 'Siliragung'],
            ['name' => 'Wongsorejo'],
            ['name' => 'Giri'],
            ['name' => 'Glagah'],
            ['name' => 'Licin'],
            ['name' => 'Banyuputih'],
            ['name' => 'Kalipuro'],
            ['name' => 'Tegalsari']
        ];

        foreach ($kecamatans as $kecamatan) {
            Kecamatan::create($kecamatan);
        }
    }
}