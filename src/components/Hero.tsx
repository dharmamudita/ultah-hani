"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Heart, Cake, Gift, Sparkles } from "lucide-react";

import dynamic from "next/dynamic";
const BirthdayScene = dynamic(() => import("./3d/TechScene"), { ssr: false });

export default function Hero() {
    return (
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-pink-50 pt-20 pb-10">
            <div className="absolute inset-0 pointer-events-none">
                <BirthdayScene />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-pink-200/15 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-pink-50 to-transparent z-10" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 border border-pink-200 mb-10 backdrop-blur-sm relative z-20"
                >
                    <span className="text-sm font-mono text-pink-600 tracking-wider">02 · 03 · 2006 — turning 20</span>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-4 w-full relative z-20">
                    <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter font-space relative leading-none">
                        <div className="overflow-hidden mb-2">
                            <AnimatedText text="HAPPY" className="text-pink-400" type="chars" animation="bounce" />
                        </div>
                        <div className="overflow-hidden">
                            <AnimatedText
                                text="BIRTHDAY"
                                className="text-pink-600"
                                type="chars"
                                animation="bounce"
                                delay={0.15}
                            />
                        </div>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "backOut" }}
                    className="mb-8 relative z-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <span className="text-2xl">✨</span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-space gradient-text-animated leading-tight" style={{ filter: 'drop-shadow(0 2px 10px rgba(236, 72, 153, 0.3))' }}>
                            Hastin Nurafni
                        </h2>
                        <span className="text-2xl">✨</span>
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="h-[3px] w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full origin-center"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-base md:text-lg text-gray-500 mb-14 max-w-xl mx-auto leading-relaxed z-10 relative"
                >
                    Officially 20. Dua dekade exist di dunia ini dan kamu udah ngelewatin banyak hal keren. Ini baru awal sih sebenernya.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-wrap justify-center gap-3 z-10 relative mb-16"
                >
                    <button
                        onClick={() => document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-[0_0_30px_rgba(244,114,182,0.3)] hover:shadow-[0_0_50px_rgba(244,114,182,0.5)] transition-all"
                    >
                        Lihat Ucapan
                    </button>
                    <button
                        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white/80 hover:bg-white text-pink-600 border border-pink-200 hover:border-pink-300 px-8 py-3.5 rounded-full text-sm backdrop-blur-sm transition-all shadow-sm"
                    >
                        Our Moments
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mx-auto relative z-10"
                >
                    {[
                        { icon: Cake, value: "20th", label: "Years old" },
                        { icon: Heart, value: "3", label: "Bulan kenal" },
                        { icon: Gift, value: "02/03", label: "Tanggal lahir" },
                        { icon: Sparkles, value: "2006", label: "Since" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white/70 border border-pink-100 backdrop-blur-sm rounded-2xl p-5 text-center hover:border-pink-300 transition-all shadow-sm"
                        >
                            <div className="text-pink-500 mb-2 flex justify-center">
                                <stat.icon size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 font-space mb-0.5">{stat.value}</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-mono">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity } }}
                    className="mt-16 text-gray-600 text-xs font-mono relative z-10"
                >
                    scroll ↓
                </motion.div>
            </div>
        </section>
    );
}
