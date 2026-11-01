"use client";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Search, ArrowRight, Zap } from "lucide-react";

export function WhatsAppSyncPhase({
    isActive,
    onNext,
    contacts,
    toggleContactSync,
    lastSyncedContact
}) {
    if (!isActive) return null;

    const syncedCount = contacts.filter((c) => c.synced).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col bg-white dark:bg-zinc-950 text-neutral-900 dark:text-white select-none text-left"
        >
            <div className="w-full min-w-0 flex-1 overflow-y-auto">
                {/* WhatsApp Web Desktop Header Bar */}
                <div className="bg-[#128C7E] dark:bg-[#075E54] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                            WA
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                                <h4 className="font-bold text-xs truncate">WhatsApp Web</h4>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
                            </div>
                            <p className="text-[9px] text-white/80 truncate">Active Inbound Chats</p>
                        </div>
                    </div>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-md font-medium shrink-0">
                        4 Leads
                    </span>
                </div>

                {/* Leadio Injected Toolbar */}
                <div className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-primary/[0.12] via-primary/[0.06] to-transparent border-b border-primary/20 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <Zap className="w-3.5 h-3.5 text-primary fill-current shrink-0" />
                        <span className="text-xs font-bold text-primary truncate">
                            Leadio Sync: {syncedCount} Selected
                        </span>
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">
                        Auto-capture
                    </span>
                </div>

                {/* Search Bar */}
                <div className="p-2 sm:p-2.5 border-b border-neutral-100 dark:border-zinc-800">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <div className="w-full pl-7 pr-2.5 py-1 text-xs rounded-md bg-neutral-100 dark:bg-zinc-900 text-neutral-400 truncate">
                            Search or filter WhatsApp chats...
                        </div>
                    </div>
                </div>

                {/* Real-time Sync Toast Notification */}
                {lastSyncedContact && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-2.5 sm:mx-3 mt-1.5 p-1.5 sm:p-2 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-between gap-2 shadow-xs"
                    >
                        <div className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Saved {lastSyncedContact.name} ({lastSyncedContact.phone})!</span>
                        </div>
                        <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 shrink-0">
                            +1 Lead
                        </span>
                    </motion.div>
                )}

                {/* Contact List with Leadio Tick Marks */}
                <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => toggleContactSync(contact.id)}
                            className={`p-2 sm:p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                contact.synced
                                    ? "bg-primary/[0.05] dark:bg-primary/[0.1] border-primary/30 shadow-xs"
                                    : "bg-neutral-50/70 dark:bg-zinc-900/50 border-neutral-200/70 dark:border-zinc-800/80 hover:border-neutral-300"
                            }`}
                        >
                            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-[11px] sm:text-xs font-bold shrink-0 ${contact.avatarBg}`}
                                >
                                    {contact.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-1.5 truncate">
                                        <p className="text-xs font-bold truncate text-neutral-900 dark:text-white">
                                            {contact.name}
                                        </p>
                                        <span className="text-[10px] text-neutral-500 font-mono truncate">
                                            {contact.phone}
                                        </span>
                                    </div>
                                    <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                        "{contact.lastMsg}"
                                    </p>
                                </div>
                            </div>

                            {/* Leadio Tick Mark Button */}
                            <div className="shrink-0 flex items-center">
                                {contact.synced ? (
                                    <div className="flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-md bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold shadow-xs">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                        <span>Synced</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-md bg-neutral-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 text-[10px] sm:text-[11px] font-bold hover:bg-primary hover:text-white transition-colors">
                                        <span>+ Save</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Actions Bar: Sticky to Bottom */}
            <div className="sticky bottom-0 z-10 w-full p-3 sm:p-3.5 border-t border-neutral-200/90 dark:border-zinc-800 flex items-center justify-between gap-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xs">
                <span className="text-[11px] text-neutral-500 font-medium truncate">
                    Ticking sends leads to Sheets
                </span>
                <button
                    type="button"
                    onClick={onNext}
                    className="py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-md bg-[#0F9D58] hover:bg-[#0c8047] text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer shrink-0"
                >
                    <span>View Sheets ({syncedCount})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </motion.div>
    );
}
