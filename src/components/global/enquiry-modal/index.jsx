"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, X, Loader2, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { paymentService } from "@/services/frontend/payment.service";
import { trackLead, trackInitiateCheckout, trackPurchase } from "@/lib/meta-pixel";

export default function EnquiryModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        const handleCustomOpen = () => setIsOpen(true);
        window.addEventListener("open-enquiry-modal", handleCustomOpen);
        return () => window.removeEventListener("open-enquiry-modal", handleCustomOpen);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        setIsSubmitting(false);
        setApiError("");
    };

    const validate = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.fullName = "Please enter your name";
        const digits = phone.replace(/\D/g, "");
        if (!phone || digits.length !== 10) {
            newErrors.phone = "Please enter a valid 10-digit mobile number";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setApiError("");

        const cleanName = fullName.trim();
        const cleanPhone = phone.replace(/\D/g, "");
        const cleanEmail = email.trim().toLowerCase();

        try {
            const leadEventId = `lead_${Date.now()}_${cleanPhone.slice(-4)}`;

            // Track Meta Pixel Lead capture event with deduplication eventId
            trackLead({
                content_name: "Leadio 1-Month Plan",
                value: 499,
                currency: "INR",
                eventId: leadEventId,
            });

            // 1. Save lead details in MongoDB first (also triggers Server-Side Conversions API)
            try {
                await fetch("/api/enquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fullName: cleanName,
                        phone: cleanPhone,
                        email: cleanEmail,
                        plan: "Leadio 1-Month Plan (₹499)",
                        eventId: leadEventId,
                    }),
                });
            } catch (leadErr) {
                console.warn("Enquiry save error:", leadErr);
            }

            // Track Meta Pixel & CAPI InitiateCheckout event with user parameters
            trackInitiateCheckout({
                content_name: "Leadio 1-Month Plan",
                value: 499,
                currency: "INR",
                userData: {
                    fullName: cleanName,
                    phone: cleanPhone,
                    email: cleanEmail,
                },
            });

            // 2. Open Razorpay checkout immediately!
            await paymentService.initiateCheckout({
                planTitle: "Leadio 1-Month Plan",
                price: 499,
                phone: cleanPhone,
                email: cleanEmail,
                fullName: cleanName,
                planId: "leadio_monthly_499",
                onSuccess: (data) => {
                    // Track Meta Pixel Purchase event
                    trackPurchase({
                        order_id: data.razorpay_order_id,
                        value: 499,
                        currency: "INR",
                        content_name: "Leadio 1-Month Plan",
                    });
                    setIsSubmitting(false);
                    handleClose();
                    router.push(
                        `/success?order_id=${data.razorpay_order_id || ""}&plan=Leadio%201-Month%20Plan&amount=499`
                    );
                },
                onError: (err) => {
                    console.error("Razorpay Error:", err);
                    setIsSubmitting(false);
                    setApiError(err.message || "Payment cancelled or failed. Please try again.");
                },
                onDismiss: () => {
                    setIsSubmitting(false);
                },
            });
        } catch (err) {
            console.error("Submission Error:", err);
            setApiError(err.message || "Failed to start checkout. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                    />

                    {/* Drawer Modal */}
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="relative z-10 w-full max-w-lg bg-white dark:bg-zinc-950 rounded-t-2xl sm:rounded-md shadow-2xl border border-neutral-200 dark:border-zinc-800 flex flex-col overflow-hidden max-h-[92vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 dark:border-zinc-800">
                            <div>
                                <h3 className="font-extrabold text-neutral-900 dark:text-white text-base sm:text-lg">
                                    Get Leadio
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    WhatsApp Leads straight to Google Sheets
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                            {/* Plan Card */}
                            <div className="p-4 rounded-md bg-gradient-to-br from-primary/[0.08] via-neutral-50 to-transparent dark:from-primary/10 dark:via-zinc-900/60 dark:to-zinc-950 border border-primary/25 dark:border-primary/30 flex items-center justify-between gap-3 shadow-xs">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                            1-Month Subscription
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                                        Chrome Extension • Cancel anytime
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                                            ₹499
                                        </span>
                                        <span className="text-xs text-neutral-500">/mo</span>
                                    </div>
                                    <span className="text-[11px] text-neutral-400 line-through">
                                        ₹999
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                {apiError && (
                                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400">
                                        {apiError}
                                    </div>
                                )}

                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value);
                                                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                                            }}
                                            placeholder="e.g. Rahul Sharma"
                                            className={`w-full pl-10 pr-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 text-neutral-900 dark:text-white outline-none transition-all ${
                                                errors.fullName
                                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-neutral-300 dark:border-zinc-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            }`}
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                                        WhatsApp Mobile Number *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-sm">+91</span>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => {
                                                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                                setPhone(digits);
                                                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                                            }}
                                            placeholder="10-digit phone number"
                                            className={`w-full pl-13 pr-3.5 py-2.5 rounded-md border text-sm font-mono bg-neutral-50/60 dark:bg-zinc-900/50 text-neutral-900 dark:text-white outline-none transition-all ${
                                                errors.phone
                                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-neutral-300 dark:border-zinc-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            }`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                                            }}
                                            placeholder="e.g. rahul@example.com"
                                            className={`w-full pl-10 pr-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 text-neutral-900 dark:text-white outline-none transition-all ${
                                                errors.email
                                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-neutral-300 dark:border-zinc-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            }`}
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Pay Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 h-12 rounded-md font-bold bg-primary hover:bg-primary/90 text-white text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Opening Razorpay Gateway...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4 fill-current" />
                                            <span>Buy Now • ₹499</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
