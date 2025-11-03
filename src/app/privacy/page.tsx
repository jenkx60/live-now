"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/landing-page/header'
import { Calendar, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const PrivacyPolicyPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    }

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 15
            }
        }
    }

    const iconVariants = {
        rest: { rotate: 0, scale: 1 },
        hover: { 
            rotate: 10, 
            scale: 1.2,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 10
            }
        }
    }

  return (
    <motion.div
        className='min-h-screen bg-background'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <Header />

        <main>
            <motion.div
                className='space-y-12'
                initial='hidden'
                animate='visible'
                variants={containerVariants}
            >
                {/* Header */}
                <motion.div
                    className='text-center space-y-4'
                    variants={itemVariants}
                >
                    <motion.h1
                        className='text-4xl md:text-5xl font-bold text-balance text-white'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 12 }}
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p className="text-xl text-muted-foreground text-balance" variants={itemVariants}>
                        Your privacy matters to us. Learn how we protect and handle your data.
                    </motion.p>
                    <motion.div
                        className='flex items-center justify-center gap-2 text-sm text-muted-foreground'
                        variants={itemVariants}
                    >
                        <Calendar className='w-4 h-4' />
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </motion.div>
                </motion.div>

                {/* Quick Overview */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{
                        y: -5,
                        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card>
                        <CardContent>
                            <motion.h2
                                className='text-2xl font-bold flex items-center gap-2'
                                whileHover={{ x: 10, color: '#fb923c' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Eye className='w-6 h-6' />
                                Privacy at a Glance
                            </motion.h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <motion.div
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Badge variant="secondary" className='bg-green-900 text-green-300'>
                                        No Personal Data Sale
                                    </Badge>
                                </motion.div>
                                <motion.div
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Badge variant="secondary" className='bg-green-900 text-green-300'>
                                        Minimal Data Collection
                                    </Badge>
                                </motion.div>
                                <motion.div
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Badge variant="secondary" className='bg-green-900 text-green-300'>
                                        Transparent Practices
                                    </Badge>
                                </motion.div>
                                <motion.div
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Badge variant="secondary" className='bg-green-900 text-green-300'>
                                        User Control
                                    </Badge>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </main>
    </motion.div>
  )
}

export default PrivacyPolicyPage