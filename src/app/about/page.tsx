import Footer from '@/components/landing-page/footer'
import Header from '@/components/landing-page/header'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Globe, Users, Zap } from 'lucide-react'
import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16 max-w-4xl mt-24">
            <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-balance text-white">About Global RaceTime</h1>
                <p className="text-xl text-muted-foreground text-balance">
                Your ultimate destination for live football scores and fixtures from around the world
                </p>
            </div>

            {/* Mission */}
            <Card>
                <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Live Now was created to solve a simple problem: keeping track of football matches across
                    different time zones and leagues. Whether you&apos;re following the Premier League from Asia, La Liga from
                    North America, or the Champions League from anywhere in the world, we make it easy to never miss a
                    match.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    We believe that football is a global sport that brings people together, and everyone should have easy
                    access to live scores, fixtures, and match information in their local time zone.
                </p>
                </CardContent>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Global Coverage</h3>
                    <p className="text-muted-foreground leading-relaxed">
                    Track matches from Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa
                    League, and more.
                    </p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Local Time Conversion</h3>
                    <p className="text-muted-foreground leading-relaxed">
                    All match times are automatically converted to your local timezone, so you never have to do the math.
                    </p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Live Updates</h3>
                    <p className="text-muted-foreground leading-relaxed">
                    Get real-time score updates for live matches with minute-by-minute coverage of all the action.
                    </p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Free for Everyone</h3>
                    <p className="text-muted-foreground leading-relaxed">
                    Live Now is completely free to use. We&apos;re supported by non-intrusive ads and generous donations
                    from our community.
                    </p>
                </CardContent>
                </Card>
            </div>

            {/* Technology */}
            <Card>
                <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-bold">Built with Modern Technology</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Live Now is built using cutting-edge web technologies including Next.js, React, and Tailwind CSS.
                    We integrate with reliable football data APIs to provide accurate, real-time information about matches,
                    scores, and fixtures.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Our platform is designed to be fast, responsive, and accessible on all devices, from desktop computers
                    to mobile phones.
                </p>
                </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 space-y-4 text-center">
                <h2 className="text-2xl font-bold">Support Our Work</h2>
                <p className="text-muted-foreground leading-relaxed">
                    If you find Live Now useful, please consider supporting us through a donation. Your support helps
                    us maintain the service, cover API costs, and continue improving the platform for football fans
                    worldwide.
                </p>
                </CardContent>
            </Card>
            </div>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage