<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Kecamatan;
use App\Models\Message;
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
        // Admin
        $admin = User::create([
            'name'  => 'Yuzaki Aryaa',
            'email' => 'aryamenk2007@gmail.com',
            'email_verified_at' => now(),
            'role'  => 'admin',
            'password' => Hash::make(Str::random(10)),
            'google_id' => null,
            'avatar' => null,
        ]);

        // Categories
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

        // Kecamatans
        $kecamatans = [
            'Banyuwangi','Rogojampi','Kabat','Srono','Genteng','Glenmore',
            'Kalibaru','Singojuruh','Sempu','Songgon','Muncar','Cluring',
            'Purwoharjo','Tegaldlimo','Bangorejo','Pesanggaran','Siliragung',
            'Wongsorejo','Giri','Glagah','Licin','Banyuputih','Kalipuro',
            'Tegalsari'
        ];
        $kecamatanIds = collect($kecamatans)->map(fn($name) => Kecamatan::create(['name' => $name])->id);

        // 3 Dummy Testimonials
        $dummyMessages = [
            [
                'nama_lengkap'  => 'Budi Santoso',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '081234567890',
                'alamat_email'  => 'budi@example.com',
                'deskripsi'     => 'Laporan saya langsung ditindaklanjuti, mantap!'
            ],
            [
                'nama_lengkap'  => 'Siti Rahmawati',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '082345678901',
                'alamat_email'  => 'siti@example.com',
                'deskripsi'     => 'Sistem ini sangat membantu masyarakat untuk menyampaikan aspirasi.'
            ],
            [
                'nama_lengkap'  => 'Ahmad Fauzi',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '083456789012',
                'alamat_email'  => 'ahmad@example.com',
                'deskripsi'     => 'Pelayanan cepat dan responsif, terima kasih!'
            ]
        ];

        foreach ($dummyMessages as $msg) {
            Message::create($msg);
        }
    }
}