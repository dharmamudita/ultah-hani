"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import Features from "@/components/Features";
import FriendsMessages from "@/components/FriendsMessages";
import PasswordScreen from "@/components/PasswordScreen";
import GiftReveal from "@/components/GiftReveal";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });

// Flow: Countdown → Splash → Loading → Password → Gift → Website
type Stage = "countdown" | "splash" | "loading" | "password" | "gift" | "website";

export default function Home() {
  // Cek waktu: kalau belum 2 Maret → countdown, kalau sudah → langsung splash
  const TARGET_DATE = new Date("2026-03-02T00:00:00+07:00");
  const initialStage: Stage = new Date() >= TARGET_DATE ? "splash" : "countdown";
  const [stage, setStage] = useState<Stage>(initialStage);

  const handleCountdownDone = useCallback(() => {
    setStage("splash");
  }, []);

  const handleSplashDone = useCallback(() => {
    setStage("loading");
  }, []);

  const handleLoadingDone = useCallback(() => {
    setStage("password");
  }, []);

  const handlePasswordUnlock = useCallback(() => {
    setStage("gift");
  }, []);

  const handleGiftOpen = useCallback(() => {
    setStage("website");
  }, []);

  return (
    <>
      {/* Music Player - selalu muncul di semua halaman */}
      <MusicPlayer />
      {/* Stage 0: Countdown (real-time) */}
      <AnimatePresence>
        {stage === "countdown" && (
          <Countdown key="countdown" onComplete={handleCountdownDone} />
        )}
      </AnimatePresence>

      {/* Stage 1: Splash - Selamat Ulang Tahun */}
      <AnimatePresence>
        {stage === "splash" && (
          <SplashScreen key="splash" onDone={handleSplashDone} />
        )}
      </AnimatePresence>

      {/* Stage 2: Loading Screen */}
      {stage === "loading" && (
        <LoadingScreenWrapper onDone={handleLoadingDone} />
      )}

      {/* Stage 2: Password Screen */}
      <AnimatePresence>
        {stage === "password" && (
          <PasswordScreen key="password" onUnlock={handlePasswordUnlock} />
        )}
      </AnimatePresence>

      {/* Stage 3: Gift Reveal */}
      <AnimatePresence>
        {stage === "gift" && (
          <GiftReveal key="gift" onOpen={handleGiftOpen} />
        )}
      </AnimatePresence>

      {/* Stage 4: Full Website */}
      {stage === "website" && (
        <>
          <CustomCursor />

          <main className="min-h-screen bg-[#fff1f5] text-gray-800 selection:bg-pink-500 selection:text-white overflow-x-hidden">

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
              <div className="orb orb-3" />
              <div className="matrix-bg" />
            </div>

            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`c${i}`} className="confetti" />
            ))}

            {["💖", "💝", "💗", "💕", "🩷", "❤️"].map((h, i) => (
              <div key={`h${i}`} className="floating-heart">{h}</div>
            ))}

            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`s${i}`} className="sparkle-particle" />
            ))}

            <div className="relative z-10">
              <Hero />
              <About />
              <PhotoGallery />
              <Features />
              <FriendsMessages />
            </div>
          </main>
        </>
      )}
    </>
  );
}

// Loading screen with auto-transition
function LoadingScreenWrapper({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 3500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-5xl mb-8 animate-bounce">🎂</div>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black font-space tracking-tight mb-2">
            <span className="text-pink-500">Turning</span>{" "}
            <span className="text-rose-600">20!</span>
          </h2>
          <p className="text-lg text-gray-400 font-space">Hastin Nurafni</p>
        </div>
        <div className="mt-8 w-40 h-[3px] bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

// Splash screen - "Selamat Ulang Tahun Hanii"
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 4500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const words = ["Selamat", "Ulang", "Tahun"];

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center overflow-hidden"
    >
      {/* Background floating emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {["🎂", "🎈", "🎁", "🎀", "✨", "💖", "🌸", "🎉", "💝", "🩷"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl"
            style={{
              left: `${8 + (i * 9) % 85}%`,
              top: `${5 + (i * 11) % 85}%`,
            }}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: [0, 0.6, 0.3],
              scale: [0, 1.2, 1],
              y: [20, -10, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.3 + i * 0.15,
              ease: "easeOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Sparkle top */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-4xl md:text-5xl mb-6"
        >
          🎂
        </motion.div>

        {/* "Selamat Ulang Tahun" */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.6, ease: "backOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-black font-space text-gray-800"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* "Hanii" - big and pink */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 150 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black font-space gradient-text-animated leading-none mb-6"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(236, 72, 153, 0.3))' }}
        >
          Hanii! 💕
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="text-gray-500 text-sm md:text-base font-mono tracking-wider"
        >
          02 · 03 · 2006 — turning 20 ✨
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="h-[3px] w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full origin-center"
        />
      </div>
    </motion.div>
  );
}
