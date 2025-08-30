import { HeroPattern } from '@/components/HeroPattern'
import AboutSection from '@/components/user/AboutSection'
import Header from '@/components/user/Header'
import { MainLayout } from '@/pages/layouts/MainLayout'

const LandingPage = ({stats}) => {
  return (
    <>
      <HeroPattern>
        <main className='font-outfit'>
          <Header stats={stats}/>
          <AboutSection/>
        </main>
      </HeroPattern>
    </>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage