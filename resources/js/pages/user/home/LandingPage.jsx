import { HeroPattern } from '@/components/HeroPattern'
import AboutSection from '@/components/user/AboutSection'
import Header from '@/components/user/Header'
import NewsLaporin from '@/components/user/NewsLaporin'
import { MainLayout } from '@/pages/layouts/MainLayout'

const LandingPage = ({laporans = {} ,stats = {}}) => {
  return (
    <>
      <HeroPattern>
        <main className='font-outfit'>
          <Header stats={stats}/>
          <AboutSection/>
          <NewsLaporin laporans={laporans}/>
        </main>
      </HeroPattern>
    </>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage