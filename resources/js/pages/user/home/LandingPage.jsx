import { HeroPattern } from '@/components/HeroPattern'
import AboutSection from '@/components/user/AboutSection'
import Header from '@/components/user/Header'
import NewsLaporin from '@/components/user/NewsLaporin'
import StepSection from '@/components/user/StepSection'
import { MainLayout } from '@/pages/layouts/MainLayout'

const LandingPage = ({laporans = {} ,stats = {}}) => {
  return (
    <>
      <HeroPattern>
        <main className='font-outfit'>
          <Header stats={stats}/>
          <AboutSection/>
          <NewsLaporin laporans={laporans}/>
          <StepSection/>
        </main>
      </HeroPattern>
    </>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage