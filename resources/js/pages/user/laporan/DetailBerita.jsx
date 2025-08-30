import { MainLayout } from '@/pages/layouts/MainLayout';
import DetailBeritaContent from '@/components/user/DetailBeritaContent';
import { motion } from 'framer-motion';
import {
    ArrowLeft
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { BannerUI } from '@/components/BannerUI';
import { HeroPattern } from '@/components/HeroPattern';

const DetailBerita = ({ laporan, relatedReports }) => (
    <div className="min-h-screen bg-gray-50 py-10 w-full">
        <BannerUI
            image=" /assets/image/8.jpg"
            title="Berita Laporan"
            subtitle="Lihat laporan terbaru dari masyarakat"
            className="mt-16"
        />

        <HeroPattern>
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Kembali ke Halaman Sebelumnya</span>
                    </button>
                </motion.div>
                <DetailBeritaContent laporan={laporan} relatedReports={relatedReports} />
            </div>
        </HeroPattern>
    </div>
);

DetailBerita.layout = page => <MainLayout>{page}</MainLayout>;
export default DetailBerita;