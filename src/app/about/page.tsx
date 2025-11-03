"use client"
import Footer from '@/components/landing-page/footer'
import Header from '@/components/landing-page/header'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Globe, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

const AboutPage = () => {
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
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <Header />

        <main className="container mx-auto px-4 py-16 max-w-4xl mt-24">
            <motion.div 
                className="space-y-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.div 
                    className="text-center space-y-4"
                    variants={itemVariants}
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold text-balance text-white"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    >
                        About Global RaceTime
                    </motion.h1>
                    <motion.p className="text-xl text-muted-foreground text-balance" variants={itemVariants}>
                        Your ultimate destination for live football scores and fixtures from around the world
                    </motion.p>
                </motion.div>

                {/* Mission */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px rgba(251, 146, 60, 0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card>
                        <CardContent className="p-8 space-y-4">
                            <motion.h2 
                                className="text-2xl font-bold" 
                                whileHover={{ x: 10, color: "#fb923c" }} 
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Our Mission
                            </motion.h2>
                            <motion.p 
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                Live Football Now was created to solve a simple problem: keeping track of football matches across
                                different time zones and leagues. Whether you&apos;re following the Premier League from Asia, La Liga from
                                North America, or the Champions League from anywhere in the world, we make it easy to never miss a
                                match.
                            </motion.p>
                            <motion.p 
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                We believe that football is a global sport that brings people together, and everyone should have easy
                                access to live scores, fixtures, and match information in their local time zone.
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Features */}
                <motion.div 
                    className="grid md:grid-cols-2 gap-6"
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                    >
                        <Card>
                            <CardContent className="p-6 space-y-3">
                                <motion.div 
                                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                                    variants={iconVariants}
                                >
                                    <Globe className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Global Coverage</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Track matches from Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa
                                    League, and more.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        initial="rest"
                    >
                        <Card>
                            <CardContent className="p-6 space-y-3">
                                <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" variants={iconVariants}>
                                    <Clock className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Local Time Conversion</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    All match times are automatically converted to your local timezone, so you never have to do the math.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        initial="rest"
                    >
                        <Card>
                            <CardContent className="p-6 space-y-3">
                                <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" variants={iconVariants}>
                                    <Zap className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Live Updates</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Get real-time score updates for live matches with minute-by-minute coverage of all the action.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        initial="rest"
                    >
                        <Card>
                            <CardContent className="p-6 space-y-3">
                                <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" variants={iconVariants}>
                                    <Users className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Free for Everyone</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                Live Now is completely free to use. We&apos;re supported by non-intrusive ads and generous donations
                                from our community.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Technology */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 25px rgba(251, 146, 60, 0.1)" 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card>
                        <CardContent className="p-8 space-y-4">
                            <motion.h2 
                                className="text-2xl font-bold"
                                whileHover={{ x: 10, color: "#fb923c" }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Built with Modern Technology
                            </motion.h2>
                            <motion.p 
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                Live Now is built using cutting-edge web technologies including Next.js, React, and Tailwind CSS.
                                We integrate with reliable football data APIs to provide accurate, real-time information about matches,
                                scores, and fixtures.
                            </motion.p>
                            <motion.p 
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Our platform is designed to be fast, responsive, and accessible on all devices, from desktop computers
                                to mobile phones.
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Support */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{ 
                        y: -5,
                        boxShadow: "0 15px 30px rgba(251, 146, 60, 0.2)" 
                    }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                >
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-8 space-y-4 text-center">
                            <motion.h2 
                                className="text-2xl font-bold"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2 
                                }}
                            >
                                Support Our Work
                            </motion.h2>
                            <motion.p  
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                If you find Live Now useful, please consider supporting us through a donation. Your support helps
                                us maintain the service, cover API costs, and continue improving the platform for football fans
                                worldwide.
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
      </main>

      <Footer />
    </motion.div>
  )
}

export default AboutPage