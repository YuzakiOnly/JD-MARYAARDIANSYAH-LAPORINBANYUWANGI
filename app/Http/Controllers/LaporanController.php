<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Kecamatan;
use App\Models\Laporan;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $laporans = Laporan::with(['category', 'user', 'kecamatan'])
            ->select('id', 'judul_laporan', 'slug', 'category_id', 'kecamatan_id', 'lokasi_asli', 'deskripsi', 'tanggal_kejadian', 'waktu_kejadian', 'image', 'status', 'created_at', 'user_id')
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(fn($l) => ([
                'id' => $l->id,
                'slug' => $l->slug,
                'title' => $l->judul_laporan,
                'location' => $l->lokasi_asli,
                'date' => $l->tanggal_kejadian?->format('d M Y'),
                'time' => $l->waktu_kejadian?->format('H:i'),
                'image' => $l->image ? Storage::url('laporan_images/' . $l->image) : '/images/placeholder.jpg',
                'status' => $this->formatStatus($l->status),
                'category' => $l->category->name ?? '-',
                'author' => $l->user->name ?? 'Anonim',
                'description' => Str::limit($l->deskripsi, 120),
                'created_at' => $l->created_at,
            ]));

        // calculate
        $totalLaporan = Laporan::count();
        $totalWarga = User::where('role', 'user')->count();
        $totalProses = Laporan::where('status', 'proses')->count();
        $totalSelesai = Laporan::where('status', 'selesai')->count();

        if ($totalLaporan > 0) {
            if ($totalProses > 0 && $totalSelesai == 0) {
                $persenSelesai = 25;
            } elseif ($totalSelesai > 0) {
                $persenSelesai = round(($totalSelesai / $totalLaporan) * 100, 2);
            } else {
                $persenSelesai = 0;
            }
        } else {
            $persenSelesai = 0;
        }

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

        return Inertia::render('user/home/LandingPage', [
            'laporans' => $laporans,
            'stats' => [
                'laporan' => $totalLaporan,
                'warga' => $totalWarga,
                'selesai' => $persenSelesai,
            ],
            'testimonials' => $testimonials,
        ]);
    }

    private function formatStatus($status)
    {
        switch ($status) {
            case 'belum_diproses':
                return 'Belum Diproses';
            case 'proses':
                return 'Diproses';
            case 'selesai':
                return 'Selesai';
            default:
                return $status;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::select('id', 'name')->get();
        $kecamatans = Kecamatan::select('id', 'name')->get();

        return Inertia::render('user/laporan/FormLaporan', [
            'categories' => $categories,
            'kecamatans' => $kecamatans
        ])
        ;
    }

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

        // Default is_active = true (hidup)
        $validated['is_active'] = true;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->hashName();
            $file->storeAs('laporan_images', $filename, 'public');
            $validated['image'] = $filename;
        }

        Laporan::create($validated);

        return redirect()->back()->with('success', 'Laporan Berhasil Dikirim!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan, $slug)
    {
        $laporan = Laporan::with(['category', 'kecamatan', 'user'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $formattedLaporan = [
            'id' => $laporan->id,
            'slug' => $laporan->slug,
            'title' => $laporan->judul_laporan,
            'description' => $laporan->deskripsi,
            'image' => $laporan->image
                ? Storage::url('laporan_images/' . $laporan->image)
                : '/images/placeholder.jpg',
            'category' => $laporan->category->name,
            'location' => $laporan->lokasi_asli,
            'date' => $laporan->tanggal_kejadian->format('d M Y'),
            'time' => $laporan->waktu_kejadian->format('H:i'),
            'status' => $this->formatStatus($laporan->status),
            'author' => $laporan->user->name ?? 'Anonim',
            'no_telpon' => $laporan->no_telpon,
            'kecamatan' => $laporan->kecamatan->name,
            'created_at' => $laporan->created_at,
            'updated_at' => $laporan->updated_at,
        ];

        $relatedReports = Laporan::with(['category', 'user', 'kecamatan'])
            ->where('category_id', $laporan->category_id)
            ->where('id', '!=', $laporan->id)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(fn($l) => [
                'id' => $l->id,
                'slug' => $l->slug,
                'title' => $l->judul_laporan,
                'location' => $l->lokasi_asli,
                'date' => $l->tanggal_kejadian->format('d M Y'),
                'time' => $l->waktu_kejadian->format('H:i'),
                'image' => $l->image ? Storage::url('laporan_images/' . $l->image) : '/images/placeholder.jpg',
                'status' => $this->formatStatus($l->status),
                'category' => $l->category->name ?? '-',
                'author' => $l->user->name ?? 'Anonim',
                'description' => Str::limit($l->deskripsi, 120),
            ]);

        return Inertia::render('user/laporan/DetailBerita', [
            'laporan' => $formattedLaporan,
            'relatedReports' => $relatedReports
        ]);
    }

    public function beritaLaporan(Request $request)
    {
        $query = Laporan::with(['category', 'kecamatan', 'user'])
            ->select([
                'id',
                'judul_laporan',
                'slug',
                'category_id',
                'kecamatan_id',
                'lokasi_asli',
                'deskripsi',
                'tanggal_kejadian',
                'waktu_kejadian',
                'image',
                'status',
                'created_at',
                'user_id'
            ])
            ->where('is_active', true)
            ->orderBy('created_at', 'desc');

        // Filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category_id', $request->category);
        }
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        if ($request->filled('kecamatan') && $request->kecamatan !== 'all') {
            $query->where('kecamatan_id', $request->kecamatan);
        }
        if ($request->filled('search')) {
            $query->where('judul_laporan', 'like', '%' . $request->search . '%');
        }

        $laporans = $query->paginate(12)->through(function ($lap) {
            return [
                'id' => $lap->id,
                'slug' => $lap->slug,
                'title' => $lap->judul_laporan,
                'description' => $lap->deskripsi,
                'image' => $lap->image
                    ? Storage::url('laporan_images/' . $lap->image)
                    : '/images/placeholder.jpg',
                'category' => $lap->category->name,
                'location' => $lap->lokasi_asli,
                'date' => $lap->tanggal_kejadian->format('d M Y'),
                'time' => $lap->waktu_kejadian->format('H:i'),
                'status' => $this->formatStatus($lap->status),
                'author' => $lap->user->name ?? 'Anonim',
                'created_at' => $lap->created_at,
            ];
        })->appends($request->all());

        return Inertia::render('user/laporan/BeritaLaporan', [
            'laporans' => $laporans,
            'categories' => Category::all(['id', 'name']),
            'kecamatans' => Kecamatan::all(['id', 'name']),
            'statuses' => [
                ['value' => 'belum_diproses', 'label' => 'Belum Diproses'],
                ['value' => 'proses', 'label' => 'Diproses'],
                ['value' => 'selesai', 'label' => 'Selesai'],
            ],
            'filters' => $request->only(['search', 'category', 'status', 'kecamatan']),
        ]);
    }

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
        if ($laporan->image && Storage::disk('public')->exists('laporan_images/' . $laporan->image)) {
            Storage::disk('public')->delete('laporan_images/' . $laporan->image);
        }

        $laporan->delete();

        return redirect()->back()->with('success', 'Laporan Berhasil Dihapus!');
    }
}