"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Camera, Heart, MapPin } from "lucide-react";

const photos = [
    { id: 1, title: "First Meet", date: "Des 2025", location: "Somewhere", gradient: "from-pink-500 via-rose-500 to-pink-400", emoji: "👋", caption: "Awal dari semuanya" },
    { id: 2, title: "Ngobrol Pertama", date: "Des 2025", location: "Chat", gradient: "from-rose-500 via-pink-500 to-rose-400", emoji: "💬", caption: "Chat yang nggak berenti" },
    { id: 3, title: "Nongkrong Bareng", date: "Des 2025", location: "Cafe", gradient: "from-pink-600 via-rose-500 to-fuchsia-500", emoji: "☕", caption: "Quality time pertama" },
    { id: 4, title: "Year End Vibes", date: "Des 2025", location: "Kota", gradient: "from-rose-600 via-pink-500 to-rose-400", emoji: "🌙", caption: "Nutup tahun bareng" },
    { id: 5, title: "New Year!", date: "Jan 2026", location: "Rooftop", gradient: "from-pink-400 via-rose-500 to-pink-600", emoji: "🎆", caption: "Tahun baru, cerita baru" },
    { id: 6, title: "Jalan Sore", date: "Jan 2026", location: "Taman", gradient: "from-fuchsia-400 via-pink-500 to-rose-500", emoji: "🌸", caption: "Healing session" },
    { id: 7, title: "Foto Bareng", date: "Jan 2026", location: "Mall", gradient: "from-pink-500 via-fuchsia-500 to-rose-500", emoji: "📸", caption: "10 foto, 1 yang oke" },
    { id: 8, title: "Movie Date", date: "Feb 2026", location: "Cinema", gradient: "from-rose-400 via-pink-600 to-fuchsia-400", emoji: "🎬", caption: "Nonton bareng seru" },
    { id: 9, title: "Pre-Birthday", date: "Feb 2026", location: "Resto", gradient: "from-pink-500 via-rose-500 to-pink-600", emoji: "🎂", caption: "Countdown to 20" },
];

const scrollPhotos = [
    { gradient: "from-pink-500 to-rose-500", emoji: "💝" },
    { gradient: "from-rose-400 to-pink-500", emoji: "🌟" },
    { gradient: "from-pink-400 to-rose-500", emoji: "💕" },
    { gradient: "from-rose-500 to-pink-600", emoji: "🌸" },
    { gradient: "from-pink-500 to-fuchsia-500", emoji: "🔥" },
    { gradient: "from-fuchsia-400 to-pink-500", emoji: "💎" },
    { gradient: "from-rose-400 to-fuchsia-400", emoji: "🌷" },
    { gradient: "from-pink-600 to-rose-500", emoji: "⭐" },
];

export default function PhotoGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="gallery" className="relative py-24 md:py-32 bg-gradient-to-b from-white via-pink-50 to-pink-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="relative mb-16 overflow-hidden">
                <div className="flex gap-4 gallery-scroll" style={{ width: "fit-content" }}>
                    {[...scrollPhotos, ...scrollPhotos].map((photo, idx) => (
                        <div
                            key={idx}
                            className={`w-[180px] h-[120px] md:w-[260px] md:h-[160px] rounded-2xl bg-gradient-to-br ${photo.gradient} flex items-center justify-center text-4xl md:text-5xl shadow-lg shadow-black/20 flex-shrink-0 hover:scale-105 transition-transform duration-300`}
                        >
                            {photo.emoji}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                            <Camera size={12} className="text-pink-400/60" /> Our moments
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500/30" />
                    </motion.div>

                    <AnimatedText
                        text="MOMEN KITA BERDUA"
                        className="text-3xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-5"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-base text-gray-500">
                        Setiap momen bareng kamu selalu jadi cerita yang seru 💕
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {photos.map((photo, idx) => {
                        const isLarge = idx === 0 || idx === 4;
                        return (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className={`group relative photo-card ${isLarge ? 'col-span-2 row-span-2' : ''}`}
                            >
                                <div className={`relative w-full ${isLarge ? 'h-[280px] md:h-[400px]' : 'h-[160px] md:h-[200px]'} rounded-2xl bg-gradient-to-br ${photo.gradient} overflow-hidden`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`${isLarge ? 'text-6xl md:text-7xl' : 'text-3xl md:text-4xl'} group-hover:scale-110 transition-transform duration-300`}>
                                            {photo.emoji}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                                        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                            <h4 className="text-white font-bold font-space text-sm mb-0.5">{photo.title}</h4>
                                            <p className="text-white/80 text-xs mb-1.5">{photo.caption}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 text-[10px] text-pink-300/70">
                                                    <MapPin size={9} /> {photo.location}
                                                </span>
                                                <span className="text-[10px] text-yellow-300/70">{photo.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <Heart size={12} className="text-pink-400" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center text-gray-600 text-xs font-mono"
                >
                    placeholder dulu ya, ntar ganti pake foto asli kita
                </motion.p>
            </div>
        </section>
    );
}
