"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "./helper/constants";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

export default function Testimonials() {
    return (
        <SectionWrapper
            id="reviews"
            title={
                <>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
                        Loved by Our{" "}
                        <Highlighter action="highlight" color="var(--primary)" padding={8}>
                            <span className="relative z-10 px-2 text-white">Customers</span>
                        </Highlighter>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                        800+ Businesses & Sales Teams already love it
                    </p>
                </>
            }
        >

            <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "200px" }}
                        variants={cardVariants}
                        className="rounded-md border border-neutral-200 dark:border-neutral-700 p-4 md:p-8 backdrop-blur-lg shadow-sm bg-white/60 dark:bg-[#10101a]/70 transition-colors"
                    >
                        <div className="flex items-center gap-1 text-yellow-500 mb-3">
                            {[...Array(5)].map((_, idx) => (
                                <Star key={idx} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-6 italic">
                            “{t.quote}”
                        </p>
                        <div className="flex items-center gap-3">
                            <Image
                                src={t.img}
                                alt={t.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover border border-neutral-300 dark:border-neutral-600"
                            />
                            <div>
                                <div className="text-sm font-semibold text-neutral-800 dark:text-white">
                                    {t.name}
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {t.title}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper >
    );
}