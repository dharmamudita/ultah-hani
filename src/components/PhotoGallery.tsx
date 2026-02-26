"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Camera, Heart } from "lucide-react";
import Image from "next/image";

const photos = [
    { id: 1, src: "/foto/1.jpeg", title: "Buket Hani", caption: "Kalau bunga bisa diganti sama kamu, pasti lebih cantik 💐" },
    { id: 3, src: "/foto/3.jpeg", title: "Mirror Selfie", caption: "Momen bareng yang selalu bikin kangen" },
    { id: 4, src: "/foto/4.jpeg", title: "Cantik Banget", caption: "Nggak pernah bosen liatin kamu 💕" },
    { id: 5, src: "/foto/5.jpeg", title: "4 Ekspresi", caption: "Setiap ekspresi kamu tuh lucu semua" },
    { id: 6, src: "/foto/6.jpeg", title: "Cafe Date", caption: "Ngopi bareng kamu itu healing terbaik ☕" },
    { id: 7, src: "/foto/7.jpeg", title: "Nature Vibes", caption: "Cantiknya natural banget 🌿" },
    { id: 8, src: "/foto/8.jpeg", title: "Di Kampus", caption: "Mahasiswi paling cantik seangkatan 📚" },
    { id: 9, src: "/foto/9.jpeg", title: "Night Out", caption: "Pose love selalu bikin meleleh 💗" },
    { id: 10, src: "/foto/10.jpeg", title: "Senyum Manis", caption: "Senyum yang bisa bikin hari jadi lebih baik" },
    { id: 11, src: "/foto/11.jpeg", title: "Selfie di Kelas", caption: "Di kelas aja tetep cantik" },
    { id: 12, src: "/foto/12.jpeg", title: "Hangout Vibes", caption: "Senyum kamu itu contagious banget 😊" },
    { id: 13, src: "/foto/13.jpeg", title: "Pink Day", caption: "Warna pink emang cocok banget sama kamu 🩷" },
    { id: 14, src: "/foto/14.jpeg", title: "Peace! ✌️", caption: "Selalu ceria dan bikin semangat" },
    { id: 15, src: "/foto/15.jpeg", title: "Aesthetic", caption: "Cantik bareng bunga-bunga 🌸" },
    { id: 16, src: "/foto/16.jpeg", title: "School Day", caption: "Paling rajin dan paling cantik di kelas" },
    { id: 17, src: "/foto/17.jpeg", title: "Shopping!", caption: "Mall date kapan lagi? 🛍️" },
];

// Scroll strip photos
const scrollPhotos = [
    "/foto/4.jpeg", "/foto/8.jpeg", "/foto/13.jpeg", "/foto/14.jpeg",
    "/foto/6.jpeg", "/foto/9.jpeg", "/foto/15.jpeg", "/foto/17.jpeg",
];

export default function PhotoGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="gallery" className="relative py-16 md:py-32 bg-gradient-to-b from-white via-pink-50 to-pink-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Scrolling photo strip - ukuran tetap */}
            <div className="relative mb-12 md:mb-16 overflow-hidden">
                <div className="flex gap-3 md:gap-4 gallery-scroll" style={{ width: "fit-content" }}>
                    {[...scrollPhotos, ...scrollPhotos].map((src, idx) => (
                        <div
                            key={idx}
                            className="w-[140px] h-[100px] md:w-[260px] md:h-[160px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-lg"
                        >
                            <Image
                                src={src}
                                alt={`Photo ${idx + 1}`}
                                width={260}
                                height={160}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                            <Camera size={12} className="text-pink-400/60" /> Our moments
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500/30" />
                    </motion.div>

                    <AnimatedText
                        text="MEMORIES"
                        className="text-3xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-5"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-sm md:text-base text-gray-500">
                        Setiap momen bareng kamu selalu jadi cerita yang seru 💕
                    </motion.p>
                </div>

                {/* Masonry-style gallery — foto tidak terpotong */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 space-y-2 md:space-y-3">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.04 }}
                            className="group relative break-inside-avoid rounded-xl md:rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                width={400}
                                height={500}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4 z-10">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-white font-bold font-space text-xs md:text-sm mb-0.5">{photo.title}</h4>
                                    <p className="text-white/80 text-[10px] md:text-xs">{photo.caption}</p>
                                </div>
                            </div>

                            {/* Heart icon */}
                            <div className="absolute top-2 right-2 w-6 h-6 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <Heart size={10} className="text-pink-400" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 md:mt-10 text-center text-gray-500 text-xs font-mono"
                >
                    📸 17 momen spesial bersama kamu
                </motion.p>
            </div>
        </section>
    );
}
