"use client"
import { Menu, Tally5, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';
import candy from '../../../public/candy-1.jpg';

interface navLinks {
    name: string;
    href: string;
}

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fixtures", href: "/" },
    // { name: "Coming Soon", href: "/coming-soon" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    // { name: "Privacy Policy", href: "/" },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }
  return (
    <>
        <Snowfall color="white" snowflakeCount={50}/>
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='w-full border-b border-[var(--background)] fixed top-0 left-0 z-50 backdrop-blur-md bg-[var(--background)]/80'
        >
            <Snowfall color="white" snowflakeCount={100}/>
            <div className='flex items-center justify-between p-4 md:p-5'>
                {/* Logo Section */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className='flex gap-2 items-center'>
                            <Tally5 className="text-orange-400 w-5 h-5 md:w-6 md:h-6 animate-bounce" />
                            <Link href="/" onClick={closeMobileMenu}>
                                <h1 className='text-[20px] md:text-[24px] text-white font-extrabold'>
                                    <span className='hidden md:inline'>LIVE NOW</span>
                                    <span className='sm:hidden'>LIVE NOW</span>
                                </h1>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:block'>
                        <ul className='flex gap-6 md:gap-10'>
                            {navLinks.map((link: navLinks, index: number) => (
                                <motion.li 
                                    key={index} 
                                    whileHover={{ scale: 1.25 }} 
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        className='text-white text-[14px] hover:text-orange-400 transition-colors duration-200 relative'
                                    >
                                        {link.name}
                                        <motion.div
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400"
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className='hidden md:block'>
                        <motion.div 
                            initial={{ scale: 0, opacity: 0}} 
                            animate={{ scale: 1, opacity: 1 }} 
                            transition={{ type: 'spring', stiffness: 200 }} 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className='bg-primary text-black text-[13px] md:text-[14px] cursor-pointer px-4 md:px-6'>
                                Get Started
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <motion.button
                            onClick={toggleMobileMenu}
                            className='text-white p-2 cursor-pointer'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X className='w-6 h-6' />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                >
                                    <Menu className='w-6 h-6' />
                                </motion.div>
                            )}
                        </motion.button>
                    </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <>
                    {/* Moblie menu background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden z-[60]'
                        onClick={closeMobileMenu}
                    >
                        <Snowfall color="white" snowflakeCount={50}/>
                        {/* Mobile Menu Panel */}
                            <motion.div
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 30,
                                    opacity: { duration: 0.2 }
                                }}
                                className="fixed right-0 top-0 h-full w-80 max-w-[95vw] bg-[var(--background)] border-gray-700 lg:hidden z-[70]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Mobile Menu Header */}
                                    <div className="flex items-center justify-between p-4 border-gray-700">
                                        <div className='flex gap-2 items-center'>
                                            <Tally5 className="text-orange-400 w-5 h-5 animate-bounce" />
                                            <h2 className='text-[18px] text-white font-extrabold'>LIVE NOW</h2>
                                        </div>
                                        <motion.button
                                            onClick={closeMobileMenu}
                                            className='text-white p-1'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <X className="w-5 h-5" />
                                        </motion.button>
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <div className="flex-1 px-4 py-6 bg-[var(--background)] backdrop-blur-sm z-50">
                                        <ul className='space-y-6'>
                                            {navLinks.map((link: navLinks, index: number) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ x: 50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ 
                                                        delay: index * 0.1,
                                                        type: "spring",
                                                        stiffness: 300
                                                    }}
                                                    whileHover={{ x: 10 }}
                                                >
                                                    <Link 
                                                        href={link.href} 
                                                        onClick={closeMobileMenu}
                                                        className='text-white text-[16px] hover:text-orange-400 transition-colors duration-200 block py-2 border-gray-700/50'
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Mobile CTA Button */}
                                    <div className="p-4 border-gray-700 bg-[var(--background)] backdrop-blur-sm z-50">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button 
                                                className='bg-primary text-black text-[14px] cursor-pointer w-full py-3'
                                                onClick={closeMobileMenu}
                                            >
                                                Get Started
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                    </motion.div>
                </>
            )}
        </motion.nav>
    </>
  )
}

export default Header