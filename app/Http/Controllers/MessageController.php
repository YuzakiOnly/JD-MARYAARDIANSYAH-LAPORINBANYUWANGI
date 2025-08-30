<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use App\Models\Message;
use Auth;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kecamatans = Kecamatan::select('id', 'name')->orderBy('name')->get();
        return inertia('user/contact/ContactUs', [
            'kecamatans' => $kecamatans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'no_telpon' => 'required|string|max:15',
            'alamat_email' => 'required|email|max:255',
            'deskripsi' => 'required|string|min:10',
        ]);

        Message::create([
            'nama_lengkap' => $request->nama_lengkap,
            'kecamatan_id' => $request->kecamatan_id,
            'user_id' => Auth::id(),
            'no_telpon' => $request->no_telpon,
            'alamat_email' => $request->alamat_email,
            'deskripsi' => $request->deskripsi,
        ]);

        return back()->with('success', 'Pesan berhasil dikirim!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }

    /**
     * Ambil 3 pesan terbaru untuk ditampilkan sebagai testimoni
     */
    public function testimonials($laporans, $stats)
    {
        $testimonials = Message::with('kecamatan')
            ->latest()
            ->limit(3)
            ->get()
            ->map(fn($msg) => [
                'name' => $msg->nama_lengkap,
                'role' => 'Warga ' . $msg->kecamatan->name,
                'feedback' => $msg->deskripsi,
                'image' => 'https://ui-avatars.com/api/?name=' . urlencode($msg->nama_lengkap) . '&background=3b82f6&color=fff',
            ]);

        return inertia('user/home/LandingPage', [
            'laporans' => $laporans,
            'stats' => $stats,
            'testimonials' => $testimonials,
        ]);
    }
}