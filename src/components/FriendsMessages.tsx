"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { MessageCircle, Sparkles } from "lucide-react";

export default function FriendsMessages() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="messages" className="relative py-20 md:py-36 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
                <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 -left-40 w-[400px] h-[400px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                            <MessageCircle size={12} className="text-purple-400/60" /> Birthday messages
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/30" />
                    </motion.div>

                    <AnimatedText
                        text="DARI ORANG-ORANG TERSAYANG"
                        className="text-2xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-5"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-sm md:text-base text-gray-500">
                        Bukan cuma aku, temen-temen kamu juga mau ngucapin 💝
                    </motion.p>
                </div>

                {/* Messages Layout: Side - Featured - Side */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">

                    {/* Left - May */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="w-full flex items-center"
                    >
                        <div className="w-full h-full relative group">
                            {/* Glassmorphism card */}
                            <div className="relative h-full bg-white/60 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-5 md:p-6 shadow-[0_8px_32px_rgba(236,72,153,0.08)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.15)] transition-all duration-300 hover:-translate-y-1">
                                {/* Decorative corner dots */}
                                <div className="absolute top-3 right-3 flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-200" />
                                </div>

                                <div className="flex items-center gap-2.5 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-sm shadow-md">
                                        🌟
                                    </div>
                                    <span className="text-gray-800 font-bold font-space text-sm">May</span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    &quot;happy birthday hanskuy😝&quot;
                                </p>

                                <div className="mt-4 pt-3 border-t border-pink-100/50 flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400 font-mono">sent with love</span>
                                    <span className="text-pink-400 text-xs">♥</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center - Suci (Featured) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
                        className="w-full"
                    >
                        <div className="relative group h-full">
                            {/* Gradient border glow */}
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500 rounded-3xl opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500 rounded-3xl" />

                            {/* Card content */}
                            <div className="relative bg-white rounded-3xl p-6 md:p-8 h-full">
                                {/* Featured badge */}
                                <div className="flex items-center justify-center mb-5">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/60 rounded-full">
                                        <Sparkles size={10} className="text-pink-500" />
                                        <span className="text-[10px] text-pink-500 font-mono uppercase tracking-wider">Best Friend</span>
                                        <Sparkles size={10} className="text-pink-500" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-500 flex items-center justify-center text-xl shadow-lg shadow-pink-300/30">
                                        💕
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-bold font-space text-base">Suci</p>
                                        <p className="text-gray-400 text-[10px] font-mono">best friend forever</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-xs md:text-sm leading-relaxed italic">
                                    &quot;happy birthday my besttttt friendddd 🎂 semoga hari-hari mu selalu dipenuhi kebaikan dan keindahan, semoga semesta berpihak padamu, dan setiap langkahmu di mudahkan menuju masa depan yang cerah. teruslah berkembang, teruslah melangkah, dan temukan kebahagiaanmu. jangan lupa untuk menjaga kesehatanmu. untuk segala yang dibalas dan tak terbalas, semoga yang baik kembali kepadamu, dan yang buruk tersimpan diruang hati yang paling ikhlas.&quot;
                                </p>

                                <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-400 font-mono">sent with all the love in the world</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="text-pink-500">♥</span>
                                        <span className="text-rose-500">♥</span>
                                        <span className="text-fuchsia-500">♥</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Rora */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full flex items-center"
                    >
                        <div className="w-full h-full relative group">
                            {/* Dashed border card */}
                            <div className="relative h-full bg-white/60 backdrop-blur-xl border-2 border-dashed border-rose-300/60 rounded-2xl p-5 md:p-6 hover:border-rose-400 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-200/20">
                                {/* Decorative corner dots */}
                                <div className="absolute top-3 right-3 flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-200" />
                                </div>

                                <div className="flex items-center gap-2.5 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-sm shadow-md">
                                        🫰🏻
                                    </div>
                                    <span className="text-gray-800 font-bold font-space text-sm">Rora</span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    &quot;hbd hanieek, rora bantu amin paling kenceng, love SE laut samudra Hindia Antartika, 🫰🏻&quot;
                                </p>

                                <div className="mt-4 pt-3 border-t border-rose-100/50 flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400 font-mono">sent with love</span>
                                    <span className="text-rose-400 text-xs">♥</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
