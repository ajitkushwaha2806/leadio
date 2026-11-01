"use client";
import { motion } from "framer-motion";

export default function InfoCardGrid({ cardData = [] }) {
    return (
        <div className="grid md:grid-cols-2 gap-8 mt-16 mx-auto relative z-10 md:px-0">
            {cardData.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group relative bg-white/60 dark:bg-[#10101a]/60 border border-neutral-200/80 dark:border-neutral-800/80 
            rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden backdrop-blur-xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-2 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            {card.icon ? (
                                <div className="flex-shrink-0 bg-primary/10 text-primary p-3.5 rounded-2xl shadow-inner border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>
                            ) : (
                                <div className="flex-shrink-0 bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-2xl shadow-inner border border-primary/20 font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                                    {index + 1}
                                </div>
                            )}
                            <div className="pt-1">
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white tracking-tight mb-1 group-hover:text-primary transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    {card.description}
                                </p>
                            </div>
                        </div>

                        <div className="bg-neutral-50/80 dark:bg-black/30 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800/50 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {card.content}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}