import { HeroPattern } from '@/components/HeroPattern'
import { MainLayout } from '@/pages/layouts/MainLayout'
import { ProfilUI } from '@/components/ProfilUI'
import { BannerUI } from '@/components/BannerUI'

const Profil = ({ user = {}, laporans = {}, userStats = {}, categories = [], statuses = [], filters = {} }) => {
    return (
        <>
            <BannerUI
                image="./assets/image/4.png"
                title="Profil Saya"
                subtitle="Kelola laporan dan pantau status pengaduan Anda dengan mudah"
                className='mt-20'
            />
            <HeroPattern>
                <ProfilUI
                    user={user}
                    laporans={laporans}
                    userStats={userStats}
                    categories={categories}
                    statuses={statuses}
                    filters={filters}
                />
            </HeroPattern>
        </>
    )
}

Profil.layout = page => <MainLayout>{page}</MainLayout>
export default Profil