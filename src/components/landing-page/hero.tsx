"use client"
import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className='bg-[url("/stadium.jpg")] bg-cover bg-center bg-no-repeat flex flex-col space-y-6 md:space-y-10 min-h-[80vh] md:min-h-[85vh] justify-center relative overflow-hidden'>
      <div className="absolute inset-0 bg-black/60 h-full"></div>
        <div className='relative max-w-xs md:max-w-2xl mx-auto px-5 py-20 mt-20 text-center space-y-10'>
            <motion.div 
              className='space-y-4 md:space-y-6'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h1 
                  className='text-white font-bold text-3xl md:text-7xl leading-tight'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='block sm:inline'
                  >
                    Live Football
                  </motion.span>
                  <br className='hidden sm:block' />
                  <span className='sm:hidden'> </span>
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="bg-gradient-to-r text-primary bg-clip-text block sm:inline"
                  >
                    Scores & Fixtures
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className='text-gray-500 text-sm md:text-base max-w-sm md:max-w-md mx-auto'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  For all major leagues in your timezone
                </motion.p>
            </motion.div>

            <motion.div 
              className='flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: 'o 10px 25px rgba(251, 146, 60, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className='w-full md:w-auto'
              >
                <Button className='text-black font-bold p-4 md:p-5 text-xs md:text-[14px] cursor-pointer w-full '>View Live Scores</Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, boxShadow: 'o 10px 25px rgba(251, 146, 60. 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className='w-full md:w-auto'

              >
                <Button className='bg-black border-gray-500 border text-white p-4 md:p-5 text-xs md:text-[14px] cursor-pointer w-full'>Coming Soon</Button>
              </motion.div>
            </motion.div>
        </div>
        {/* Floating background elements */}
        <motion.div
          className="absolute top-16 md:top-20 left-4 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-32 md:top-40 right-6 md:right-20 w-4 h-4 md:w-6 md:h-6 bg-orange-500 rounded-full opacity-15"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-32 md:bottom-40 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-orange-300 rounded-full opacity-25"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
          }}
        />

        <motion.div
          className="hidden md:block absolute top-1/3 right-1/3 w-2 h-2 lg:w-3 lg:h-3 bg-orange-200 rounded-full opacity-30"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />

        <motion.div
          className="hidden lg:block absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-600 rounded-full opacity-20"
          animate={{
            x: [0, 15, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1.5,
          }}
        />

        {/* Mobile-only smaller floating elements */}
        <motion.div
          className="block sm:hidden absolute top-1/2 right-8 w-2 h-2 bg-orange-400 rounded-full opacity-25"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.8,
          }}
        />
    </section>
  )
}

export default HeroSection