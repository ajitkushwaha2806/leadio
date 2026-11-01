"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function SectionWrapper({ id = "", title, children }) {
    return (
        <section
            id={id}
            className="relative overflow-hidden py-12 bg-zinc-50 dark:bg-[#0A0A0A]"
        >
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "absolute inset-0 h-full w-full stroke-emerald-600/30 fill-emerald-600/30 dark:stroke-emerald-400/30 dark:fill-emerald-400/30 z-0",
                    "[mask-image:linear-gradient(to_bottom,white,transparent_40%)]",
                )}
            />

            <div className="container relative mx-auto w-[95%] max-w-6xl px-3">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "200px" }}
                    className="mx-auto mb-12 max-w-3xl text-center"
                >
                    {title}
                </motion.div>
                {children}
            </div>
        </section>
    );
}