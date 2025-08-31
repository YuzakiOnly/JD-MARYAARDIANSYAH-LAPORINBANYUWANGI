<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/Inertia-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
</p>

LAPORIN!BANYUWANGI – SISTEM LAPORAN WARGA BERBASIS WEB
=========================================================

**Laporin! Banyuwangi** adalah sebuah aplikasi pelaporan warga berbasis web modern yang dirancang untuk memudahkan masyarakat dalam menyampaikan keluhan, aspirasi, maupun laporan permasalahan di lingkungan sekitar.  

Setiap laporan yang dibuat oleh warga akan **langsung tampil di halaman laporan/berita**, sehingga masyarakat lain bisa melihat informasi tersebut secara transparan. Namun, admin memiliki kendali penuh untuk **menonaktifkan atau menghapus laporan** apabila laporan dianggap tidak sesuai, spam, atau tidak layak ditampilkan.  

Aplikasi ini dibangun dengan teknologi **Laravel**, **Inertia.js**, **React**, **Shadcn**, dan **Filament** untuk menghadirkan antarmuka modern, mudah digunakan, serta mendukung pengelolaan laporan secara efisien.

---

## 🎯 Tentang Proyek
Proyek ini bertujuan untuk menyediakan platform digital pelaporan warga yang transparan dan mudah diakses.  
Dengan Laporin! Banyuwangi, warga dapat membuat laporan yang langsung tampil pada halaman publik sebagai berita. Admin memiliki peran untuk memverifikasi, menonaktifkan, atau menghapus laporan sehingga ekosistem laporan tetap terjaga.  

Fokus utama pengembangan adalah pada:
- **Kemudahan akses** bagi masyarakat dalam membuat laporan.
- **Transparansi** karena laporan langsung ditampilkan.
- **Kontrol dan moderasi** oleh admin agar laporan tetap relevan dan layak.
- **Antarmuka modern** dengan arsitektur kode yang terstruktur dan mudah dikembangkan.

---

## ✨ Fitur Utama

### 🔍 Pencarian & Filter Laporan
- Fitur **search dan filter** untuk memudahkan pengguna mencari berita/laporan berdasarkan kategori atau kata kunci.  
- Daftar laporan ditampilkan secara dinamis tanpa perlu reload penuh halaman.  

### 🔑 Autentikasi Pengguna
- **Login dan Register** untuk warga agar dapat membuat laporan.  
- Sistem role: **User (warga)** untuk melaporkan, **Admin** untuk mengelola laporan.  

### 📝 Laporkan Sekarang
- Tombol **“Laporkan Sekarang”** tersedia untuk warga yang sudah login.  
- Form laporan dilengkapi input judul, deskripsi, kategori, upload gambar, serta fitur **map interaktif**.  
- Lokasi otomatis terisi ketika pengguna mengklik titik pada peta.  

### 📊 Transparansi Data
- Bagian header menampilkan statistik real-time:  
  - **Jumlah laporan** yang sudah masuk.  
  - **Jumlah warga (user)** yang terdaftar.  
  - **Persentase laporan yang selesai**.  

---

## 🧩 Komponen Interaktif

### Alur Laporin:
1. **User Register/Login** → agar bisa masuk ke sistem.  
2. **Buat Laporan** → isi form laporan (judul, deskripsi, kategori, gambar, lokasi).  
3. **Laporan Terkirim** → laporan otomatis tampil di halaman berita/laporan.  
4. **Admin Moderasi** → admin bisa menonaktifkan atau menghapus laporan yang tidak sesuai.  
5. **Statistik Transparan** → semua warga bisa melihat progress laporan melalui header.  

---

### 🚀 Tech Stack

* Backend: Laravel (PHP Framework)
* Frontend: React with Inertia.js
* Database: MySQL
* UI Components: shadcn/ui with Radix UI
* Styling: Tailwind CSS
* Maps: Leaflet for location services
* Build Tool: Vite
* Animations: Motion & tw-animate-css

---

### ✨ Features

Sistem Pelaporan Komunitas: Warga dapat melaporkan masalah dan kendala lokal Peta Interaktif: Pelaporan berbasis lokasi dengan integrasi Leaflet UI Modern: Antarmuka bersih dan responsif yang dibangun dengan komponen shadcn/ui Interaksi Real-time: Pengalaman pengguna yang lancar dengan Inertia.js Ramah Seluler: Desain responsif untuk semua perangkat Dasbor Admin: Antarmuka manajemen untuk menangani laporan

---

### 🚀 Instalasi Cepat
1. Clone repositori:

```bash
git clone https://github.com/YuzakiOnly/JD_021-MARYAARDIANSYAH-LAPORINBANYUWANGI.git
cd JD_021-MARYAARDIANSYAH-LAPORINBANYUWANGI
```

2. Instal dependensi Composer:

```bash
composer install
```
3. Instal dependensi NPM:

```bash
npm install
```

4. Salin file .env.example menjadi .env:

```bash
cp .env.example .env
```

5. Generate key aplikasi:

```bash
php artisan key:generate
```

6. Edit .env untuk database dan tambahkan:
```bash
GOOGLE_CLIENT_ID=xxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxx
GOOGLE_REDIRECT_URI=http://localhost:8000/auth-google-callback
```

7. Konfigurasikan database di file .env, lalu jalankan migrasi:

```bash
php artisan migrate --seed
```

8. Buat symbolic link untuk storage:

```bash
php artisan storage:link
```

9. Jalankan server backend Laravel:

```bash
php artisan serve
```

10. Jalankan server frontend React (Vite):

```bash
npm run dev 
```
---

### 🔧 Tambahan Inertia + ShadCN + Socialite

| Langkah        | Perintah singkat                                             |
|----------------|--------------------------------------------------------------|
| Inertia server | `composer require inertiajs/inertia-laravel && php artisan inertia:middleware` |
| Inertia client | `npm install @inertiajs/react`                 |
| ShadCN init    | `npx shadcn-ui@latest init`                                  |
| Socialite      | `composer require laravel/socialite`                         |

---
### 📘 Cara Buat Google OAuth Client ID & Secret  
(untuk Login dengan Google di Laravel)
=====================================

###  1 Buka Google Cloud Console
1. Masuk ke [console.cloud.google.com](https://console.cloud.google.com) dengan akun Google kamu.  
2. Di pojok kiri-atas, klik **Select a project ▼ → NEW PROJECT**.  
3. Beri nama: `laporin-app` → **CREATE**.

==================================

### 2 Konfigurasi OAuth Consent Screen
1. **APIs & Services → OAuth consent screen**.  
2. Pilih **External** → **CREATE**.  
3. Isi minimal:
   - **App name** : `laporin-app`  
   - **User support email** : email kamu  
   - **Developer contact info** : email kamu  
4. Klik **SAVE AND CONTINUE** → **ADD OR REMOVE SCOPES** (bisa langsung **SAVE AND CONTINUE** lagi).  
5. Di bagian **Test users**, tambahkan email kamu kalau ingin coba login → **SAVE AND CONTINUE**.

=============

### 4️⃣  Buat OAuth 2.0 Client ID & Secret
1. **APIs & Services → Credentials → CREATE CREDENTIALS → OAuth client ID**.  
2. **Application type**: pilih **Web application**.  
3. **Name**: `Laporin Web Client`.  
4. **Authorized redirect URIs** → **ADD URI**:
   ```
   http://localhost:8000/auth-google-callback        # lokal
   https://yourdomain.com-auth-google-callback       # misal kalau deploy 
   ```
5. Klik **CREATE**.  
6. **Copy** Client ID dan Client Secret yang muncul.

=================

### 5️⃣  Masukkan ke `.env`
```bash
GOOGLE_CLIENT_ID=isi-client-id-kamu
GOOGLE_CLIENT_SECRET=isi-client-secret-kamu
GOOGLE_REDIRECT_URI=http://localhost:8000/auth-google-callback
```

===============

### 6️⃣  Selesai  
Jalankan ulang `php artisan serve` → login Google sudah bisa dipakai.

---

## ▶️ Cara Mengakses Aplikasi

Setelah semua langkah instalasi selesai, buka aplikasi di browser:

👉 http://localhost:8000  

### 🔑 Akun Demo Admin
Anda bisa mencoba masuk ke **halaman login** menggunakan akun demo berikut:

- **Email**: admindemo@gmail.com  
- **Password**: admindemo123  

Setelah login, untuk mengakses **Dashboard Admin**, buka:  

👉 http://localhost:8000/admin

---

### 📂 Struktur Folder
```
JD_021-MARYAARDIANSYAH-LAPORINBANYUWANGI/
├── app/
│   ├── Filament/             # Resource untuk dashboard admin (Laporan, Users, dll)
│   ├── Http/                 # Controller & middleware Laravel
│   ├── Models/               # Model database
│   └── Providers/            # Service providers (App, Filament, dsb)
│
├── bootstrap/                # File bootstrap Laravel
├── config/                   # Konfigurasi aplikasi
├── database/
│   ├── factories/            # Factory untuk testing & seeding
│   ├── migrations/           # Migrasi database
│   └── seeders/              # Seeder data awal (admin demo, dsb)
│
├── public/                   # Asset publik (favicon, index.php)
│
├── resources/
│   ├── css/                  # File CSS global
│   ├── js/                   # Frontend (React + Inertia.js)
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility libraries
│   │   ├── pages/            # Halaman React (Login, Register, Laporan, dsb)
│   │   ├── app.jsx           # Root React App
│   │   └── bootstrap.js      # Bootstrap JS
│   └── views/                # Blade views (jika ada)
│
├── routes/
│   ├── web.php               # Route utama aplikasi
│   └── console.php           # Route untuk Artisan commands
│
├── storage/
│   ├── app/                  # File aplikasi (private)
│   ├── framework/            # Cache, sessions, logs
│   └── public/laporan_images # Folder upload gambar laporan
│
├── tests/                    # Unit & feature testing
├── vendor/                   # Dependencies Laravel (Composer)
│
├── .env.example              # Template konfigurasi environment
├── artisan                   # CLI Laravel
├── composer.json             # Dependensi backend
├── package.json              # Dependensi frontend
├── vite.config.js            # Konfigurasi Vite untuk React
└── README.md                 # Dokumentasi proyek
```

---

## 👨‍💻 Author

Project ini dibuat oleh:  

**M.ARYA ARDIANSYAH**  
🔗 [GitHub - YuzakiOnly](https://github.com/YuzakiOnly)
