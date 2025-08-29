<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Kecamatan;
use App\Models\Laporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::select('id','name')->get();
        $kecamatans = Kecamatan::select('id', 'name')->get();

        return Inertia::render('user/home/FormLaporan', [
            'categories' => $categories,
            'kecamatans' => $kecamatans
        ])
;    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "judul_laporan" => "required|string|max:255",
            "no_telpon" => "required|string|regex:/^[0-9]+$/|min:11|max:14",
            "category_id" => "required|exists:categories,id",
            "kecamatan_id" => "required|exists:kecamatans,id",
            "lokasi_asli" => "required|string|max:500",
            "deskripsi" => "required|string|min:10",
            "tanggal_kejadian" => "required|date|before_or_equal:today",
            "waktu_kejadian" => "required|date_format:H:i",
            "image" => "required|image|mimes:jpeg,jpg,png,gif|max:10240"
        ]);

        if (Auth::check()) {
            $validated['user_id'] = Auth::id();
        } else {
            $validated['user_id'] = null;
        }

        if ($request->hasFile('image')){
            $file = $request->file('image');
            $filename = $file->hashName();
            $file->storeAs('laporan_images', $filename, 'public');
            $validated['image'] = $filename;
        }

        Laporan::create($validated);

        return redirect()->back()->with('success','Laporan Berhasil Dikirim!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laporan $laporan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laporan $laporan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        //
        if($laporan->image && Storage::disk('public')->exists('laporan_images/' . $laporan->image)) {
            Storage::disk('public')->delete('laporan_images/' . $laporan->image);
        }

        $laporan->delete();

        return redirect()->back()->with('success','Laporan Berhasil Dihapus!');
    }
}