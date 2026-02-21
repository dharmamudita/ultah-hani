"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { Heart, Star, Sparkles, Gift, Sun, Moon } from "lucide-react";
import Modal from "./ui/Modal";

const wishes = [
    { title: "Good vibes only", desc: "Semoga tahun ke-20 ini isinya cuma hal-hal yang bikin kamu happy. No drama, no toxic, cuma pure good vibes.", icon: Heart, gradient: "from-pink-500 to-rose-500" },
    { title: "Level up terus", desc: "Kamu udah jauh banget growthnya. Keep going, keep leveling up. Apa yang kamu kerjain pasti bakal worth it.", icon: Star, gradient: "from-rose-400 to-pink-500" },
    { title: "Stay healthy", desc: "Jangan lupa jaga kesehatan, istirahat cukup, makan bener. Self-care itu bukan manja, itu penting.", icon: Sun, gradient: "from-pink-400 to-rose-500" },
    { title: "Berkah selalu", desc: "Semoga selalu dilindungi, dimudahkan jalannya, dan selalu dapat keberkahan di setiap langkah.", icon: Moon, gradient: "from-rose-500 to-pink-600" },
    { title: "Loved & appreciated", desc: "Kamu itu lebih disayangi dari yang kamu kira. Banyak orang yang genuinely care sama kamu, termasuk aku.", icon: Sparkles, gradient: "from-pink-500 to-fuchsia-500" },
    { title: "Dream big", desc: "Mimpi kamu valid semua. Nggak ada yang terlalu besar. Tahun ini, mulai wujudin satu-satu ya.", icon: Gift, gradient: "from-fuchsia-400 to-pink-500" },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const [selectedWish, setSelectedWish] = useState<typeof wishes[0] | null>(null);

    return (
        <section id="wishes" ref={containerRef} className="relative py-28 md:py-40 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/15 to-transparent" />
                <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="flex-1 w-full">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="h-px w-8 bg-pink-500/50"></span>
                                <span className="text-pink-400/70 font-mono text-[11px] tracking-[0.2em] uppercase">Wishes for you</span>
                            </div>
                            <AnimatedText text="HAL-HAL YANG AKU HARAPIN BUAT KAMU" className="text-3xl md:text-4xl lg:text-5xl font-black font-space text-gray-800 mb-6 leading-tight" type="words" />
                            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg">
                                Nggak perlu kata-kata lebay. Intinya, aku genuinely pengen kamu happy dan semua hal baik dateng ke kamu. Ini beberapa doa yang aku kirimin buat kamu di umur 20.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {wishes.map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.06, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedWish(item)}
                                    className="flex gap-3.5 p-4 rounded-xl bg-white border border-pink-100 hover:border-pink-300 hover:bg-pink-50 transition-all group cursor-pointer shadow-sm"
                                >
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-gray-800 font-semibold text-sm mb-0.5 group-hover:text-pink-500 transition-colors">{item.title}</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative w-full max-w-[440px]">
                        <motion.div style={{ y }} className="relative">
                            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-rose-500/15 to-pink-300/10" />
                                <div className="absolute inset-0 bg-pink-50/70 backdrop-blur-sm" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="text-6xl mb-6"
                                    >🎂</motion.div>
                                    <h3 className="text-2xl md:text-3xl font-black font-space gradient-text-animated mb-2">The Big 20</h3>
                                    <p className="text-gray-600 text-base font-space mb-1">Hastin Nurafni</p>
                                    <p className="text-gray-500 text-sm font-mono mb-4">02 Maret 2006</p>
                                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mb-4" />
                                    <p className="text-gray-500 text-sm italic max-w-[220px]">&quot;20 looks good on you fr&quot;</p>
                                </div>
                                <div className="absolute inset-0 border border-pink-200 rounded-3xl" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Modal isOpen={!!selectedWish} onClose={() => setSelectedWish(null)} title={selectedWish?.title || ''}>
                <div className="space-y-4">
                    <p className="text-base text-gray-700 leading-relaxed">{selectedWish?.desc}</p>
                    <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                        <p className="text-sm text-gray-400 leading-relaxed italic">
                            Serius, aku beneran doain ini buat kamu. Semoga di umur 20 semuanya jadi lebih baik dari sebelumnya.
                        </p>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
