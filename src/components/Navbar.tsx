"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "HOME", href: "#" },
    { name: "WISHES", href: "#wishes" },
    { name: "GALLERY", href: "#gallery" },
    { name: "ABOUT YOU", href: "#aboutyou" },
    { name: "MESSAGES", href: "#messages" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-b border-pink-200 shadow-lg shadow-pink-100/50"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center group z-50 relative">
                        <span className="text-xl md:text-2xl font-black tracking-tighter font-space text-pink-500 group-hover:text-pink-600 transition-colors">
                            HANII
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-[11px] font-mono tracking-[0.2em] text-gray-500 hover:text-pink-500 transition-colors relative group py-1"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-pink-500 to-rose-400 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                    >
                        <motion.span animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-pink-500 origin-center" />
                        <motion.span animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-pink-500" />
                        <motion.span animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-pink-500 origin-center" />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-3xl font-black font-space text-gray-800 hover:text-pink-500 transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
