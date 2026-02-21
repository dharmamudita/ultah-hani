"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white border border-pink-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl shadow-pink-100/50 pointer-events-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-pink-100 bg-pink-50/50">
                                <h3 className="text-xl font-bold font-space text-gray-800">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-pink-50 rounded-full transition-colors text-gray-400 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 text-gray-600 leading-relaxed max-h-[70vh] overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer Effect */}
                            <div className="h-1 w-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
