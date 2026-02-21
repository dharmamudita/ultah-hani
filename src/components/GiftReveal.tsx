"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftReveal({ onOpen }: { onOpen: () => void }) {
    const [opened, setOpened] = useState(false);

    const handleClick = () => {
        if (opened) return;
        setOpened(true);
        setTimeout(() => onOpen(), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9997] bg-gradient-to-b from-white to-pink-50 flex flex-col items-center justify-center px-6"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-rose-200/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                    {!opened ? (
                        <motion.div
                            key="gift"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="flex flex-col items-center"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-500 text-sm mb-8 font-mono"
                            >
                                Ada sesuatu buat kamu...
                            </motion.p>

                            <motion.button
                                onClick={handleClick}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{
                                    y: [0, -12, 0],
                                }}
                                transition={{
                                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                }}
                                className="relative group cursor-pointer"
                            >
                                {/* Glow behind gift */}
                                <div className="absolute inset-0 bg-pink-400/10 rounded-full blur-[60px] group-hover:bg-pink-400/20 transition-all scale-150" />

                                {/* Gift emoji */}
                                <div className="relative text-8xl md:text-[120px] select-none">
                                    🎁
                                </div>

                                {/* Sparkles around gift */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                                        style={{
                                            top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 45}%`,
                                            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 55}%`,
                                        }}
                                        animate={{
                                            scale: [0, 1.5, 0],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.25,
                                        }}
                                    />
                                ))}
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 text-gray-500 text-base font-space"
                            >
                                Tap untuk buka 🎉
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="opened"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            {/* Explosion particles */}
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: ["#f472b6", "#fbbf24", "#c084fc", "#34d399", "#fb923c", "#60a5fa"][i % 6],
                                    }}
                                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                    animate={{
                                        x: Math.cos(i * 30 * Math.PI / 180) * 200,
                                        y: Math.sin(i * 30 * Math.PI / 180) * 200,
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            ))}

                            <div className="text-7xl md:text-8xl mb-6">🎂</div>
                            <h2 className="text-3xl md:text-4xl font-black font-space text-gray-800 mb-3">
                                Happy Birthday!
                            </h2>
                            <p className="text-pink-500 text-lg font-space">Hastin Nurafni</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
