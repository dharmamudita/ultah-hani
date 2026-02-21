"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-pink-50 pt-24 pb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/15 to-transparent" />
            <div className="absolute -top-60 right-0 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-60 left-0 w-[400px] h-[400px] bg-pink-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-6xl mb-8"
                    >🎂</motion.div>

                    <h2 className="text-3xl md:text-5xl font-black font-space gradient-text-animated mb-6 leading-tight">
                        Welcome to 20, Hanii
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                        Dua dekade udah kamu lewatin dan honestly? Kamu ngelakuin semuanya dengan baik.
                        Nggak perlu jadi perfect, kamu udah lebih dari cukup. Tahun ini, have fun,
                        chase your dreams, dan jangan lupa — aku selalu ada.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {["🎂", "🎉", "🎈", "🎁", "✨", "🌸", "🎊", "🥳"].map((emoji, idx) => (
                            <motion.span
                                key={idx}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.2, ease: "easeInOut" }}
                                className="text-2xl md:text-3xl"
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto">
                    {[
                        { title: "Keep glowing", desc: "Kamu udah shine dari dulu. Di umur 20, please terus jadi version terbaik dari diri kamu sendiri." },
                        { title: "Stay strong", desc: "Apapun yang bakal kamu hadapin tahun ini, kamu pasti bisa. Dan kalo capek, it's okay to rest." },
                        { title: "Be unapologetically you", desc: "Kamu itu udah bagus jadi diri kamu sendiri. No need to be someone else. Ever." },
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/70 border border-pink-100 rounded-2xl p-6 text-center hover:border-pink-300 transition-all shadow-sm"
                        >
                            <h3 className="text-base font-bold text-gray-800 mb-2 font-space">{card.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="pt-8 border-t border-pink-200 flex flex-col items-center gap-3 text-sm">
                    <p className="flex items-center gap-2 text-gray-500">
                        Made with <Heart size={13} className="text-pink-500 fill-pink-500 animate-pulse" /> for <span className="text-pink-500">Hastin Nurafni</span>
                    </p>
                    <p className="text-gray-400 text-xs font-mono">02.03.2006 — turning 20</p>
                </div>
            </div>
        </footer>
    );
}
