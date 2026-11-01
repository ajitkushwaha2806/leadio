"use client";
import { motion } from "framer-motion";
import { FileSpreadsheet, CheckCircle2, Link2, ArrowRight, ShieldCheck } from "lucide-react";

export function ConnectSheetPhase({ isActive, onNext, isConnected, sheetUrl, setSheetUrl }) {
    if (!isActive) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col bg-white dark:bg-zinc-950 text-neutral-900 dark:text-white select-none text-left"
        >
            <div className="space-y-3 sm:space-y-4 w-full min-w-0 p-4 sm:p-6 flex-1 overflow-y-auto">
                {/* Header: Leadio Extension Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-xs shrink-0">
                            L
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                                <h4 className="font-extrabold text-xs sm:text-sm tracking-tight truncate">Leadio Extension</h4>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-neutral-100 dark:bg-zinc-800 text-neutral-500 shrink-0">
                                    v2.4
                                </span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-neutral-400 truncate">Chrome Web Store • Auto-Sync</p>
                        </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] sm:text-xs flex items-center gap-1 border border-emerald-500/20 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active</span>
                    </span>
                </div>

                {/* Account Linked Box */}
                <div className="p-2.5 sm:p-3 rounded-md bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold truncate">sales@leadio.in</p>
                            <p className="text-[10px] text-neutral-400 truncate">Google Workspace Connected</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Linked</span>
                    </div>
                </div>

                {/* Sheet Link Field */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Target Google Spreadsheet URL
                        </label>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Detected
                        </span>
                    </div>
                    <div className="relative">
                        <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            readOnly
                            value={sheetUrl}
                            className="w-full pl-8 sm:pl-9 pr-2.5 py-2 text-xs font-mono rounded-md border border-neutral-200 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-900/50 text-neutral-800 dark:text-neutral-200 outline-none truncate"
                        />
                    </div>
                </div>

                {/* Sheet Details Confirmation */}
                <div className="p-2.5 sm:p-3 rounded-md bg-emerald-500/[0.07] border border-emerald-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Sheet: "Inbound WhatsApp Leads 2026"</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 pl-5 leading-snug">
                        Headers: <span className="font-mono text-neutral-800 dark:text-neutral-200">Name</span>, <span className="font-mono text-neutral-800 dark:text-neutral-200">Phone</span>, <span className="font-mono text-neutral-800 dark:text-neutral-200">Status</span>, <span className="font-mono text-neutral-800 dark:text-neutral-200">Timestamp</span>
                    </p>
                </div>
            </div>

            {/* Bottom Proceed Bar: Sticky to Bottom */}
            <div className="sticky bottom-0 z-10 w-full p-3 sm:p-3.5 border-t border-neutral-200/90 dark:border-zinc-800 flex items-center justify-between gap-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">Step 1: Extension Connected</span>
                </div>
                <button
                    type="button"
                    onClick={onNext}
                    className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-md bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                    <span>Open WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </motion.div>
    );
}
