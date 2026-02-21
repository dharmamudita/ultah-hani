"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-pink-50 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
        >
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
                    className="text-5xl mb-8"
                >
                    🎂
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-black font-space tracking-tight mb-2">
                        <span className="text-pink-400">Turning</span>{" "}
                        <span className="text-yellow-400">20!</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="text-lg text-white/50 font-space"
                    >
                        Hastin Nurafni
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: [1, 1, 1, 0] }}
                    transition={{
                        scaleX: { duration: 2, delay: 1, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 2.9 }
                    }}
                    className="mt-8 w-40 h-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 origin-left rounded-full"
                />
            </div>
        </motion.div>
    );
}
