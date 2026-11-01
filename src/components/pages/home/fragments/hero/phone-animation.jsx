"use client";
import { useState, useEffect, useRef } from "react";
import { ConnectSheetPhase } from "./phone-components/ConnectSheetPhase";
import { WhatsAppSyncPhase } from "./phone-components/WhatsAppSyncPhase";
import { GoogleSheetPhase } from "./phone-components/GoogleSheetPhase";
import { Lock, Sparkles, Play, Pause, RotateCcw } from "lucide-react";

const INITIAL_CONTACTS = [
    {
        id: 1,
        name: "Rahul Verma",
        phone: "+91 98112 34567",
        lastMsg: "Looking for monthly pricing details!",
        status: "Pricing Requested",
        avatarBg: "bg-blue-600",
        synced: false,
    },
    {
        id: 2,
        name: "Priya Singh",
        phone: "+91 98234 56789",
        lastMsg: "Can you send the demo video link?",
        status: "Demo Scheduled",
        avatarBg: "bg-purple-600",
        synced: false,
    },
    {
        id: 3,
        name: "Amit Patel",
        phone: "+91 97654 32109",
        lastMsg: "Ready to purchase 5 licenses today",
        status: "Hot Lead",
        avatarBg: "bg-amber-600",
        synced: false,
    },
    {
        id: 4,
        name: "Neha Sharma",
        phone: "+91 98765 43210",
        lastMsg: "Need Google Sheets auto-sync",
        status: "Interested",
        avatarBg: "bg-emerald-600",
        synced: false,
    },
];

const STEPS = [
    { short: "Setup", full: "Extension", url: "chrome://leadio/setup", duration: 3800 },
    { short: "WhatsApp", full: "WhatsApp", url: "web.whatsapp.com", duration: 4800 },
    { short: "Sheet", full: "Google Sheet", url: "docs.google.com/spreadsheets/...", duration: 4800 },
];

export const PhoneAnimation = () => {
    const [phase, setPhase] = useState(0); // 0 = Setup, 1 = WhatsApp, 2 = Google Sheet
    const [isPlaying, setIsPlaying] = useState(true);
    const [contacts, setContacts] = useState(INITIAL_CONTACTS);
    const [isConnected, setIsConnected] = useState(true);
    const [sheetUrl, setSheetUrl] = useState("https://docs.google.com/spreadsheets/d/1BxiMVs0X9vF/edit");
    const [lastSyncedContact, setLastSyncedContact] = useState(null);

    const autoPlayTimerRef = useRef(null);
    const subTimersRef = useRef([]);

    // Clear sub-timers
    const clearSubTimers = () => {
        subTimersRef.current.forEach((t) => clearTimeout(t));
        subTimersRef.current = [];
    };

    // Audio chime on sync
    const playChime = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.22);
            }
        } catch (e) {
            // AudioContext blocked
        }
    };

    // Auto-Play Cycle Engine
    useEffect(() => {
        if (!isPlaying) return;

        clearSubTimers();

        if (phase === 0) {
            setContacts((prev) => prev.map((c) => ({ ...c, synced: false })));
            setLastSyncedContact(null);
        } else if (phase === 1) {
            const t1 = setTimeout(() => {
                setContacts((prev) =>
                    prev.map((c) => (c.id === 1 ? { ...c, synced: true } : c))
                );
                playChime();
                setLastSyncedContact(INITIAL_CONTACTS[0]);
            }, 800);

            const t2 = setTimeout(() => {
                setContacts((prev) =>
                    prev.map((c) => (c.id === 2 ? { ...c, synced: true } : c))
                );
                playChime();
                setLastSyncedContact(INITIAL_CONTACTS[1]);
            }, 1800);

            const t3 = setTimeout(() => {
                setContacts((prev) =>
                    prev.map((c) => (c.id === 3 ? { ...c, synced: true } : c))
                );
                playChime();
                setLastSyncedContact(INITIAL_CONTACTS[2]);
            }, 2800);

            subTimersRef.current = [t1, t2, t3];
        }

        autoPlayTimerRef.current = setTimeout(() => {
            setPhase((prev) => (prev + 1) % STEPS.length);
        }, STEPS[phase].duration);

        return () => {
            if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
            clearSubTimers();
        };
    }, [phase, isPlaying]);

    const handleStepClick = (idx) => {
        setIsPlaying(false);
        clearSubTimers();
        setPhase(idx);
    };

    const toggleContactSync = (id) => {
        setIsPlaying(false);
        clearSubTimers();
        setContacts((prev) =>
            prev.map((c) => {
                if (c.id === id) {
                    const newSynced = !c.synced;
                    if (newSynced) {
                        playChime();
                        setLastSyncedContact(c);
                    }
                    return { ...c, synced: newSynced };
                }
                return c;
            })
        );
    };

    const handleRestart = () => {
        clearSubTimers();
        setContacts(INITIAL_CONTACTS);
        setLastSyncedContact(null);
        setPhase(0);
        setIsPlaying(true);
    };

    return (
        <div className="w-full max-w-full sm:max-w-lg lg:max-w-none flex flex-col items-center">
            {/* Desktop Browser Window Mockup Frame */}
            <div className="w-full max-w-full rounded-md border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden flex flex-col">
                {/* 1. Browser Window Top Header */}
                <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-2 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        {/* macOS Window Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>

                        {/* URL Pill */}
                        <div className="ml-1 px-2 py-0.5 rounded bg-white dark:bg-zinc-950 text-[10px] sm:text-[11px] font-mono text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-zinc-800 flex items-center gap-1 truncate max-w-[130px] xs:max-w-[180px] sm:max-w-xs">
                            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{STEPS[phase].url}</span>
                        </div>
                    </div>

                    {/* Auto-Play Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 bg-white/70 dark:bg-zinc-800/70 border border-neutral-200 dark:border-zinc-700 cursor-pointer transition-colors shrink-0"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-2.5 h-2.5 text-primary fill-current" />
                                <span className="hidden xs:inline">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-2.5 h-2.5 text-emerald-600 fill-current" />
                                <span className="hidden xs:inline">Play</span>
                            </>
                        )}
                    </button>
                </div>

                {/* 2. Responsive Step Switcher Bar */}
                <div className="grid grid-cols-3 border-b border-neutral-200 dark:border-zinc-800 bg-neutral-50/80 dark:bg-zinc-900/60 text-center">
                    {STEPS.map((step, idx) => {
                        const isCurrent = phase === idx;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleStepClick(idx)}
                                className={`relative py-2 px-1.5 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    isCurrent
                                        ? "text-neutral-900 dark:text-white bg-white dark:bg-zinc-950 font-extrabold shadow-2xs"
                                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                                }`}
                            >
                                <span
                                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 ${
                                        isCurrent
                                            ? "bg-primary text-white"
                                            : "bg-neutral-200 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-400"
                                    }`}
                                >
                                    {idx + 1}
                                </span>
                                <span className="truncate xs:hidden">{step.short}</span>
                                <span className="truncate hidden xs:inline">{step.full}</span>

                                {/* Active Underline */}
                                {isCurrent && (
                                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* 3. Screen Content Wrapper (Desktop Browser Layout) */}
                <div className="relative w-full h-[400px] sm:h-[440px] flex flex-col overflow-hidden">
                    <ConnectSheetPhase
                        isActive={phase === 0}
                        onNext={() => setPhase(1)}
                        isConnected={isConnected}
                        sheetUrl={sheetUrl}
                        setSheetUrl={setSheetUrl}
                    />
                    <WhatsAppSyncPhase
                        isActive={phase === 1}
                        onNext={() => setPhase(2)}
                        contacts={contacts}
                        toggleContactSync={toggleContactSync}
                        lastSyncedContact={lastSyncedContact}
                    />
                    <GoogleSheetPhase
                        isActive={phase === 2}
                        onBack={() => setPhase(1)}
                        onRestart={handleRestart}
                        contacts={contacts}
                    />
                </div>
            </div>

            {/* Micro Caption */}
            <div className="mt-2.5 flex flex-col sm:flex-row items-center justify-between w-full text-[11px] text-neutral-500 dark:text-neutral-400 px-1 gap-1 text-center sm:text-left">
                <span className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Auto-Play: Extension → WhatsApp Ticks → Google Sheets</span>
                </span>
                <button
                    type="button"
                    onClick={handleRestart}
                    className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white cursor-pointer font-semibold shrink-0"
                >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restart</span>
                </button>
            </div>
        </div>
    );
};
