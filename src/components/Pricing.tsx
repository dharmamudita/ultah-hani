"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const birthdayPackages = [
    {
        name: "Pagi 🌅",
        price: "Doa Pagi",
        desc: "Semoga harimu dimulai dengan senyuman",
        features: ["Kesehatan yang prima", "Semangat menjalani hari", "Kebahagiaan sejak pagi", "Rezeki yang lancar"],
        popular: false,
        gradient: "from-pink-500 to-rose-500"
    },
    {
        name: "Spesial ⭐",
        price: "Doa Terbaik",
        desc: "Doa paling tulus dari hati untuk Hasni",
        features: ["Semua impian terwujud", "Cinta yang tulus", "Karir yang cemerlang", "Keluarga yang harmonis", "Umur panjang & berkah"],
        popular: true,
        gradient: "from-yellow-500 to-amber-500"
    },
    {
        name: "Malam 🌙",
        price: "Doa Malam",
        desc: "Penutup hari yang penuh syukur",
        features: ["Tidur yang nyenyak", "Mimpi yang indah", "Hati yang tenang", "Dijauhkan dari hal buruk", "Keberkahan berlimpah"],
        popular: false,
        gradient: "from-purple-500 to-violet-500"
    }
];

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="prayers" className="relative py-32 bg-gradient-to-b from-pink-50 to-white">
            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-4 block">🕊️ Doa & Harapan</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 font-space mb-6">Kiriman Doa Untukmu</h2>
                    <p className="text-gray-500">Setiap doa yang tulus akan selalu sampai. Ini adalah doa kami untukmu, Hasni! 💖</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {birthdayPackages.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-pink-300 bg-gradient-to-b from-pink-50 to-white shadow-lg shadow-pink-100/50' : 'border-pink-100 bg-white'} backdrop-blur-xl group hover:-translate-y-2 transition-transform duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-pink-200">⭐ Paling Spesial</div>
                            )}

                            <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                            <div className="text-3xl font-black text-gray-800 mb-1 font-space gradient-text-animated">{plan.price}</div>
                            <p className="text-sm text-gray-500 mb-8">{plan.desc}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-pink-100 text-pink-500' : 'bg-pink-50 text-pink-400'}`}>
                                            <Check size={12} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase text-center transition-all ${plan.popular ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 hover:scale-105' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'}`}>
                                Aamiin 🤲
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 text-center"
                >
                    <p className="text-gray-500 text-xs md:text-sm font-mono tracking-wide max-w-2xl mx-auto flex items-center justify-center gap-2 bg-white py-3 px-6 rounded-full border border-pink-100 shadow-sm">
                        <span className="text-pink-500 font-bold">💕</span>
                        Semua doa ini tulus dari hati untuk kebahagiaanmu, Hasni!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
