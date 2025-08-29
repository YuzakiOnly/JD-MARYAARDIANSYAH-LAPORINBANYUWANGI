<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->string('judul_laporan');
            $table->string('slug')->unique();
            $table->string('no_telpon', 15);
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('kecamatan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('lokasi_asli');
            $table->text('deskripsi');
            $table->date('tanggal_kejadian');
            $table->time('waktu_kejadian');
            $table->string('image')->nullable();
            $table->enum('status', ['belum_diproses', 'proses', 'selesai'])->default('belum_diproses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};