import React from 'react';
import { MapPin, Calendar, AlertCircle, User } from 'lucide-react';
import { Link } from '@inertiajs/react';

const CardBerita = ({
    title,
    slug,
    description,
    location,
    date,
    time,
    image,
    category,
    status,
    author
}) => {
    const getCategoryColor = () => {
        switch (category) {
            case "Infrastruktur Jalan": return "bg-orange-100 text-orange-800";
            case "Fasilitas Umum": return "bg-blue-100 text-blue-800";
            case "Kebersihan Lingkungan": return "bg-green-100 text-green-800";
            case "Keamanan dan Ketertiban": return "bg-red-100 text-red-800";
            case "Pelayanan Publik": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "Diproses": return "bg-yellow-100 text-yellow-800";
            case "Selesai": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Link href={`/laporan/${slug}`} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full aspect-[4/5] object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor()}`}>
                        {category}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor()}`}>
                        {status}
                    </span>
                </div>

                <h3 className="font-bold text-lg text-slate-800 mb-1">{title}</h3>

                {author && (
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                        <User size={14} className="text-slate-400" />
                        <span>Dibuat oleh <span className="font-medium">{author}</span></span>
                    </div>
                )}

                <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex items-center gap-1.5">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    {description}
                </p>

                <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-red-500" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500" />
                        <span>{date} - {time}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CardBerita;