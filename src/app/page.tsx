import FactorySection from '@/components/landing-page/factory-section'
import Header from '@/components/landing-page/header'
import HeroSection from '@/components/landing-page/hero'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FactorySection />
    </div>
  )
}

export default Home