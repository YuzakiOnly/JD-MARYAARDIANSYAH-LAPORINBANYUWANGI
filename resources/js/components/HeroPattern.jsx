import React from 'react'

export const HeroPattern = ({children}) => {
    return (
        <div className="min-h-screen bg-[#F9FAFB] bg-opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ">
            {children}
        </div>
    )
}
