import React, { useMemo } from "react";
import { Link } from "@inertiajs/react";
import { VscPreview } from "react-icons/vsc";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { AlertCircle, Calendar, MapPin, User } from "lucide-react";

const NewsLaporin = ({ laporans = [] }) => {
    const sorted = useMemo(
        () => [...laporans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        [laporans]
    );
    const mainNews = sorted[0] || null;
    const sideNews = useMemo(
        () => sorted.slice(1).sort(() => 0.5 - Math.random()).slice(0, 3),
        [sorted]
    );

    // warna kategori
    const getCategoryColor = (category) => {
        switch (category) {
            case "Infrastruktur Jalan": return "bg-orange-100 text-orange-800";
            case "Fasilitas Umum": return "bg-blue-100 text-blue-800";
            case "Kebersihan Lingkungan": return "bg-green-100 text-green-800";
            case "Keamanan dan Ketertiban": return "bg-red-100 text-red-800";
            case "Pelayanan Publik": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    // warna status
    const getStatusColor = (status) => {
        switch (status) {
            case "Diproses": return "bg-yellow-100 text-yellow-800";
            case "Selesai": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    if (!mainNews) {
        return (
            <div className="max-w-screen-xl mx-auto my-40 px-4">
                <div className="text-center py-12">
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <VscPreview className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Laporan</h3>
                    <p className="text-gray-500 mb-4">Belum ada laporan untuk ditampilkan saat ini.</p>
                    <Link
                        href="/laporin"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Buat Laporan Pertama
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto my-14 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-800">
                        Laporan Terbaru!
                        <div>
                            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                Untuk Kamu
                            </span>
                        </div>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600">
                        Laporan terbaru dari warga Banyuwangi.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="hidden sm:block"
                >
                    <Link
                        href="/berita-laporan"
                        className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg px-6 py-3 transition flex items-center justify-center gap-2 group">
                        <VscPreview className="h-5 w-5 transform transition-transform duration-300 group-hover:-rotate-12" />
                        Lihat Semuanya
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="h-full">
                    <Link
                        href={`/laporan/${mainNews.slug}`}
                        className="block h-full rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white  flex-col">
                        <div className="relative flex-shrink-0">
                            <img
                                src={mainNews.image || "/images/placeholder.jpg"}
                                alt={mainNews.title}
                                className="w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover"
                            />

                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full shadow ${getCategoryColor(mainNews.category)}`}>
                                    {mainNews.category}
                                </span>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full shadow ${getStatusColor(mainNews.status)}`}>
                                    {mainNews.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 lg:p-6 flex-1 flex flex-col space-y-3">
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <User size={14} className="text-slate-400 flex-shrink-0" />
                                <span className="truncate">
                                    Dibuat oleh
                                    <span className="font-medium"> {mainNews.author}</span>
                                </span>
                            </div>

                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 line-clamp-3 flex-shrink-0 truncate">
                                {mainNews.title}
                            </h2>

                            <p className="text-sm text-slate-600 flex items-center gap-1.5 flex-1">
                                <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                <span className="flex-1 line-clamp-3">
                                    {mainNews.description}
                                </span>
                            </p>

                            <div className="text-sm text-slate-600 space-y-2 border-slate-100">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-red-500 flex-shrink-0" />
                                    <span className="truncate">{mainNews.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-blue-500 flex-shrink-0" />
                                    <span className="truncate">{mainNews.date} {mainNews.time}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                <div className="flex flex-col gap-4 lg:gap-6">
                    {sideNews.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}>
                            <Link
                                href={`/laporan/${item.slug}`}
                                className="relative flex  rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white group">

                                <div className="flex-shrink-0 w-24 sm:w-28 lg:w-32">
                                    <img
                                        src={item.image || "/images/placeholder.jpg"}
                                        alt={item.title}
                                        className="w-full h-40 object-cover"
                                    />
                                </div>

                                <div className="flex-1 p-3 lg:p-4 pr-10 lg:pr-12 flex flex-col justify-between min-w-0">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs text-slate-500 gap-1">
                                            <User size={12} className="text-slate-500 flex-shrink-0" />
                                            <span className="truncate">
                                                Dibuat oleh
                                                <span className="font-medium"> {item.author}</span>
                                            </span>
                                        </div>

                                        <h3 className="text-sm lg:text-base font-semibold text-slate-800 line-clamp-2 leading-tight truncate">
                                            {mainNews.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-1.5">
                                            <span
                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(
                                                    item.category
                                                )}`}
                                            >
                                                {item.category}
                                            </span>
                                            <span
                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-600 space-y-1 mt-2">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-red-500 flex-shrink-0" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-blue-500 flex-shrink-0" />
                                            <span className="truncate">
                                                {item.date} - {item.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <FaArrowRight className="absolute top-1/2 -translate-y-1/2 right-3 lg:right-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsLaporin;