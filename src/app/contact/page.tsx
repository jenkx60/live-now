"use client"
import { AdBanner } from '@/components/landing-page/ad-banner'
import Footer from '@/components/landing-page/footer'
import Header from '@/components/landing-page/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Send } from 'lucide-react'
import React, { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'

const ContactPage = () => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to a backend API
    console.log("[v0] Contact form submitted:", formData)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.9 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-muted-foreground text-balance"
                        variants={itemVariants}
                    >
                        Have questions, feedback, or suggestions? We&apos;d love to hear from you.
                    </motion.p>
                </motion.div>

                {/* <AdBanner slot="0987654321" format="horizontal" className="my-4 mx-auto w-full max-w-4xl" /> */}
                
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        className='space-y-6'
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {/* Contact Form */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className='h-fit'>
                                <CardContent className="p-8">
                                    <motion.form 
                                        onSubmit={handleSubmit} 
                                        className="space-y-6"
                                        initial="hidden"
                                        animate="visible"
                                        variants={containerVariants}
                                    >
                                        <motion.div 
                                            className="space-y-2"
                                            variants={itemVariants}
                                        >
                                            <Label htmlFor="name">Name</Label>
                                            <motion.div
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </motion.div>
                                        </motion.div>

                                        <motion.div 
                                            className="space-y-2" 
                                            variants={itemVariants}
                                        >
                                            <Label htmlFor="email">Email</Label>
                                            <motion.div 
                                                whileFocus={{ scale: 1.02 }} 
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your.email@example.com"
                                                    required
                                                />
                                            </motion.div>
                                        </motion.div>

                                        <motion.div className="space-y-2" variants={itemVariants}>
                                            <Label htmlFor="subject">Subject</Label>
                                            <motion.div
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="What's this about?"
                                                    required
                                                />
                                            </motion.div>
                                        </motion.div>

                                        <motion.div className="space-y-2" variants={itemVariants}>
                                            <Label htmlFor="message">Message</Label>
                                            <motion.div
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us more..."
                                                    rows={6}
                                                    cols={31}
                                                    required
                                                />
                                            </motion.div>
                                        </motion.div>

                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button type="submit" className="w-full" disabled={submitted}>
                                                <AnimatePresence mode='wait'>
                                                {submitted ? (
                                                    <motion.span
                                                        key="submitted"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        // exist={{ opacity: 0, y: -20 }}
                                                        className='flex item-center'
                                                    >
                                                        Message Sent!
                                                    </motion.span>
                                                    ) : (
                                                    <motion.span
                                                        key="send"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        // exit={{ opacity: 0, y: -20 }}
                                                        className='flex item-center'
                                                    >
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Send Message
                                                    </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </Button>
                                        </motion.div>

                                        <AnimatePresence>
                                            {submitted && (
                                                <motion.p 
                                                    className="text-sm text-center text-green-600 dark:text-green-400"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ type: "spring", stiffness: 200 }}
                                                >
                                                    Thank you for your message! We&apos;ll get back to you soon.
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <AdBanner slot="0987654321" format="rectangle" className="my-4 mx-auto w-full max-w-4xl" />
                        </motion.div> */}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <motion.div
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px rgba(251, 146, 60, 0.1)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                <motion.div 
                                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                                    whileHover={{
                                        rotate: 5,
                                        scale: 1.1
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Mail className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Email Us</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    For general inquiries, feedback, or support questions, send us an email and we&apos;ll respond as soon as
                                    possible.
                                </p>
                                <motion.a 
                                    href="mailto:support@globalracetime.com" 
                                    className="text-primary hover:underline inline-block"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    support@globalracetime.com
                                </motion.a>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px rgba(251, 146, 60, 0.1)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                <motion.div 
                                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                                    whileHover={{
                                        rotate: 5,
                                        scale: 1.1
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Feedback & Suggestions</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We&apos;re always looking to improve Global RaceTime. If you have ideas for new features, leagues to add,
                                    or ways to enhance the user experience, let us know!
                                </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px rgba(251, 146, 60, 0.1)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-6 space-y-4">
                                <h3 className="text-xl font-bold">Response Time</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We typically respond to all inquiries within 24-48 hours. For urgent technical issues, please
                                    include &quot;URGENT&quot; in your subject line.
                                </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>

                {/* FAQ Teaser */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card>
                        <CardContent className="p-8 text-center space-y-4">
                        <h2 className="text-2xl font-bold">Common Questions</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Before reaching out, you might find answers to common questions in our{" "}
                            <motion.a 
                                href="/about" 
                                className="text-primary hover:underline"
                                whileHover={{ scale: 1.05 }}
                            >
                                About page
                            </motion.a>{" "}
                            or{" "}
                            <motion.a 
                                href="/privacy" 
                                className="text-primary hover:underline"
                                whileHover={{ scale: 1.05 }}
                            >
                                Privacy Policy
                            </motion.a>
                            .
                        </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
      </main>

      <Footer />
    </motion.div>
  )
}

export default ContactPage