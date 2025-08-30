import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    User,
    Phone,
    Eye,
    Share2,
    Clock,
    Building2,
    AlertCircle
} from 'lucide-react';
import React, { useMemo } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import ContactPelapor from '@/components/ContactPelapor';

const DetailBeritaContent = ({ laporan, relatedReports = [] }) => {
    const sideNews = useMemo(() => {
        const shuffled = [...relatedReports].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    }, [relatedReports]);

    const getCategoryColor = (category) => {
        switch (category) {
            case "Infrastruktur Jalan": return "bg-orange-100 text-orange-800 border-orange-200";
            case "Fasilitas Umum": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Kebersihan Lingkungan": return "bg-green-100 text-green-800 border-green-200";
            case "Keamanan dan Ketertiban": return "bg-red-100 text-red-800 border-red-200";
            case "Pelayanan Publik": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Belum Diproses": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Diproses": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Selesai": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: laporan.title,
                text: laporan.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link berhasil disalin!');
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6 },
        }),
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <motion.article
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                    <motion.div variants={itemVariants} custom={0} className="relative">
                        <img
                            src={laporan.image}
                            alt={laporan.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm border ${getCategoryColor(laporan.category)}`}>
                                {laporan.category}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm border ${getStatusColor(laporan.status)}`}>
                                {laporan.status}
                            </span>
                        </div>
                    </motion.div>

                    <div className="p-6 md:p-8">
                        <motion.h1
                            variants={itemVariants}
                            custom={1}
                            className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight"
                        >
                            {laporan.title}
                        </motion.h1>

                        <motion.div
                            variants={itemVariants}
                            custom={2}
                            className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6 pb-6 border-b border-slate-200"
                        >
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-slate-400" />
                                <span>Dibuat oleh <span className="font-medium text-slate-800">{laporan.author}</span></span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-blue-500" />
                                <span>{laporan.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-green-500" />
                                <span>{laporan.time} WIB</span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            custom={3}
                            className="prose prose-slate max-w-none mb-8"
                        >
                            <div className="flex items-start gap-2 mb-4">
                                <AlertCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Deskripsi Laporan</h3>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                        {laporan.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            custom={4}
                            className="bg-slate-50 rounded-xl p-6 mb-6"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Informasi Detail</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-slate-800 mb-1">Lokasi Kejadian</p>
                                        <p className="text-slate-600 text-sm">{laporan.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Building2 size={20} className="text-purple-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-slate-800 mb-1">Wilayah</p>
                                        <p className="text-slate-600 text-sm">Kec. {laporan.kecamatan}</p>
                                    </div>
                                </div>
                                <ContactPelapor no_telpon={laporan.no_telpon} />
                                <div className="flex items-start gap-3">
                                    <Eye size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-slate-800 mb-1">Status Laporan</p>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(laporan.status)}`}>
                                            {laporan.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            custom={5}
                            className="flex justify-end"
                        >
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Share2 size={16} />
                                Bagikan Laporan
                            </button>
                        </motion.div>
                    </div>
                </motion.article>
            </div>

            <div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}>
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Laporan Terkait</h3>
                    {sideNews.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {sideNews.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true, amount: 0.2 }}>
                                    <Link
                                        href={`/laporan/${item.slug}`}
                                        className="relative flex items-stretch justify-between gap-4 rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white"
                                    >
                                        <div className="flex items-stretch gap-3 flex-1">
                                            <img
                                                src={item.image || "/images/placeholder.jpg"}
                                                alt={item.title}
                                                className="w-28 h-full object-cover flex-shrink-0"
                                            />
                                            <div className="p-2 pr-4 flex flex-col justify-center flex-1 min-w-0">
                                                <div className="flex items-center text-xs truncate text-slate-500 gap-1.5">
                                                    <User size={14} className="text-slate-500" />
                                                    <span>
                                                        Dibuat oleh <span className="font-medium"> {item.author}</span>
                                                    </span>
                                                </div>
                                                <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1 break-words max-w-full">
                                                    {item.title?.length > 50
                                                        ? item.title.substring(0, 50) + '…'
                                                        : item.title}
                                                </h3>

                                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-1">
                                                    <span
                                                        className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-600 space-y-0.5">
                                                    <div className="flex items-center gap-1 truncate">
                                                        <MapPin size={12} className="text-red-500" />
                                                        <span>{item.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 truncate">
                                                        <Calendar size={12} className="text-blue-500" />
                                                        <span>
                                                            {item.date} - {item.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow Right */}
                                        <FaArrowRight className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400" />
                                    </Link>

                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Tidak ada laporan terkait.</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default DetailBeritaContent;