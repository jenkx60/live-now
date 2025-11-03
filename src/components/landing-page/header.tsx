"use client"
import { Tally5 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

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
    { name: "Privacy Policy", href: "/privacy" },
];

const Header = () => {
  return (
    <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='w-full border-b border-[var(--background)] fixed top-0 left-0 z-50 backdrop-blur-md bg-[var(--background)]/80'
    >
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
                    <ul className='flex gap-10'>
                        {navLinks.map((link: navLinks, index: number) => (
                            <motion.div key={index} whileHover={{ scale: 1.25 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Link href={link.href} className='text-white text-[14px] hover:text-orange-400'>
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </ul>
                </div>
                <div>
                    <motion.div initial={{ scale: 0, opacity: 0}} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button className='bg-primary text-black text-[14px] cursor-pointer'>
                            Get Started
                        </Button>
                    </motion.div>
                </div>
        </div>
    </motion.nav>
  )
}

export default Header