import { Navbar } from '@/components/Navbar/Navbar'
import React from 'react'

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}
