import { HeroPattern } from '@/components/HeroPattern'
import AboutSection from '@/components/user/AboutSection'
import Header from '@/components/user/Header'
import NewsLaporin from '@/components/user/NewsLaporin'
import StepSection from '@/components/user/StepSection'
import { TestimonialSection } from '@/components/user/TestimonialSection'
import { MainLayout } from '@/pages/layouts/MainLayout'

const LandingPage = ({ laporans = {}, stats = {}, testimonials = [] }) => {
  return (
    <>
      <HeroPattern>
        <main className='font-outfit'>
          <Header stats={stats}/>
          <AboutSection/>
          <NewsLaporin laporans={laporans}/>
          <StepSection/>
          <TestimonialSection testimonials={testimonials}/>
        </main>
      </HeroPattern>
    </>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage