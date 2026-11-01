"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";
import {
    Zap,
    FileSpreadsheet,
    ShieldCheck,
    Check,
    ArrowRight,
    Sparkles,
    MousePointerClick,
    Tags,
    Filter,
    Users,
    Clock,
    Lock,
    Copy,
    AlertCircle,
    CheckCircle2
} from "lucide-react";

const FEATURES = [
    {
        icon: MousePointerClick,
        badge: "Instant Capture",
        title: "1-Click WhatsApp Extraction",
        description: "Injects a direct capture button into WhatsApp Web. Click on any contact or conversation to extract customer name, phone number, and message in under a second.",
        metric: "Save 3+ mins / lead",
        highlight: "Zero copy-pasting",
    },
    {
        icon: FileSpreadsheet,
        badge: "Live Sync",
        title: "Real-Time Google Sheets Sync",
        description: "Connect your Google account and target spreadsheet URL once. Every captured lead streams directly into designated columns with zero webhook setup and zero Zapier fees.",
        metric: "<0.2s sync speed",
        highlight: "Unlimited sheets",
    },
    {
        icon: Tags,
        badge: "Lead Pipeline",
        title: "Smart Lead Status Tagging",
        description: "Qualify leads on the fly directly inside WhatsApp Web. Add tags like Hot Lead, Follow-Up, or Pricing Sent so your sales team knows exactly who to contact first.",
        metric: "4x faster pipeline",
        highlight: "Custom tags",
    },
    {
        icon: Filter,
        badge: "Clean CRM",
        title: "Deduplication & Contact Shield",
        description: "Never worry about messy sheets. Leadio instantly verifies if a phone number already exists, updating existing conversation logs rather than creating duplicate rows.",
        metric: "100% duplicate free",
        highlight: "Auto-merging",
    },
    {
        icon: ShieldCheck,
        badge: "Zero Ban Risk",
        title: "100% Ban-Proof & Safe",
        description: "Unlike risky third-party WhatsApp bots that can get your business number banned, Leadio operates strictly as a safe client-side Chrome helper on native WhatsApp Web.",
        metric: "0% ban rate",
        highlight: "Official Web client",
    },
    {
        icon: Users,
        badge: "Team Ready",
        title: "Multi-User Sales Collaboration",
        description: "Equip your entire sales team with Leadio. Multiple representatives can capture inbound WhatsApp chats simultaneously into one central master Google Sheet.",
        metric: "Team visibility",
        highlight: "Shared sheet access",
    },
];

const COMPARISON = {
    manual: [
        "Select text, copy phone number, switch tab (3+ mins/lead)",
        "Frequent copy-paste typos and lost contact numbers",
        "Multiple tabs open causing browser slowdown and confusion",
        "Expensive monthly Zapier/Make tasks for simple sheet syncing",
        "Zero pipeline tagging inside WhatsApp Web",
    ],
    leadio: [
        "1-Click instant capture straight into Google Sheets (<1 sec)",
        "100% verified numbers and formatted names with timestamps",
        "Direct Chrome Extension overlay without tab-switching",
        "Flat ₹499/mo with zero per-lead task fees and unlimited syncs",
        "Color-coded tags (Hot Lead, Follow Up, Pricing Sent) built-in",
    ],
};

export default function FeaturesSection() {
    const [activeTag, setActiveTag] = useState("Hot Lead");

    const handleBuyNow = () => {
        window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
    };

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
                        Stop wasting hours manually copy-pasting numbers. Leadio connects WhatsApp Web directly to Google Sheets so your sales team never loses a hot customer again.
                    </p>
                </div>
            }
        >
            <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
                {/* 1. Hero Bento Grid (6 Main Features) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {FEATURES.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                                className="group p-5 sm:p-6 rounded-md bg-white dark:bg-zinc-950 border border-neutral-200/90 dark:border-zinc-800 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    {/* Card Header: Icon + Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-zinc-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-zinc-800">
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Footer metric pill */}
                                <div className="pt-3 border-t border-neutral-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>{item.metric}</span>
                                    </span>
                                    <span className="text-[11px] text-neutral-400 font-medium">
                                        {item.highlight}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 2. Interactive Feature Spotlight: 1-Click Workflow Simulation */}
                <div className="rounded-md border border-neutral-200/90 dark:border-zinc-800 bg-neutral-50/70 dark:bg-zinc-900/40 p-5 sm:p-8 lg:p-10 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left column: Feature explanation */}
                        <div className="lg:col-span-6 space-y-4 text-left">
                            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
                                ⚡ Interactive Preview
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                                Tag & Sync In Under 1 Second
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Select a status tag while chatting on WhatsApp Web. Leadio logs the customer's phone number, name, and selected tag directly into your Google Sheet row.
                            </p>

                            {/* Tag Selectors */}
                            <div className="pt-2">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                                    Select tag to test:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Hot Lead", "Pricing Sent", "Follow Up", "Demo Scheduled"].map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setActiveTag(tag)}
                                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                                                activeTag === tag
                                                    ? "bg-primary text-white shadow-xs"
                                                    : "bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-neutral-300 hover:border-primary"
                                            }`}
                                        >
                                            {tag === "Hot Lead" && "🔥 "}
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span>Real-time timestamp</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Zero duplicates</span>
                                </span>
                            </div>
                        </div>

                        {/* Right column: Interactive Visual Card */}
                        <div className="lg:col-span-6">
                            <div className="p-4 sm:p-5 rounded-md bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 shadow-sm space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800 text-xs">
                                    <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <FileSpreadsheet className="w-4 h-4 text-[#0F9D58]" />
                                        <span>Google Sheet Row Output</span>
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        Live Preview
                                    </span>
                                </div>

                                {/* Table Mockup of output */}
                                <div className="space-y-2 font-mono text-xs">
                                    <div className="p-2.5 rounded bg-neutral-50 dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 flex items-center justify-between">
                                        <span className="text-neutral-400 text-[10px]">A: Full Name</span>
                                        <span className="font-bold text-neutral-900 dark:text-white font-sans">
                                            Vikramaditya Rao
                                        </span>
                                    </div>
                                    <div className="p-2.5 rounded bg-neutral-50 dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 flex items-center justify-between">
                                        <span className="text-neutral-400 text-[10px]">B: WhatsApp No.</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                            +91 98450 12345
                                        </span>
                                    </div>
                                    <div className="p-2.5 rounded bg-neutral-50 dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 flex items-center justify-between">
                                        <span className="text-neutral-400 text-[10px]">C: Lead Status</span>
                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold font-sans bg-primary/10 text-primary border border-primary/25">
                                            {activeTag}
                                        </span>
                                    </div>
                                    <div className="p-2.5 rounded bg-neutral-50 dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 flex items-center justify-between">
                                        <span className="text-neutral-400 text-[10px]">D: Capture Time</span>
                                        <span className="text-neutral-500 text-[11px]">
                                            Just Now (Auto-Logged)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Comparison Section: Manual vs Leadio */}
                <div className="rounded-md border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 lg:p-10 shadow-sm">
                    <div className="text-center max-w-xl mx-auto mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            The Leadio Advantage
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                            Manual Copy-Pasting vs. Leadio 1-Click
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Way */}
                        <div className="p-5 sm:p-6 rounded-md bg-neutral-50/70 dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800 space-y-4">
                            <div className="flex items-center gap-2 text-neutral-500 font-bold text-sm">
                                <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs">
                                    ✕
                                </span>
                                <span>The Old Manual Way</span>
                            </div>
                            <ul className="space-y-3">
                                {COMPARISON.manual.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                        <span className="text-red-400 shrink-0 mt-0.5">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Leadio Way */}
                        <div className="p-5 sm:p-6 rounded-md bg-primary/[0.04] dark:bg-primary/[0.07] border border-primary/25 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                                        ✓
                                    </span>
                                    <span>The Leadio Way</span>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                    Recommended
                                </span>
                            </div>
                            <ul className="space-y-3">
                                {COMPARISON.leadio.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[2.5]" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom CTA bar */}
                    <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold text-neutral-900 dark:text-white">
                                Ready to automate WhatsApp lead capture?
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                1-Month full subscription • Instant Chrome Extension setup • Cancel anytime
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleBuyNow}
                            className="w-full sm:w-auto h-11 px-6 rounded-md font-bold bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                        >
                            <Zap className="w-4 h-4 fill-current" />
                            <span>Buy Now • ₹499 /month</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
