import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import CardBerita from "@/components/CardBerita";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { VscPreview } from "react-icons/vsc";

export const NewsPage = ({ laporans, categories, statuses, kecamatans, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || "all");
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || "all");
    const [selectedKecamatan, setSelectedKecamatan] = useState(filters?.kecamatan || "all");
    const [page, setPage] = useState(filters?.page || 1);

    const updateFilters = debounce((search, category, status, kecamatan, page) => {
        router.get(
            "/berita-laporan",
            { search, category, status, kecamatan, page },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, 400);

    useEffect(() => {
        updateFilters(searchTerm, selectedCategory, selectedStatus, selectedKecamatan, page);
    }, [searchTerm, selectedCategory, selectedStatus, selectedKecamatan, page]);

    return (
        <div className="max-w-screen-xl mx-auto px-4 -mt-10 relative z-20">
            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Cari laporan..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1); 
                        }}
                    />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:flex-row lg:gap-4">
                    <Select
                        value={selectedCategory}
                        onValueChange={(val) => {
                            setSelectedCategory(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full lg:w-auto">
                            <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedKecamatan}
                        onValueChange={(val) => {
                            setSelectedKecamatan(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full lg:w-auto">
                            <SelectValue placeholder="Semua Kecamatan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kecamatan</SelectItem>
                            {kecamatans.map((k) => (
                                <SelectItem key={k.id} value={k.id.toString()}>
                                    {k.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedStatus}
                        onValueChange={(val) => {
                            setSelectedStatus(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full lg:w-auto">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            {statuses.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="my-20">
                {laporans.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                            {laporans.data.map((lap) => (
                                <CardBerita
                                    key={lap.id}
                                    title={lap.title}
                                    slug={lap.slug}
                                    description={lap.description}
                                    location={lap.location}
                                    date={lap.date}
                                    time={lap.time}
                                    image={lap.image}
                                    category={lap.category}
                                    status={lap.status}
                                    author={lap.author}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-10 gap-2">
                            {laporans.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) {
                                            const url = new URL(link.url);
                                            const pageParam = url.searchParams.get("page");
                                            setPage(pageParam);
                                        }
                                    }}
                                    className={`px-3 py-1 text-sm rounded-md ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="max-w-screen-xl mx-auto my-14 px-4">
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                    <VscPreview className="w-8 h-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Belum Ada Laporan
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Belum ada laporan untuk ditampilkan saat ini.
                            </p>
                            <Link
                                href="/laporin"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Buat Laporan Pertama
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
