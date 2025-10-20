import React from 'react'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <section className='bg-gradient-to-br from-primary/10 via-background to-background flex flex-col space-y-10 min-h-[80vh] justify-center'>
        <div className='max-w-2xl mx-auto px-5 py-20 mt-20 text-center space-y-10'>
            <div className='space-y-6'>
                <h1 className='text-white font-bold text-7xl'>Live Football Scores & Fixtures</h1>
                <p className='text-gray-500'>For all major leagues in your timezone</p>
            </div>
            <div className='flex gap-6 justify-center'>
                <Button className='text-black font-bold p-5 text-[14px] cursor-pointer'>View Live Scores</Button>
                <Button className='bg-black border-gray-500 border text-white p-5 cursor-pointer'>Coming Soon</Button>
            </div>
        </div>

    </section>
  )
}

export default HeroSection