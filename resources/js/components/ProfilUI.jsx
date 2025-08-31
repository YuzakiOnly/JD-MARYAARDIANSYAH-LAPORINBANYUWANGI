import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import {
    MdSearch,
    MdFilterList,
    MdPerson,
    MdEmail,
    MdCalendarToday,
    MdAssignment,
    MdPending,
    MdLoop,
    MdCheckCircle,
    MdLocationOn,
    MdCategory,
    MdAccessTime,
    MdVisibility
} from 'react-icons/md'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AvatarDisplay from '@/components/AvatarDisplay'

export const ProfilUI = ({ user, laporans, userStats, categories, statuses, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '')
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all')
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all')

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/profil', {
            search: searchTerm,
            category: selectedCategory,
            status: selectedStatus
        }, { preserveState: true })
    }

    const resetFilters = () => {
        setSearchTerm('')
        setSelectedCategory('all')
        setSelectedStatus('all')
        router.get('/profil', {}, { preserveState: true })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Belum Diproses':
                return 'bg-gray-100 text-gray-700'
            case 'Diproses':
                return 'bg-yellow-100 text-yellow-700'
            case 'Selesai':
                return 'bg-green-100 text-green-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Belum Diproses':
                return <MdPending className="w-4 h-4" />
            case 'Diproses':
                return <MdLoop className="w-4 h-4" />
            case 'Selesai':
                return <MdCheckCircle className="w-4 h-4" />
            default:
                return <MdPending className="w-4 h-4" />
        }
    }

    const safeUser = user
    const safeLaporans = laporans || { data: [], links: [] }
    const safeUserStats = userStats || { total: 0, belum_diproses: 0, diproses: 0, selesai: 0 }
    const safeCategories = categories || []
    const safeStatuses = statuses || []

    return (
        <main className='font-outfit'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Profile */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                        {/* Avatar */}
                        <AvatarDisplay user={safeUser} className="w-24 h-24 sm:w-20 sm:h-20 text-3xl sm:text-2xl" />

                        {/* Info User */}
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{safeUser.name || 'User'}</h1>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-gray-600">

                                {/* Email */}
                                <div className="flex items-center gap-2">
                                    <MdEmail className="w-4 h-4" />
                                    <span>{safeUser.email || 'Email tidak tersedia'}</span>
                                </div>

                                {/* Role */}
                                <div className="flex items-center gap-2">
                                    <MdPerson className="w-4 h-4" />
                                    <span className="capitalize">{safeUser.role || 'user'}</span>
                                </div>

                                {/* Created At */}
                                <div className="flex items-center gap-2">
                                    <MdCalendarToday className="w-4 h-4" />
                                    <span>Bergabung {safeUser.created_at || 'Tanggal tidak tersedia'}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Laporan</p>
                                <p className="text-2xl font-bold text-gray-900">{safeUserStats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MdAssignment className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Belum Diproses</p>
                                <p className="text-2xl font-bold text-gray-700">{safeUserStats.belum_diproses}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <MdPending className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Sedang Diproses</p>
                                <p className="text-2xl font-bold text-yellow-700">{safeUserStats.diproses}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <MdLoop className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Selesai</p>
                                <p className="text-2xl font-bold text-green-700">{safeUserStats.selesai}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <MdCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="mb-8 p-10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <MdFilterList className="w-6 h-6 text-gray-600" />
                            Filter Laporan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                                <Input
                                    type="text"
                                    placeholder="Cari judul laporan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full"
                                />
                            </div>

                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className={`w-full`}>
                                    <SelectValue placeholder="Semua Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    {safeCategories.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className={`w-full`}>
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    {safeStatuses.map(status => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex gap-2 w-full">
                                <Button type="submit" className="flex items-center gap-2">
                                    <MdSearch className="w-4 h-4" />
                                    Cari
                                </Button>
                                <Button type="button" variant="outline" onClick={resetFilters}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Laporan Cards */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Laporan Saya</h2>

                    {safeLaporans.data && safeLaporans.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {safeLaporans.data.map((laporan) => (
                                    <div key={laporan.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="relative h-48">
                                            <img
                                                src={laporan.image || '/images/placeholder.jpg'}
                                                alt={laporan.title || 'Laporan'}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(laporan.status)}`}>
                                                    {getStatusIcon(laporan.status)}
                                                    {laporan.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                                {laporan.title || 'Judul tidak tersedia'}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {laporan.description || 'Deskripsi tidak tersedia'}
                                            </p>

                                            <div className="space-y-2 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MdCategory className="w-4 h-4" />
                                                    <span>{laporan.category || 'Kategori tidak tersedia'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MdLocationOn className="w-4 h-4" />
                                                    <span className="truncate">{laporan.location || 'Lokasi tidak tersedia'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MdAccessTime className="w-4 h-4" />
                                                    <span>{laporan.date || 'Tanggal tidak tersedia'} • {laporan.time || 'Waktu tidak tersedia'}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-gray-400">
                                                    Dibuat: {laporan.created_at || 'Tanggal tidak tersedia'}
                                                </p>
                                                <Link
                                                    href={`/laporan/${laporan.slug}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <MdVisibility className="w-4 h-4" />
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {safeLaporans.links && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex gap-2">
                                        {safeLaporans.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 text-sm rounded-lg transition-colors ${link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdAssignment className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Belum Ada Laporan</h3>
                            <p className="text-gray-600 mb-6">Anda belum membuat laporan apapun</p>
                            <Link
                                href="/laporin"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <MdAssignment className="w-5 h-5" />
                                Buat Laporan Pertama
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}