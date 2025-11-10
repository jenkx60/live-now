import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Beer, Coffee, HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

const BuyCoffee = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100
        }}
        whileHover={{
            y: -5,
            transition: { duration: 0.2 }
        }}
    >
        <Card className='w-full h-fit flex flex-col'>
            <CardHeader className='flex flex-col gap-3'>
                <CardTitle className='text-lg sm:text-xl flex items-center'>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    >
                        <HeartIcon className='inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500 animate-pulse flex-shrink-0' />
                    </motion.div>
                    <span className='text-white font-bold text-[17px]'>Support Live Football Now</span>
                </CardTitle>
                <CardDescription className='text-sm sm:text-base text-gray-400 text-left'>
                    Help us keep this service free for everyone
                </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
                <motion.p 
                    className='text-sm sm:text-base text-gray-500 leading-relaxed text-left'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Live Now is completely free to use. If you find it helpful, consider buying us a beer to support development and server costs.
                </motion.p>
            </CardContent>
            <CardFooter className='pt-3'>
                <motion.div
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    className='w-full'
                >
                    <Link href='https://buymeacoffee.com/livenow1' target='_blank' rel='noopener noreferrer' className='w-full'>
                        <Button className='w-full font-medium py-3 px-4 text-sm sm:text-base text-black transition-colors duration-200 cursor-pointer' variant="default">
                            <Beer className='w-4 h-4 mr-2 flex-shrink-0' />
                            Buy Me a Beer
                        </Button>
                    </Link>
                </motion.div>
            </CardFooter>
        </Card>
    </motion.div>
  )
}

export default BuyCoffee