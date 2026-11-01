"use client";
import { cn } from "@/lib/utils";
import Button from "@/components/global/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ErrorState({ title = "Something went wrong", message = "An unexpected error occurred. Please try again.", onRetry, fullscreen = false, className }) {
    const content = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "flex flex-col items-center justify-center p-8 text-center max-w-md w-full mx-auto",
                !fullscreen && "min-h-[300px]",
                className
            )}
        >
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6 shadow-sm border border-red-100 dark:border-red-500/20">
                <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={2} />
            </div>

            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                {title}
            </h3>

            <p className="text-neutral-500 dark:text-neutral-400 text-[15px] mb-8 leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <Button 
                    onClick={onRetry} 
                    text="Try Again"
                    icon={{ icon: RefreshCw, position: "start" }}
                    className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-xl shadow-md hover:shadow-lg transition-all"
                />
            )}
        </motion.div>
    );

    return (
        <AnimatePresence>
            {(
                fullscreen ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm",
                            className
                        )}
                    >
                        {content}
                    </motion.div>
                ) : (
                    <div className={cn("flex w-full items-center justify-center", className)}>
                        {content}
                    </div>
                )
            )}
        </AnimatePresence>
    );
}
