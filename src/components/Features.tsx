"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import ParallaxTilt from "@/components/ui/ParallaxTilt";
import { Heart, Star, Smile, Music, Camera, Palette } from "lucide-react";
import Modal from "./ui/Modal";

const qualities = [
    { title: "Genuine banget", desc: "Kamu tuh orangnya real. Nggak fake, nggak pake topeng. Apa adanya dan itu yang bikin orang nyaman di deket kamu.", icon: Heart, gradient: "from-pink-500 to-rose-500" },
    { title: "Selalu stand out", desc: "Di antara banyak orang, kamu selalu yang paling keliatan. Bukan karena rame, tapi karena aura kamu beda aja.", icon: Star, gradient: "from-rose-400 to-pink-500" },
    { title: "Good energy", desc: "Senyum kamu literally bisa ngubah mood orang. Kalo kamu happy, orang di sekitar kamu ikut happy juga.", icon: Smile, gradient: "from-pink-400 to-rose-500" },
    { title: "Passionate", desc: "Kalo udah suka sesuatu, kamu all in. Nggak setengah-setengah. Itu rare banget dan aku salut sama itu.", icon: Music, gradient: "from-rose-500 to-pink-600" },
    { title: "Core memory maker", desc: "Tiap momen bareng kamu tuh jadi kenangan yang susah dilupain. Bahkan hal random pun bisa jadi memorable.", icon: Camera, gradient: "from-pink-500 to-fuchsia-500" },
    { title: "One of a kind", desc: "Cara pikir kamu unik, perspektif kamu beda. Kamu itu limited edition, nggak ada duanya.", icon: Palette, gradient: "from-fuchsia-400 to-pink-500" },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedQuality, setSelectedQuality] = useState<typeof qualities[0] | null>(null);

    return (
        <section id="aboutyou" className="relative py-28 md:py-36 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-pink-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500/30" />
                        <span className="px-4 py-1.5 bg-white border border-pink-200 rounded-full text-pink-500 text-[11px] font-mono uppercase tracking-[0.2em] shadow-sm">About you</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500/30" />
                    </motion.div>
                    <AnimatedText text="THINGS I LIKE ABOUT YOU" className="text-3xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-gray-800 mb-5" type="chars" animation="fadeUp" />
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-base text-gray-500">
                        Ini bukan asal ngomong. Ini beneran hal-hal yang bikin kamu special
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {qualities.map((quality, idx) => (
                        <motion.div
                            key={quality.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            onClick={() => setSelectedQuality(quality)}
                            className="cursor-pointer"
                        >
                            <ParallaxTilt className="h-full">
                                <div className="group relative h-full p-7 bg-white border border-pink-100 rounded-2xl hover:border-pink-300 transition-all duration-500 overflow-hidden shadow-sm">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-500/[0.03] to-purple-500/[0.03]" />
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quality.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                                            <quality.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2.5 font-space group-hover:text-pink-500 transition-colors">{quality.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{quality.desc}</p>
                                    </div>
                                    <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${quality.gradient} opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-500`} />
                                </div>
                            </ParallaxTilt>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedQuality} onClose={() => setSelectedQuality(null)} title={selectedQuality?.title || ''}>
                <div className="space-y-4">
                    <p className="text-base text-gray-700 leading-relaxed">{selectedQuality?.desc}</p>
                    <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                        <p className="text-sm text-gray-500 leading-relaxed italic">
                            Seriously, ini bukan template. Aku beneran mikirin ini soal kamu. Jangan pernah berubah ya.
                        </p>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
