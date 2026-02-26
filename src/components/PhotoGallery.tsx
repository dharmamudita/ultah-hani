"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Camera, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const photos = [
    { id: 1, src: "/foto/1.jpeg", title: "Buket Hani", caption: "Kalau bunga bisa diganti sama kamu 💐" },
    { id: 4, src: "/foto/4.jpeg", title: "Cantik Banget", caption: "Nggak pernah bosen liatin kamu 💕" },
    { id: 9, src: "/foto/9.jpeg", title: "Night Out", caption: "Pose love bikin meleleh 💗" },
    { id: 3, src: "/foto/3.jpeg", title: "Mirror Selfie", caption: "Momen bareng yang bikin kangen" },
    { id: 6, src: "/foto/6.jpeg", title: "Cafe Date", caption: "Healing terbaik ☕" },
    { id: 14, src: "/foto/14.jpeg", title: "Peace! ✌️", caption: "Selalu ceria dan semangat" },
    { id: 8, src: "/foto/8.jpeg", title: "Di Kampus", caption: "Paling cantik seangkatan 📚" },
    { id: 5, src: "/foto/5.jpeg", title: "4 Ekspresi", caption: "Setiap ekspresi lucu semua" },
    { id: 13, src: "/foto/13.jpeg", title: "Pink Day", caption: "Pink cocok banget sama kamu 🩷" },
    { id: 10, src: "/foto/10.jpeg", title: "Senyum Manis", caption: "Bikin hari jadi lebih baik" },
    { id: 15, src: "/foto/15.jpeg", title: "Aesthetic", caption: "Cantik bareng bunga 🌸" },
    { id: 7, src: "/foto/7.jpeg", title: "Nature Vibes", caption: "Natural banget 🌿" },
    { id: 12, src: "/foto/12.jpeg", title: "Hangout Vibes", caption: "Senyumnya contagious 😊" },
    { id: 17, src: "/foto/17.jpeg", title: "Shopping!", caption: "Mall date kapan lagi? 🛍️" },
    { id: 11, src: "/foto/11.jpeg", title: "Di Kelas", caption: "Tetep cantik di mana aja" },
    { id: 16, src: "/foto/16.jpeg", title: "School Day", caption: "Paling rajin di kelas" },
];

const filmPhotos = [
    "/foto/14.jpeg", "/foto/9.jpeg", "/foto/13.jpeg", "/foto/6.jpeg",
    "/foto/4.jpeg", "/foto/8.jpeg", "/foto/15.jpeg", "/foto/17.jpeg",
];

// Slight random-ish rotations for polaroid effect
const rotations = [-2, 1.5, -1, 2, -1.5, 0.5, -2.5, 1, -0.5, 2, -1, 1.5, -2, 0.5, 1, -1.5];

export default function PhotoGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    const selectedIdx = selectedPhoto !== null ? photos.findIndex(p => p.id === selectedPhoto) : -1;
    const goNext = () => { if (selectedIdx < photos.length - 1) setSelectedPhoto(photos[selectedIdx + 1].id); };
    const goPrev = () => { if (selectedIdx > 0) setSelectedPhoto(photos[selectedIdx - 1].id); };

    return (
        <section id="gallery" className="relative py-16 md:py-32 bg-gradient-to-b from-white via-pink-50/50 to-pink-50 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 text-6xl opacity-5 rotate-12">📸</div>
                <div className="absolute top-1/3 right-20 text-5xl opacity-5 -rotate-6">🌸</div>
                <div className="absolute bottom-40 left-1/4 text-4xl opacity-5 rotate-3">💕</div>
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-rose-500/[0.04] rounded-full blur-[100px]" />
            </div>

            {/* Film strip scroll */}
            <div className="relative mb-12 md:mb-20 overflow-hidden">
                <div className="flex gap-3 md:gap-4 gallery-scroll" style={{ width: "fit-content" }}>
                    {[...filmPhotos, ...filmPhotos].map((src, idx) => (
                        <div key={idx} className="w-[140px] h-[100px] md:w-[260px] md:h-[160px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-lg shadow-pink-200/30">
                            <Image src={src} alt={`Film ${idx}`} width={260} height={160} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                            <Camera size={12} className="text-pink-400/60" /> Our moments
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500/30" />
                    </motion.div>

                    <AnimatedText
                        text="MEMORIES"
                        className="text-3xl md:text-6xl lg:text-7xl font-black font-space tracking-tighter text-gray-800 mb-5"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
                        Setiap momen bareng kamu selalu jadi cerita yang seru 💕
                    </motion.p>
                </div>

                {/* Polaroid Masonry Gallery */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 40, rotate: rotations[idx] * 2 }}
                            animate={isInView ? { opacity: 1, y: 0, rotate: rotations[idx] } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.05, type: "spring", stiffness: 100 }}
                            whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
                            className="break-inside-avoid mb-4 md:mb-5 cursor-pointer group"
                            onClick={() => setSelectedPhoto(photo.id)}
                        >
                            {/* Polaroid frame */}
                            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(236,72,153,0.15)] transition-shadow duration-300">
                                {/* Photo */}
                                <div className="relative overflow-hidden rounded-md md:rounded-lg">
                                    <Image
                                        src={photo.src}
                                        alt={photo.title}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />

                                    {/* Hover shine */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                    {/* Heart */}
                                    <motion.div
                                        className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <Heart size={12} className="text-pink-500" fill="currentColor" />
                                    </motion.div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-14 text-center text-gray-400 text-xs font-mono"
                >
                    📸 tap foto untuk lihat lebih besar
                </motion.p>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto !== null && selectedIdx !== -1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10002] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30">
                            <X size={20} />
                        </button>

                        {selectedIdx > 0 && (
                            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30">
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        {selectedIdx < photos.length - 1 && (
                            <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30">
                                <ChevronRight size={20} />
                            </button>
                        )}

                        <motion.div
                            key={photos[selectedIdx].id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative bg-white rounded-2xl p-3 md:p-4 shadow-2xl max-w-[92vw] md:max-w-[600px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={photos[selectedIdx].src}
                                alt={photos[selectedIdx].title}
                                width={800}
                                height={1000}
                                className="w-full h-auto rounded-xl max-h-[65vh] object-contain"
                            />
                            <div className="pt-2 pb-1 text-center">
                                <p className="text-gray-300 text-[10px] font-mono">{selectedIdx + 1} / {photos.length}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
