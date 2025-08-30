<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::fallback(fn() => Inertia::render('error/NotFound'))
->name("error.page");

Route::controller(LaporanController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/berita-laporan', 'beritaLaporan')->name('berita-laporan');
    Route::get('/laporan/p', 'show')->name('laporan.show');
});

Route::controller(MessageController::class)->group(function () {
    Route::get('/contact', 'index')->name('contact');
});

Route::middleware(['auth'])->group(function() {
    Route::get('/laporin', [LaporanController::class, 'create'])->name('laporin ');
    Route::post('/laporin', [LaporanController::class, 'store'])->name('laporin.store');
    Route::post('/contact', [MessageController::class, 'store'])->name('contact.store');
});

// Auth (guest only)
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/Login'))->name('login');
    Route::get('/register', fn() => Inertia::render('auth/Register'))->name('register');

    Route::get('/forgot-password', fn() => Inertia::render('auth/ForgotPassword'))->name('password.request');

    // reset password
    Route::get('/reset-password/{token}', function (string $token) {
        $email = request()->query('email');
        return Inertia::render('auth/ResetPassword', [
            'token' => $token,
            'email' => $email,
        ]);
    })->name('password.reset');

    // Post
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');

    // Google OAuth
    Route::get('/auth-google-redirect', [AuthController::class, 'google_redirect']);
    Route::get('/auth-google-callback', [AuthController::class, 'google_callback']);
});

// logout 
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});