import { HeroPattern } from '@/components/HeroPattern'
import { Header } from '@/components/user/Header'
import { MainLayout } from '@/pages/layouts/MainLayout'
import React from 'react'

const LandingPage = () => {
  return (
    <>
      <HeroPattern>
        <main className='font-outfit'>
          <Header/>
        </main>
      </HeroPattern>
    </>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage