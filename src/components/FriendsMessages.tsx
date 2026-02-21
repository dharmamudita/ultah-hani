"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import GlowCard from "./ui/GlowCard";
import { MessageCircle } from "lucide-react";

const messages = [
    {
        name: "Rina",
        avatar: "🦋",
        color: "from-pink-500 to-rose-500",
        message: "Happy birthday Hanii! Semoga makin kece, makin sukses, dan makin happy ya. You deserve all the good things!",
    },
    {
        name: "Dinda",
        avatar: "🌸",
        color: "from-rose-400 to-pink-500",
        message: "Hbd bestie!! 20 years of being amazing. Semoga tahun ini lebih banyak cerita serunya. Love youu!",
    },
    {
        name: "Ayu",
        avatar: "✨",
        color: "from-pink-400 to-rose-500",
        message: "Selamat ulang tahun Hani!! Jangan lupa bahagia terus ya. Kalo butuh apa-apa, kabarin aja. We got you!",
    },
    {
        name: "Fira",
        avatar: "🌙",
        color: "from-rose-500 to-pink-600",
        message: "HBD Han! Gila udah 20 aja. Semoga apa yang kamu impiin bisa terwujud semua. Stay real, stay you.",
    },
    {
        name: "Nisa",
        avatar: "🔥",
        color: "from-pink-500 to-fuchsia-500",
        message: "Yooo happy birthday Hani! Tahun ini kita harus hangout lebih sering ya. Wish you nothing but the best!",
    },
    {
        name: "Sela",
        avatar: "💜",
        color: "from-fuchsia-400 to-pink-500",
        message: "Happy bday sayang! Makasih udah jadi temen yang selalu supportive. Semoga 20nya amazing kayak kamu.",
    },
];

export default function FriendsMessages() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="messages" className="relative py-28 md:py-36 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
                <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 -left-40 w-[400px] h-[400px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                            <MessageCircle size={12} className="text-purple-400/60" /> Birthday messages
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/30" />
                    </motion.div>

                    <AnimatedText
                        text="DARI ORANG-ORANG TERSAYANG"
                        className="text-3xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-5"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-base text-gray-500">
                        Bukan cuma aku, temen-temen kamu juga mau ngucapin
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={msg.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <GlowCard className="h-full p-6" glowColor="rgba(192, 132, 252, 0.2)">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-lg shadow-lg`}>
                                            {msg.avatar}
                                        </div>
                                        <div>
                                            <p className="text-gray-800 font-bold font-space text-sm">{msg.name}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                        &quot;{msg.message}&quot;
                                    </p>

                                    <div className="mt-4 pt-3 border-t border-pink-100 flex items-center gap-2">
                                        <span className="text-[10px] text-gray-400 font-mono">sent with love</span>
                                        <span className="text-pink-500 text-xs">♥</span>
                                    </div>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center text-gray-600 text-xs font-mono"
                >
                    ganti nama & pesan di atas sesuai temen-temen Hani yang beneran ya
                </motion.p>
            </div>
        </section>
    );
}
