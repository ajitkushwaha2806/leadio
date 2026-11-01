"use client";
import { motion } from "framer-motion";
import { FileSpreadsheet, CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";

export function GoogleSheetPhase({
    isActive,
    onBack,
    onRestart,
    contacts
}) {
    if (!isActive) return null;

    const syncedContacts = contacts.filter((c) => c.synced);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col bg-white dark:bg-zinc-950 text-neutral-900 dark:text-white select-none text-left"
        >
            <div className="w-full min-w-0 flex-1 overflow-y-auto">
                {/* Google Sheets Header Bar */}
                <div className="px-3 sm:px-4 py-2.5 bg-[#0F9D58] text-white flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded bg-white text-[#0F9D58] flex items-center justify-center shrink-0 shadow-xs">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                                <h4 className="font-bold text-xs truncate">
                                    WhatsApp Leads 2026
                                </h4>
                                <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded font-mono hidden xs:inline">
                                    .xlsx
                                </span>
                            </div>
                            <p className="text-[9px] text-white/80 truncate">Google Drive Auto-Sync</p>
                        </div>
                    </div>
                    <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 shrink-0 border border-white/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>LIVE SYNC</span>
                    </span>
                </div>

                {/* Google Sheets Sub-Toolbar */}
                <div className="px-3 sm:px-4 py-1.5 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">Sheet1</span>
                        <span className="text-neutral-300 dark:text-neutral-700">•</span>
                        <span className="text-primary font-bold hidden xs:inline">Auto-Sync ON</span>
                    </div>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                        {syncedContacts.length} Leads Synced
                    </span>
                </div>

                {/* Spreadsheet Table: Fully Responsive */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-zinc-900/80 border-b border-neutral-200 dark:border-zinc-800 text-[10px] font-bold uppercase text-neutral-400">
                                <th className="py-2 px-2 border-r border-neutral-200 dark:border-zinc-800 w-6 text-center">#</th>
                                <th className="py-2 px-2.5 border-r border-neutral-200 dark:border-zinc-800">A: Name</th>
                                <th className="py-2 px-2.5 border-r border-neutral-200 dark:border-zinc-800">B: WhatsApp</th>
                                <th className="py-2 px-2 sm:px-3 border-r sm:border-r-0 border-neutral-200 dark:border-zinc-800">C: Status</th>
                                <th className="py-2 px-3 hidden sm:table-cell">D: Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syncedContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-neutral-400 text-xs">
                                        No leads selected yet. Ticking contacts in WhatsApp populates this sheet.
                                    </td>
                                </tr>
                            ) : (
                                syncedContacts.map((contact, idx) => (
                                    <motion.tr
                                        key={contact.id}
                                        initial={{ opacity: 0, backgroundColor: "rgba(15, 157, 88, 0.15)" }}
                                        animate={{ opacity: 1, backgroundColor: "transparent" }}
                                        transition={{ duration: 0.5 }}
                                        className="border-b border-neutral-100 dark:border-zinc-800/80 hover:bg-neutral-50/60 dark:hover:bg-zinc-900/50"
                                    >
                                        <td className="py-2 px-2 border-r border-neutral-100 dark:border-zinc-800 text-neutral-400 font-mono text-center text-[10px]">
                                            {idx + 1}
                                        </td>
                                        <td className="py-2 px-2.5 border-r border-neutral-100 dark:border-zinc-800 font-bold text-neutral-900 dark:text-white truncate max-w-[85px] sm:max-w-none">
                                            {contact.name}
                                        </td>
                                        <td className="py-2 px-2.5 border-r border-neutral-100 dark:border-zinc-800 font-mono text-neutral-600 dark:text-neutral-400 text-[10px] sm:text-xs whitespace-nowrap">
                                            {contact.phone}
                                        </td>
                                        <td className="py-2 px-2 sm:px-3 border-r sm:border-r-0 border-neutral-100 dark:border-zinc-800">
                                            <span
                                                className={`inline-block px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold whitespace-nowrap ${
                                                    contact.status === "Hot Lead"
                                                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                                        : contact.status === "Pricing Requested"
                                                        ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                                                        : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                                                }`}
                                            >
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-neutral-500 text-[11px] font-medium hidden sm:table-cell whitespace-nowrap">
                                            WhatsApp Web
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Instant Entry Toast: Compact on mobile */}
                <div className="m-2.5 sm:m-3 p-2 sm:p-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold min-w-0">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Google Sheet Updated Live with Leads</span>
                    </div>
                    <span className="font-mono text-[9px] bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold shrink-0">
                        &lt;0.2s sync
                    </span>
                </div>
            </div>

            {/* Bottom Actions Bar: Sticky to Bottom */}
            <div className="sticky bottom-0 z-10 w-full p-3 sm:p-3.5 border-t border-neutral-200/90 dark:border-zinc-800 flex items-center justify-between gap-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xs">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 py-2 px-2.5 sm:px-3.5 rounded-md border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate"
                >
                    <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">WhatsApp</span>
                </button>
                <button
                    type="button"
                    onClick={onRestart}
                    className="flex-1 py-2 px-2.5 sm:px-3.5 rounded-md bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer truncate"
                >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Replay Demo</span>
                </button>
            </div>
        </motion.div>
    );
}
