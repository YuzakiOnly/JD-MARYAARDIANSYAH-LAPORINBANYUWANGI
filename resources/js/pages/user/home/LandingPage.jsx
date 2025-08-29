import { MainLayout } from '@/pages/layouts/MainLayout'
import React from 'react'

const LandingPage = () => {
  return (
    <div>Percobaan Setup</div>
  )
}

LandingPage.layout = page => <MainLayout>{page}</MainLayout>
export default LandingPage