"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete } from "lucide-react";

// Password: 020306 (tanggal lahir 02-03-06)
const CORRECT_PIN = "020306";

export default function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePress = useCallback((num: string) => {
        if (pin.length >= 6 || success) return;

        const newPin = pin + num;
        setPin(newPin);
        setError(false);

        if (newPin.length === 6) {
            if (newPin === CORRECT_PIN) {
                setSuccess(true);
                setTimeout(() => onUnlock(), 800);
            } else {
                setError(true);
                setTimeout(() => {
                    setPin("");
                    setError(false);
                }, 600);
            }
        }
    }, [pin, success, onUnlock]);

    const handleDelete = useCallback(() => {
        if (success) return;
        setPin((prev) => prev.slice(0, -1));
        setError(false);
    }, [success]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9998] bg-gradient-to-b from-white to-pink-50 flex flex-col items-center justify-center px-4 select-none"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-300/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-rose-200/15 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
                {/* Lock icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-4xl mb-4"
                >
                    🔒
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold font-space text-gray-800 mb-1"
                >
                    Enter Password
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 text-sm mb-8"
                >
                    Masukkan 6 digit untuk lanjut
                </motion.p>

                {/* Pin dots */}
                <motion.div
                    animate={error ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex gap-3 sm:gap-4 mb-10"
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: pin.length === i ? [1, 1.3, 1] : 1,
                            }}
                            transition={{ duration: 0.15 }}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-200 ${error
                                ? "border-red-500 bg-red-500"
                                : success
                                    ? "border-green-500 bg-green-500"
                                    : i < pin.length
                                        ? "border-pink-400 bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                                        : "border-pink-200 bg-transparent"
                                }`}
                        />
                    ))}
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-xs mb-3 -mt-6 font-mono"
                        >
                            Password salah, coba lagi
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Numpad — responsive for both mouse click & touch tap */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full"
                >
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((key, idx) => {
                        if (key === "") return <div key={idx} />;

                        if (key === "del") {
                            return (
                                <button
                                    key={idx}
                                    onClick={handleDelete}
                                    onTouchEnd={(e) => { e.preventDefault(); handleDelete(); }}
                                    className="h-16 sm:h-[72px] rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-pink-50 active:bg-pink-100 active:scale-90 transition-all cursor-pointer touch-manipulation"
                                >
                                    <Delete size={22} />
                                </button>
                            );
                        }

                        return (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => handlePress(key)}
                                onTouchEnd={(e) => { e.preventDefault(); handlePress(key); }}
                                className="h-16 sm:h-[72px] rounded-2xl bg-white/80 border border-pink-100 flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-800 hover:bg-pink-50 hover:border-pink-300 active:bg-pink-100 transition-all font-space cursor-pointer touch-manipulation shadow-sm"
                            >
                                {key}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-pink-300 text-[11px] font-mono"
                >
                    hint: tanggal lahirnya 😉
                </motion.p>
            </div>
        </motion.div>
    );
}
