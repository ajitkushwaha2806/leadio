"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";
import {
    Building2,
    Phone,
    Mail,
    FileSpreadsheet,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ShieldCheck,
    Clock,
    Sparkles,
    ArrowRight,
    MessageCircle,
} from "lucide-react";
import { trackLead } from "@/lib/meta-pixel";

export default function EnquirySection() {
    const [formData, setFormData] = useState({
        businessName: "",
        phone: "",
        email: "",
        sheetUrl: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.businessName.trim()) {
            newErrors.businessName = "Business or team name is required.";
        }
        const digits = formData.phone.replace(/\D/g, "");
        if (!formData.phone || digits.length !== 10) {
            newErrors.phone = "Enter a valid 10-digit mobile number.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid work email address.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setApiError("");

        try {
            trackLead({
                content_name: "Leadio Custom Demo Enquiry",
                value: 499,
                currency: "INR",
            });

            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.businessName.trim(),
                    restaurantName: formData.businessName.trim(),
                    phone: formData.phone.replace(/\D/g, ""),
                    email: formData.email.trim().toLowerCase(),
                    plan: "Custom Demo Enquiry",
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Submission failed. Please try again.");
            }

            setIsSubmitted(true);
        } catch (err) {
            setApiError(err.message || "Failed to submit enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            businessName: "",
            phone: "",
            email: "",
            sheetUrl: "",
            notes: "",
        });
        setIsSubmitted(false);
        setErrors({});
        setApiError("");
    };

    return (
        <SectionWrapper
            id="enquire"
            title={
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Sales Consultation</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                        Get Started with{" "}
                        <Highlighter action="highlight" color="var(--primary)" padding={8}>
                            <span className="relative z-10 px-2 text-white">Leadio</span>
                        </Highlighter>
                    </h2>

                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        Need help setting up your team's Google Sheet automation? Submit your details and our team will get your WhatsApp workflow configured in minutes.
                    </p>
                </div>
            }
        >
            <div className="max-w-xl mx-auto px-2 sm:px-0">
                <div className="relative rounded-md border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success-state"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="py-6 text-center max-w-md mx-auto"
                            >
                                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">
                                    Enquiry Received! 🎉
                                </h3>

                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                                    Thank you! We've received details for{" "}
                                    <span className="font-bold text-primary">{formData.businessName}</span>. Our team will contact you on WhatsApp shortly.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <a
                                        href={`https://wa.me/919311507651?text=${encodeURIComponent(
                                            `Hi Leadio Team! I just submitted an enquiry for ${formData.businessName}. Please guide me with setup.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto h-11 px-5 rounded-md bg-[#25D366] hover:bg-[#1fba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                                    >
                                        <MessageCircle className="w-4 h-4 fill-current" />
                                        <span>Message on WhatsApp</span>
                                    </a>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="w-full sm:w-auto h-11 px-5 rounded-md border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-all cursor-pointer"
                                    >
                                        Submit Another Enquiry
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {apiError && (
                                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{apiError}</span>
                                    </div>
                                )}

                                {/* Business / Team Name */}
                                <div>
                                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide mb-1.5">
                                        Business / Team Name <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group">
                                        <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200" />
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="e.g. Apex Sales Team or TechCorp"
                                            className={`w-full h-11 pl-10 pr-3.5 rounded-md border text-xs sm:text-sm bg-neutral-50/60 dark:bg-zinc-900/50 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-all ${
                                                errors.businessName
                                                    ? "border-red-400 bg-red-50/20"
                                                    : "border-neutral-200 dark:border-zinc-800"
                                            }`}
                                        />
                                    </div>
                                    {errors.businessName && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            <span>{errors.businessName}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Phone & Email Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide mb-1.5">
                                            WhatsApp Number <span className="text-primary">*</span>
                                        </label>
                                        <div className="relative flex group">
                                            <span className="inline-flex items-center gap-1 h-11 px-2.5 rounded-l-md border border-r-0 border-neutral-200 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                                <span>+91</span>
                                            </span>
                                            <div className="relative flex-1">
                                                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="10-digit mobile"
                                                    className={`w-full h-11 pl-9 pr-3 rounded-r-md border text-xs sm:text-sm bg-neutral-50/60 dark:bg-zinc-900/50 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-all ${
                                                        errors.phone
                                                            ? "border-red-400 bg-red-50/20"
                                                            : "border-neutral-200 dark:border-zinc-800"
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                <span>{errors.phone}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Work Email */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide mb-1.5">
                                            Work Email <span className="text-primary">*</span>
                                        </label>
                                        <div className="relative group">
                                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="e.g. rahul@company.com"
                                                className={`w-full h-11 pl-10 pr-3.5 rounded-md border text-xs sm:text-sm bg-neutral-50/60 dark:bg-zinc-900/50 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-all ${
                                                    errors.email
                                                        ? "border-red-400 bg-red-50/20"
                                                        : "border-neutral-200 dark:border-zinc-800"
                                                }`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                <span>{errors.email}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Target Sheet URL (Optional) */}
                                <div>
                                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide mb-1.5">
                                        Target Google Sheet URL <span className="text-[11px] font-normal text-neutral-400">(Optional)</span>
                                    </label>
                                    <div className="relative group">
                                        <FileSpreadsheet className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="url"
                                            name="sheetUrl"
                                            value={formData.sheetUrl}
                                            onChange={handleChange}
                                            placeholder="https://docs.google.com/spreadsheets/d/..."
                                            className="w-full h-11 pl-10 pr-3.5 rounded-md border border-neutral-200 dark:border-zinc-800 text-xs sm:text-sm bg-neutral-50/60 dark:bg-zinc-900/50 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button & Trust Badges */}
                                <div className="pt-2 space-y-3">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-white px-5 font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Consultation Request</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-neutral-500">
                                        <span className="flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                            <span>Zero obligation</span>
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-primary" />
                                            <span>Quick 10-min demo</span>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
