"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function StickyBookNow() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBuyNow = (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 80, opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[90] max-w-lg w-auto"
            >
                <div className="relative flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-neutral-200/90 dark:border-zinc-800/90 shadow-2xl shadow-neutral-950/15 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5">
                    {/* Price and Details */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="min-w-0 flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight">
                                    ₹499<span className="text-xs font-semibold text-neutral-500">/month</span>
                                </span>
                                <span className="line-through text-neutral-400 text-xs hidden xs:inline">
                                    ₹999
                                </span>
                            </div>
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                Cancel anytime • Instant access
                            </span>
                        </div>
                    </div>

                    {/* Buy Now Action */}
                    <div className="flex items-center gap-2 shrink-0">
                        <motion.button
                            type="button"
                            onClick={handleBuyNow}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-4 sm:px-5 rounded-md bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
                        >
                            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                            <span>Buy Now • ₹499</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
