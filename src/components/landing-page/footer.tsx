import React from 'react'
import { AdBanner } from './ad-banner'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Coffee, Tally5 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='border-t'>
        {/* <div>
            <AdBanner slot="1234567890" format="horizontal" className="my-4 mx-auto w-full max-w-4xl" />
        </div> */}

        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className='flex items-center gap-2'>
                        <Tally5 className="text-orange-400 w-5 h-5 animate-bounce" />
                        <h3 className="text-lg font-bold text-white">LIVE NOW</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    Live football scores from around the world, in your local time.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white">Leagues</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/#live-scores" className="hover:text-foreground transition-colors">
                                Premier League
                            </Link>
                        </li>
                        <li>
                            <Link href="/#live-scores" className="hover:text-foreground transition-colors">
                            La Liga
                            </Link>
                        </li>
                        <li>
                            <Link href="/#live-scores" className="hover:text-foreground transition-colors">
                            Serie A
                            </Link>
                        </li>
                        <li>
                            <Link href="/#live-scores" className="hover:text-foreground transition-colors">
                            Bundesliga
                            </Link>
                        </li>
                        <li>
                            <Link href="/#live-scores" className="hover:text-foreground transition-colors">
                            Champions League
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                        <Link href="/about" className="hover:text-foreground transition-colors">
                        About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-foreground transition-colors">
                        Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                        Privacy Policy
                        </Link>
                    </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white">Support Us</h4>
                    <p className="text-sm text-muted-foreground">Help keep Global RaceTime free for everyone</p>
                    <Button className="w-full" variant="default" asChild>
                    <a href="https://www.buymeacoffee.com/globalracetime" target="_blank" rel="noopener noreferrer">
                        <Coffee className="mr-2 h-4 w-4" />
                        Buy Me a Coffee
                    </a>
                    </Button>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Global RaceTime. All rights reserved.</p>
            </div>
      </div>
    </footer>
  )
}

export default Footer