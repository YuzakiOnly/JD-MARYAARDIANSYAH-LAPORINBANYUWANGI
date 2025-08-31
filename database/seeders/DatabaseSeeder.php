<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Kecamatan;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed only the master data + users.
     */
    public function run(): void
    {
        // 1. Categories
        $categories = [
            ['name' => 'Infrastruktur Jalan'],
            ['name' => 'Fasilitas Umum'],
            ['name' => 'Kebersihan Lingkungan'],
            ['name' => 'Keamanan dan Ketertiban'],
            ['name' => 'Pelayanan Publik'],
            ['name' => 'Lainnya'],
        ];
        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // 2. Kecamatans
        $kecamatans = [
            'Banyuwangi', 'Rogojampi', 'Kabat', 'Srono', 'Genteng',
            'Glenmore', 'Kalibaru', 'Singojuruh', 'Sempu', 'Songgon',
            'Muncar', 'Cluring', 'Purwoharjo', 'Tegaldlimo', 'Bangorejo',
            'Pesanggaran', 'Siliragung', 'Wongsorejo', 'Giri', 'Glagah',
            'Licin', 'Banyuputih', 'Kalipuro', 'Tegalsari',
        ];
        $kecamatanIds = collect($kecamatans)->map(
            fn ($name) => Kecamatan::create(['name' => $name])->id
        );

        $admin = User::create([
            'name'              => 'Admin Demo',
            'email'             => 'admindemo@gmail.com',
            'email_verified_at' => now(),
            'role'              => 'admin',
            'password'          => Hash::make('admindemo123'),
            'google_id'         => null,
            'avatar'            => null,
        ]);

        // 4. 100 dummy users (role = user)
        foreach (range(1, 100) as $i) {
            User::create([
                'name'              => "User {$i}",
                'email'             => "user{$i}@example.com",
                'email_verified_at' => now(),
                'role'              => 'user',
                'password'          => Hash::make('password'),
                'google_id'         => null,
                'avatar'            => null,
            ]);
        }

        // 5. 3 Dummy Testimonials
        $dummyMessages = [
            [
                'nama_lengkap'  => 'Budi Santoso',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '081234567890',
                'alamat_email'  => 'budi@example.com',
                'deskripsi'     => 'Laporan saya langsung ditindaklanjuti, mantap!',
            ],
            [
                'nama_lengkap'  => 'Siti Rahmawati',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '082345678901',
                'alamat_email'  => 'siti@example.com',
                'deskripsi'     => 'Sistem ini sangat membantu masyarakat untuk menyampaikan aspirasi.',
            ],
            [
                'nama_lengkap'  => 'Ahmad Fauzi',
                'kecamatan_id'  => $kecamatanIds->random(),
                'user_id'       => $admin->id,
                'no_telpon'     => '083456789012',
                'alamat_email'  => 'ahmad@example.com',
                'deskripsi'     => 'Pelayanan cepat dan responsif, terima kasih!',
            ],
        ];

        foreach ($dummyMessages as $msg) {
            Message::create($msg);
        }
    }
}