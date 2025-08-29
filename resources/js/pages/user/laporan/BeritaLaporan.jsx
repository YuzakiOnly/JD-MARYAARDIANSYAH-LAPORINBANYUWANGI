import { BannerUI } from '@/components/BannerUI'
import { MainLayout } from '@/pages/layouts/MainLayout'

const BeritaLaporan = () => {
    return (
        <div className="w-full">
            <BannerUI
                image="./assets/image/7.jpg"
                title="Berita Laporan"
                subtitle="Lihat laporan terbaru dari masyarakat"
                className="mt-10"
            />
        </div>
    )
}

BeritaLaporan.layout = page => <MainLayout>{page}</MainLayout>
export default BeritaLaporan