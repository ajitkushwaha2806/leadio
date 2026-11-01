"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";
import {
    FileSpreadsheet,
    Check,
    Sparkles,
    MousePointerClick,
    Tags,
    CheckCircle2,
} from "lucide-react";

export default function FeaturesSection() {
    const [extracted, setExtracted] = useState(false);
    const [selectedTag, setSelectedTag] = useState("🔥 Hot Lead");

    return (
        <SectionWrapper
            id="features"
            title={
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Core Features</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                        Everything You Need to Turn WhatsApp Into a{" "}
                        <Highlighter action="highlight" color="var(--primary)" padding={8}>
                            <span className="relative z-10 px-2 text-white">Lead Machine</span>
                        </Highlighter>
                    </h2>

                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Stop wasting hours manually copy-pasting numbers. Leadio connects WhatsApp Web directly to Google Sheets so your sales team never loses a customer.
                    </p>
                </div>
            }
        >
            <div className="max-w-6xl mx-auto">
                {/* 3 Main Features Grid (Rich Visual Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {/* Feature 1: 1-Click WhatsApp Extraction */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0 }}
                        className="group p-5 sm:p-6 rounded-md bg-white dark:bg-zinc-950 border border-neutral-200/90 dark:border-zinc-800 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between"
                    >
                        <div>
                            {/* Header: Large Icon + Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                                    <MousePointerClick className="w-6 h-6 stroke-[2.2]" />
                                </div>
                                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                    Instant Capture
                                </span>
                            </div>

                            {/* Title & Short Text */}
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                                1-Click WhatsApp Extraction
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Extract contact name, verified phone number, and conversation timestamp in under a second.
                            </p>

                            {/* Interactive Micro-Widget */}
                            <div className="my-4 p-3 rounded-md bg-neutral-50/80 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center font-black text-xs shrink-0">
                                            RS
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                                                Rahul Sharma
                                            </p>
                                            <p className="text-[10px] text-neutral-400 font-mono truncate">
                                                +91 98112 34567
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setExtracted(!extracted)}
                                        className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                                            extracted
                                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                                : "bg-primary text-white shadow-xs hover:bg-primary/90"
                                        }`}
                                    >
                                        {extracted ? (
                                            <>
                                                <Check className="w-3 h-3 stroke-[3]" />
                                                <span>Captured!</span>
                                            </>
                                        ) : (
                                            <>
                                                <MousePointerClick className="w-3 h-3" />
                                                <span>+ Capture</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Metric */}
                        <div className="pt-3 border-t border-neutral-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Save 3+ mins / lead</span>
                            </span>
                            <span className="text-[11px] text-neutral-400 font-medium">
                                Zero copy-pasting
                            </span>
                        </div>
                    </motion.div>

                    {/* Feature 2: Real-Time Google Sheets Sync */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className="group p-5 sm:p-6 rounded-md bg-white dark:bg-zinc-950 border border-neutral-200/90 dark:border-zinc-800 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                    >
                        <div>
                            {/* Header: Large Icon + Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                                    <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                                </div>
                                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    Live Sync
                                </span>
                            </div>

                            {/* Title & Short Text */}
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                Real-Time Google Sheets Sync
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Leads stream directly into your designated sheet columns with zero webhooks and zero Zapier fees.
                            </p>

                            {/* Interactive Micro-Widget */}
                            <div className="my-4 p-3 rounded-md bg-neutral-50/80 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800 space-y-2">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200">
                                        <FileSpreadsheet className="w-3.5 h-3.5 text-[#0F9D58]" />
                                        <span className="truncate">WhatsApp Leads 2026</span>
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>ACTIVE</span>
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                                    <div className="p-1.5 rounded bg-white dark:bg-zinc-950 border border-neutral-200/60 dark:border-zinc-800 truncate">
                                        <span className="text-neutral-400 block text-[9px]">NAME</span>
                                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-sans truncate block">Priya Singh</span>
                                    </div>
                                    <div className="p-1.5 rounded bg-white dark:bg-zinc-950 border border-neutral-200/60 dark:border-zinc-800 truncate">
                                        <span className="text-neutral-400 block text-[9px]">PHONE</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate block">+91 98234...</span>
                                    </div>
                                    <div className="p-1.5 rounded bg-white dark:bg-zinc-950 border border-neutral-200/60 dark:border-zinc-800 truncate">
                                        <span className="text-neutral-400 block text-[9px]">SPEED</span>
                                        <span className="text-primary font-bold font-sans truncate block">&lt;0.2s</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Metric */}
                        <div className="pt-3 border-t border-neutral-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>&lt;0.2s sync speed</span>
                            </span>
                            <span className="text-[11px] text-neutral-400 font-medium">
                                Unlimited sheets
                            </span>
                        </div>
                    </motion.div>

                    {/* Feature 3: Smart Lead Status Tagging */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.16 }}
                        className="group p-5 sm:p-6 rounded-md bg-white dark:bg-zinc-950 border border-neutral-200/90 dark:border-zinc-800 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
                    >
                        <div>
                            {/* Header: Large Icon + Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                                    <Tags className="w-6 h-6 stroke-[2.2]" />
                                </div>
                                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    Lead Pipeline
                                </span>
                            </div>

                            {/* Title & Short Text */}
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                Smart Lead Status Tagging
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Qualify leads on the fly directly inside WhatsApp Web so your sales team acts immediately.
                            </p>

                            {/* Interactive Micro-Widget */}
                            <div className="my-4 p-3 rounded-md bg-neutral-50/80 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800 space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                    Tap to preview tag:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["🔥 Hot Lead", "📄 Pricing Sent", "💬 Follow Up", "📅 Demo"].map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setSelectedTag(tag)}
                                            className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                                selectedTag === tag
                                                    ? "bg-primary text-white shadow-xs"
                                                    : "bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-neutral-300 hover:border-primary"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Metric */}
                        <div className="pt-3 border-t border-neutral-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>4x faster pipeline</span>
                            </span>
                            <span className="text-[11px] text-neutral-400 font-medium">
                                Custom tags
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
