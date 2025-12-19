"use client"
import FactorySection from '@/components/landing-page/factory-section'
import Header from '@/components/landing-page/header'
import HeroSection from '@/components/landing-page/hero'
import React from 'react'
import { motion } from 'framer-motion'
import Snowfall from 'react-snowfall'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Snowfall color="white"/>
      <Header />
      <HeroSection />
      <FactorySection />
    </motion.div>
  )
}

export default Home