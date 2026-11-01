"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md overflow-hidden transition-all hover:shadow-md">
            <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                onClick={onClick}
            >
                <span className="font-semibold text-lg text-neutral-900 dark:text-white">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        isOpen ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    )}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-5 pt-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0); 

    return (
        <div className="max-w-3xl mx-auto space-y-4 w-full">
            {items.map((item, index) => (
                <FAQItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
            ))}
        </div>
    );
}
