"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Camera, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Cache buster — update angka ini kalau ganti foto
const V = "?v=2";

const photos = [
    { id: 1, src: `/foto/1.jpeg${V}`, title: "Buket Hani", caption: "Kalau bunga bisa diganti sama kamu, pasti lebih cantik 💐", size: "large" },
    { id: 4, src: `/foto/4.jpeg${V}`, title: "Cantik Banget", caption: "Nggak pernah bosen liatin kamu 💕", size: "medium" },
    { id: 9, src: `/foto/9.jpeg${V}`, title: "Night Out", caption: "Pose love selalu bikin meleleh 💗", size: "medium" },
    { id: 3, src: `/foto/3.jpeg${V}`, title: "Mirror Selfie", caption: "Momen bareng yang selalu bikin kangen", size: "tall" },
    { id: 6, src: `/foto/6.jpeg${V}`, title: "Cafe Date", caption: "Ngopi bareng kamu itu healing terbaik ☕", size: "medium" },
    { id: 14, src: `/foto/14.jpeg${V}`, title: "Peace! ✌️", caption: "Selalu ceria dan bikin semangat", size: "wide" },
    { id: 8, src: `/foto/8.jpeg${V}`, title: "Di Kampus", caption: "Mahasiswi paling cantik seangkatan 📚", size: "medium" },
    { id: 5, src: `/foto/5.jpeg${V}`, title: "4 Ekspresi", caption: "Setiap ekspresi kamu tuh lucu semua", size: "large" },
    { id: 13, src: `/foto/13.jpeg${V}`, title: "Pink Day", caption: "Warna pink emang cocok banget sama kamu 🩷", size: "medium" },
    { id: 10, src: `/foto/10.jpeg${V}`, title: "Senyum Manis", caption: "Senyum yang bikin hari jadi lebih baik", size: "tall" },
    { id: 15, src: `/foto/15.jpeg${V}`, title: "Aesthetic", caption: "Cantik bareng bunga-bunga 🌸", size: "medium" },
    { id: 7, src: `/foto/7.jpeg${V}`, title: "Nature Vibes", caption: "Cantiknya natural banget 🌿", size: "medium" },
    { id: 12, src: `/foto/12.jpeg${V}`, title: "Hangout Vibes", caption: "Senyum kamu itu contagious banget 😊", size: "wide" },
    { id: 17, src: `/foto/17.jpeg${V}`, title: "Shopping!", caption: "Mall date kapan lagi? 🛍️", size: "medium" },
    { id: 11, src: `/foto/11.jpeg${V}`, title: "Selfie di Kelas", caption: "Di kelas aja tetep cantik", size: "medium" },
    { id: 16, src: `/foto/16.jpeg${V}`, title: "School Day", caption: "Paling rajin dan paling cantik di kelas", size: "tall" },
];

// Featured photos for the filmstrip
const filmPhotos = [
    `/foto/14.jpeg${V}`, `/foto/9.jpeg${V}`, `/foto/13.jpeg${V}`, `/foto/6.jpeg${V}`,
    `/foto/4.jpeg${V}`, `/foto/8.jpeg${V}`, `/foto/15.jpeg${V}`, `/foto/17.jpeg${V}`,
];

export default function PhotoGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    const selectedIdx = selectedPhoto !== null ? photos.findIndex(p => p.id === selectedPhoto) : -1;

    const goNext = () => {
        if (selectedIdx < photos.length - 1) setSelectedPhoto(photos[selectedIdx + 1].id);
    };
    const goPrev = () => {
        if (selectedIdx > 0) setSelectedPhoto(photos[selectedIdx - 1].id);
    };

    return (
        <section id="gallery" className="relative py-16 md:py-32 bg-gradient-to-b from-white via-pink-50/50 to-pink-50 overflow-hidden">
            {/* Background blurs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-rose-500/[0.04] rounded-full blur-[100px]" />
            </div>

            {/* Film strip scroll */}
            <div className="relative mb-12 md:mb-20 overflow-hidden">
                <div className="flex gap-3 md:gap-4 gallery-scroll" style={{ width: "fit-content" }}>
                    {[...filmPhotos, ...filmPhotos].map((src, idx) => (
                        <div
                            key={idx}
                            className="w-[140px] h-[100px] md:w-[260px] md:h-[160px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-lg shadow-pink-200/30"
                        >
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

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-sm md:text-base text-gray-500">
                        Setiap momen bareng kamu selalu jadi cerita yang seru 💕
                    </motion.p>
                </div>

                {/* Bento Grid Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-2 md:gap-3">
                    {photos.map((photo, idx) => {
                        let spanClass = "";
                        if (photo.size === "large") spanClass = "col-span-2 row-span-2";
                        else if (photo.size === "tall") spanClass = "row-span-2";
                        else if (photo.size === "wide") spanClass = "col-span-2";

                        return (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                                className={`group relative ${spanClass} rounded-xl md:rounded-2xl overflow-hidden cursor-pointer`}
                                onClick={() => setSelectedPhoto(photo.id)}
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                {/* Subtle gradient always visible */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 md:p-4 z-10">
                                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                        <h4 className="text-white font-bold font-space text-xs md:text-sm mb-0.5">{photo.title}</h4>
                                        <p className="text-white/70 text-[10px] md:text-xs leading-tight">{photo.caption}</p>
                                    </div>
                                </div>

                                {/* Heart */}
                                <div className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <Heart size={10} className="text-white" />
                                </div>

                                {/* Number badge */}
                                <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 z-10 opacity-60 group-hover:opacity-0 transition-opacity">
                                    <span className="text-white text-[9px] md:text-[10px] font-mono font-bold">{String(idx + 1).padStart(2, "0")}</span>
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
                    className="mt-8 md:mt-12 text-center text-gray-400 text-xs font-mono"
                >
                    📸 tap foto untuk lihat lebih besar
                </motion.p>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto !== null && selectedIdx !== -1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10002] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30"
                        >
                            <X size={20} />
                        </button>

                        {/* Prev */}
                        {selectedIdx > 0 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        {/* Next */}
                        {selectedIdx < photos.length - 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-30"
                            >
                                <ChevronRight size={20} />
                            </button>
                        )}

                        {/* Photo */}
                        <motion.div
                            key={photos[selectedIdx].id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-[90vw] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={photos[selectedIdx].src}
                                alt={photos[selectedIdx].title}
                                width={800}
                                height={1000}
                                className="w-auto h-auto max-w-[90vw] max-h-[75vh] object-contain rounded-2xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                                <h3 className="text-white font-bold font-space text-base md:text-lg">{photos[selectedIdx].title}</h3>
                                <p className="text-white/70 text-xs md:text-sm mt-1">{photos[selectedIdx].caption}</p>
                                <p className="text-white/40 text-[10px] font-mono mt-2">{selectedIdx + 1} / {photos.length}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
