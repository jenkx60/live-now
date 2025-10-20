import { Tally5 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

interface navLinks {
    name: string;
    href: string;
}

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fixtures", href: "/fixtures" },
    // { name: "Coming Soon", href: "/coming-soon" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <nav className='w-full border-b border-[var(--background)] fixed top-0 left-0 z-50 backdrop-blur-md bg-[var(--background)]/80'>
        <div className='flex items-center justify-between p-5'>
            <div>
                <div className='flex gap-2 items-center'>
                    <Tally5 className="text-orange-400 w-5 h-5 animate-bounce" />
                    <Link href="/">
                        <h1 className='text-[24px] text-white font-extrabold'>LIVE NOW</h1>
                    </Link>
                </div>
            </div>
            <div>
                <ul className='flex gap-5'>
                    {navLinks.map((link: navLinks, index: number) => (
                        <div key={index}>
                            <Link href={link.href} className='text-white text-[14px] hover:text-orange-400'>
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
            <div>
                <div>
                    <Button className='bg-primary text-black text-[14px]'>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header