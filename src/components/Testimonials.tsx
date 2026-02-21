"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Heart } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import AnimatedText from "./ui/AnimatedText";

const memories = [
    {
        name: "Kenangan Pertama",
        role: "Momen Tak Terlupakan",
        avatar: "💫",
        rating: 5,
        text: "Setiap detik bersamamu adalah kenangan yang tak ternilai harganya. Kamu selalu tahu cara membuat orang tersenyum dan merasa dihargai.",
        gradient: "from-pink-500 to-rose-600",
        month: "Jan"
    },
    {
        name: "Tawa & Canda",
        role: "Kebahagiaan Bersama",
        avatar: "😄",
        rating: 5,
        text: "Tawamu yang renyah selalu berhasil menghangatkan suasana. Tidak ada momen membosankan kalau ada kamu di sekitar!",
        gradient: "from-yellow-500 to-amber-600",
        month: "Mar"
    },
    {
        name: "Dukungan Setia",
        role: "Selalu Ada",
        avatar: "🤗",
        rating: 5,
        text: "Kamu selalu menjadi tempat paling nyaman untuk bercerita. Terima kasih sudah selalu ada dan menjadi support system terbaik.",
        gradient: "from-purple-500 to-violet-600",
        month: "Mei"
    },
    {
        name: "Petualangan Seru",
        role: "Momen Seru",
        avatar: "🌟",
        rating: 5,
        text: "Setiap perjalanan dan petualangan bersamamu selalu jadi cerita yang paling seru untuk diceritakan ulang. Let's make more!",
        gradient: "from-emerald-500 to-teal-600",
        month: "Jul"
    },
    {
        name: "Inspirasi Hidup",
        role: "Panutan Sejati",
        avatar: "✨",
        rating: 5,
        text: "Semangatmu dalam mengejar mimpi selalu menginspirasi. Kamu mengajarkan bahwa tidak ada yang mustahil selama kita berusaha.",
        gradient: "from-orange-500 to-red-600",
        month: "Sep"
    },
    {
        name: "Sahabat Selamanya",
        role: "Best Friend Forever",
        avatar: "💝",
        rating: 5,
        text: "Persahabatan kita adalah salah satu hal paling berharga dalam hidup. Semoga terus sampai tua dan saling dukung selamanya!",
        gradient: "from-pink-500 to-purple-600",
        month: "Des"
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="memories" className="relative py-28 md:py-36 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(192,132,252,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(192,132,252,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
                        <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-mono uppercase tracking-widest">
                            💌 Untaian Cerita
                        </span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
                    </motion.div>

                    <AnimatedText
                        text="CERITA DI BALIK SENYUMMU"
                        className="text-4xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-6"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-lg text-gray-500">
                        Setiap momen bersamamu adalah hadiah terindah. Ini adalah beberapa cerita spesial 🌸
                    </motion.p>
                </div>

                {/* Memories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memories.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <GlowCard className="h-full p-7 md:p-8" glowColor="rgba(244, 114, 182, 0.3)">
                                <div className="relative z-10">
                                    {/* Month badge + Heart */}
                                    <div className="flex justify-between items-start mb-5">
                                        <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/10">
                                            {item.month} 2025
                                        </span>
                                        <Heart className="w-5 h-5 text-pink-500/30 fill-pink-500/20" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: item.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                                        &quot;{item.text}&quot;
                                    </p>

                                    {/* Info */}
                                    <div className="flex items-center gap-4 pt-5 border-t border-pink-100">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                                            {item.avatar}
                                        </div>
                                        <div>
                                            <p className="text-gray-800 font-bold font-space">{item.name}</p>
                                            <p className="text-gray-500 text-sm">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                {/* Birthday Counter Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-yellow-500/5 border border-pink-500/10 backdrop-blur-sm"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "∞", label: "Cinta & Sayang", emoji: "💖" },
                            { value: "365+", label: "Hari Bersama", emoji: "📅" },
                            { value: "💯", label: "Kebahagiaan", emoji: "😊" },
                            { value: "∞", label: "Doa Terbaik", emoji: "🤲" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * idx }}
                                viewport={{ once: true }}
                            >
                                <div className="text-3xl mb-2">{stat.emoji}</div>
                                <p className="text-3xl md:text-4xl font-black font-space gradient-text mb-2">{stat.value}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
