"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export default function GlowCard({ children, className, glowColor = "rgba(244, 114, 182, 0.5)" }: GlowCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => { setIsFocused(true); setOpacity(1); };
    const handleBlur = () => { setIsFocused(false); setOpacity(0); };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn("relative overflow-hidden rounded-2xl border border-pink-200 bg-gradient-to-br from-white to-pink-50/50", className)}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)` }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                style={{ opacity: isFocused ? 1 : 0, background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor.replace("0.5", "0.15")}, transparent 40%)` }}
            />
            {children}
        </motion.div>
    );
}
