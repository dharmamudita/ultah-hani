"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TARGET: 2 Maret 2026 jam 00:00 WIB (ulang tahun Hastin Nurafni)
const TARGET_DATE = new Date("2026-03-02T00:00:00+07:00");

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function getTimeLeft(): TimeLeft | null {
    const now = new Date();
    const diff = TARGET_DATE.getTime() - now.getTime();

    if (diff <= 0) return null;

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    const display = String(value).padStart(2, "0");

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    className="bg-white/70 border border-pink-100 backdrop-blur-sm rounded-xl md:rounded-3xl w-[60px] h-[76px] md:w-[120px] md:h-[140px] flex items-center justify-center overflow-hidden shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent h-1/2" />
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={value}
                            initial={{ y: 30, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -30, opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="text-2xl md:text-6xl font-black font-space text-gray-800 tabular-nums"
                        >
                            {display}
                        </motion.span>
                    </AnimatePresence>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.04]" />
                </div>
            </div>
            <span className="mt-3 text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.15em] md:tracking-[0.2em] font-mono">{label}</span>
        </div>
    );
}

export default function Countdown({ onComplete }: { onComplete: () => void }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const timer = setInterval(() => {
            const tl = getTimeLeft();
            if (!tl) {
                clearInterval(timer);
                onComplete();
            }
            setTimeLeft(tl);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [onComplete]);



    if (!mounted) {
        return (
            <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!timeLeft) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-pink-50 flex items-center justify-center overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-200/15 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-[150px]" />

                {/* Floating particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-pink-400/30 rounded-full"
                        style={{
                            left: `${10 + (i * 6) % 80}%`,
                            top: `${10 + (i * 7) % 80}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto text-center">
                {/* Top badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-pink-200 mb-8"
                >
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-gray-400 tracking-wider">waiting for the moment</span>
                </motion.div>

                {/* Emoji */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-5xl md:text-7xl mb-6"
                >
                    🎂
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl md:text-4xl font-black font-space text-gray-800 mb-2"
                >
                    Something Special is Coming
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-500 text-sm md:text-base mb-12"
                >
                    Sabar ya, belum waktunya 😉
                </motion.p>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, type: "spring" }}
                    className="flex items-center gap-1.5 md:gap-6 mb-8 md:mb-12"
                >
                    <TimeUnit value={timeLeft.days} label="Hari" />
                    <span className="text-lg md:text-4xl text-pink-400/40 font-thin mt-[-20px] md:mt-[-28px]">:</span>
                    <TimeUnit value={timeLeft.hours} label="Jam" />
                    <span className="text-lg md:text-4xl text-pink-400/40 font-thin mt-[-20px] md:mt-[-28px]">:</span>
                    <TimeUnit value={timeLeft.minutes} label="Menit" />
                    <span className="text-lg md:text-4xl text-pink-400/40 font-thin mt-[-20px] md:mt-[-28px]">:</span>
                    <TimeUnit value={timeLeft.seconds} label="Detik" />
                </motion.div>

                {/* Target date */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
                    <p className="text-gray-600 text-xs font-mono tracking-wider">
                        {TARGET_DATE.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} · {TARGET_DATE.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </p>
                </motion.div>
            </div>


        </motion.div>
    );
}
