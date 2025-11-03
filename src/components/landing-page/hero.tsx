"use client"
import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className='bg-gradient-to-br from-primary/10 via-background to-background flex flex-col space-y-10 min-h-[80vh] justify-center'>
        <div className='max-w-2xl mx-auto px-5 py-20 mt-20 text-center space-y-10'>
            <motion.div 
              className='space-y-6'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h1 
                  className='text-white font-bold text-7xl'
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
                  >
                    Live Football
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="bg-gradient-to-r text-primary bg-clip-text"
                  >
                    Scores & Fixtures
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className='text-gray-500'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  For all major leagues in your timezone
                </motion.p>
            </motion.div>

            <motion.div 
              className='flex gap-6 justify-center'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: 'o 10px 25px rgba(251, 146, 60. 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className='text-black font-bold p-5 text-[14px] cursor-pointer'>View Live Scores</Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, boxShadow: 'o 10px 25px rgba(251, 146, 60. 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className='bg-black border-gray-500 border text-white p-5 cursor-pointer'>Coming Soon</Button>
              </motion.div>
            </motion.div>
        </div>
        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-20"
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
          className="absolute top-40 right-20 w-6 h-6 bg-orange-500 rounded-full opacity-15"
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
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-orange-300 rounded-full opacity-25"
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
    </section>
  )
}

export default HeroSection