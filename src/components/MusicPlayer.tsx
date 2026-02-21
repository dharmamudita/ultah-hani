"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";

// Taruh file lagu di folder public, contoh: public/song.mp3
const SONG_URL = "/birthday-song.mp3";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const audio = new Audio(SONG_URL);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
        });

        audio.addEventListener("timeupdate", () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        });

        // Auto-play langsung (mungkin diblokir browser)
        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(() => {
            // Kalau diblokir, play saat user klik/touch pertama
            const playOnInteract = () => {
                audio.play().then(() => setIsPlaying(true)).catch(() => { });
                document.removeEventListener("click", playOnInteract);
                document.removeEventListener("touchstart", playOnInteract);
            };
            document.addEventListener("click", playOnInteract);
            document.addEventListener("touchstart", playOnInteract);
        });

        return () => {
            audio.pause();
            audio.remove();
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        audioRef.current.currentTime = newTime;
    };

    return (
        <div className="fixed bottom-6 right-6 z-[10001] flex flex-col items-end gap-3">
            {/* Expanded player */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white/90 backdrop-blur-xl border border-pink-200 rounded-2xl p-4 w-[260px] shadow-lg shadow-pink-100/50"
                    >
                        {/* Song info */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <Music size={18} className="text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-gray-800 text-sm font-semibold font-space truncate">Selamat Ulang Tahun</p>
                                <p className="text-gray-400 text-[11px] font-mono truncate">Jamrud</p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div
                            className="w-full h-1.5 bg-pink-100 rounded-full mb-2 cursor-pointer group"
                            onClick={handleProgressClick}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>

                        {/* Time */}
                        <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-3">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={toggleMute}
                                className="text-gray-400 hover:text-pink-500 transition-colors p-1.5 touch-manipulation"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>

                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={togglePlay}
                                className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-shadow touch-manipulation"
                            >
                                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button */}
            <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all touch-manipulation relative"
            >
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-pink-400/50"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
                <Music size={20} />
            </motion.button>
        </div>
    );
}
