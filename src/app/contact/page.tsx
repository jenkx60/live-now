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
  return (
    <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16 max-w-4xl mt-24">
            <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-balance text-white">Get in Touch</h1>
                <p className="text-xl text-muted-foreground text-balance">
                Have questions, feedback, or suggestions? We&apos;d love to hear from you.
                </p>
            </div>

            <AdBanner slot="0987654321" format="horizontal" className="my-4 mx-auto w-full max-w-4xl" />
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Contact Form */}
                    <Card className='h-fit'>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                                required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
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
                            </div>

                            <Button type="submit" className="w-full" disabled={submitted}>
                                {submitted ? (
                                <>Message Sent!</>
                                ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                                )}
                            </Button>

                            {submitted && (
                                <p className="text-sm text-center text-green-600 dark:text-green-400">
                                Thank you for your message! We&apos;ll get back to you soon.
                                </p>
                            )}
                            </form>
                        </CardContent>
                    </Card>

                    <AdBanner slot="0987654321" format="vertical" className="my-4 mx-auto w-full max-w-4xl" />
                    
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Email Us</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            For general inquiries, feedback, or support questions, send us an email and we&apos;ll respond as soon as
                            possible.
                        </p>
                        <a href="mailto:support@globalracetime.com" className="text-primary hover:underline inline-block">
                            support@globalracetime.com
                        </a>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Feedback & Suggestions</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We&apos;re always looking to improve Global RaceTime. If you have ideas for new features, leagues to add,
                            or ways to enhance the user experience, let us know!
                        </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">Response Time</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We typically respond to all inquiries within 24-48 hours. For urgent technical issues, please
                            include &quot;URGENT&quot; in your subject line.
                        </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* FAQ Teaser */}
            <Card>
                <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold">Common Questions</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Before reaching out, you might find answers to common questions in our{" "}
                    <a href="/about" className="text-primary hover:underline">
                    About page
                    </a>{" "}
                    or{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                    </a>
                    .
                </p>
                </CardContent>
            </Card>
            </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage