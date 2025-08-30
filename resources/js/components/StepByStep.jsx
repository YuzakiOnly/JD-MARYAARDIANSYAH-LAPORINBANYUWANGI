import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export const StepByStep = () => {

    const steps = [
        "Masukkan judul laporan yang singkat dan jelas",
        "Isi nomor telepon yang bisa dihubungi",
        "Pilih kategori yang sesuai dengan jenis masalah",
        "Pilih wilayah atau kecamatan",
        "Tentukan lokasi asli (jika tidak tahu, gunakan peta yang sudah disediakan)",
        "Tuliskan deskripsi laporan secara detail",
        "Pilih tanggal dan waktu kejadian",
        "Unggah foto (image wajib)",
    ]

    return (
        <div className={`bg-white px-6 py-10 shadow rounded-xl`}>
            <h3 className="text-lg font-bold text-[#2D3E50] mb-4">
                Panduan Pelaporan
            </h3>
            <ul className="space-y-3 text-[#2F4858]">
                {steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <FiCheckCircle className="w-5 h-5 text-[#4BA7E3] mt-0.5" />
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}