<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('user/home/LandingPage');
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