import { BannerUI } from '@/components/BannerUI'
import { NewsPage } from '@/components/user/NewsPage'
import { MainLayout } from '@/pages/layouts/MainLayout'

const BeritaLaporan = ({ laporans, categories, kecamatans, statuses, filters }) => {
    return (
        <div className="w-full">
            <BannerUI
                image="./assets/image/7.jpg"
                title="Berita Laporan"
                subtitle="Lihat laporan terbaru dari masyarakat"
                className="mt-10"
            />

            <NewsPage
                laporans={laporans}
                categories={categories}
                kecamatans={kecamatans}
                statuses={statuses}
                filters={filters}
            />
        </div>
    )
}

BeritaLaporan.layout = page => <MainLayout>{page}</MainLayout>
export default BeritaLaporan