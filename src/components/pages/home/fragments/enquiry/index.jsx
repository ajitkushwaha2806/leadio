"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";
import { Store, Phone, Mail, FileText, Image as ImageIcon, CheckCircle2, AlertCircle, X, Loader2, Sparkles, Link2, ShieldCheck, Clock, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { trackLead } from "@/lib/meta-pixel";

const DRAFT_STORAGE_KEY = "leadio_enquiry_draft";

export default function EnquirySection() {
    const [step, setStep] = useState(1);
    const [enquiryId, setEnquiryId] = useState(null);

    const [formData, setFormData] = useState({
        restaurantName: "",
        phone: "",
        email: "",
        menuLink: "",
    });

    const [menuMode, setMenuMode] = useState("file");
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [menuFiles, setMenuFiles] = useState([]);

    const [isDraggingLogo, setIsDraggingLogo] = useState(false);
    const [isDraggingMenu, setIsDraggingMenu] = useState(false);

    const [errors, setErrors] = useState({});
    const [isSavingStep1, setIsSavingStep1] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [apiError, setApiError] = useState("");

    const logoInputRef = useRef(null);
    const menuInputRef = useRef(null);

    useEffect(() => {
        try {
            const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
            if (savedDraft) {
                const parsed = JSON.parse(savedDraft);
                if (parsed.formData) {
                    setFormData((prev) => ({ ...prev, ...parsed.formData }));
                }
                if (parsed.enquiryId) {
                    setEnquiryId(parsed.enquiryId);
                }
                if (parsed.step === 2 && parsed.enquiryId) {
                    setStep(2);
                }
            }
        } catch (e) {
            console.warn("Failed to load draft from localStorage:", e);
        }
    }, []);

    useEffect(() => {
        try {
            if (!isSubmitted) {
                const hasData = formData.restaurantName || formData.phone || formData.email || formData.menuLink || enquiryId;
                if (hasData) {
                    localStorage.setItem(
                        DRAFT_STORAGE_KEY,
                        JSON.stringify({ formData, step, enquiryId })
                    );
                }
            }
        } catch (e) {
            // Ignore quota errors
        }
    }, [formData, step, enquiryId, isSubmitted]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleLogoSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, logo: "Please select an image file (PNG, JPG, SVG, WEBP)." }));
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, logo: "Logo must be under 10MB." }));
            return;
        }

        setLogoFile(file);
        setErrors((prev) => ({ ...prev, logo: "" }));
        const previewUrl = URL.createObjectURL(file);
        setLogoPreview(previewUrl);
    };

    const removeLogo = () => {
        setLogoFile(null);
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoPreview(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
    };

    const handleMenuSelect = (newFiles) => {
        if (!newFiles || newFiles.length === 0) return;
        const validFiles = [];
        const errs = [];

        Array.from(newFiles).forEach((file) => {
            if (file.size > 25 * 1024 * 1024) {
                errs.push(`${file.name} is larger than 25MB.`);
            } else {
                validFiles.push(file);
            }
        });

        if (errs.length > 0) {
            setErrors((prev) => ({ ...prev, menu: errs.join(" ") }));
        } else {
            setErrors((prev) => ({ ...prev, menu: "" }));
        }

        if (validFiles.length > 0) {
            setMenuFiles((prev) => [...prev, ...validFiles]);
        }
    };

    const removeMenuFile = (index) => {
        setMenuFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.restaurantName.trim()) {
            newErrors.restaurantName = "Restaurant name is required.";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone / WhatsApp number is required.";
        } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
            newErrors.phone = "Please enter a valid 10-digit phone number.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStep1Proceed = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validateStep1()) {
            return;
        }

        setIsSavingStep1(true);

        try {
            const payload = new FormData();
            payload.append("restaurantName", formData.restaurantName.trim());
            payload.append("phone", formData.phone.trim());
            payload.append("email", formData.email.trim());

            const response = await fetch("/api/enquiry", {
                method: "POST",
                body: payload,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to save details. Please check connection.");
            }

            if (result.enquiryId) {
                trackLead({
                    content_name: "Leadio Enquiry",
                    value: 499,
                    currency: "INR",
                });
                setEnquiryId(result.enquiryId);
                try {
                    localStorage.setItem(
                        DRAFT_STORAGE_KEY,
                        JSON.stringify({ formData, step: 2, enquiryId: result.enquiryId })
                    );
                } catch (e) { }
            }

            setStep(2);
        } catch (err) {
            setApiError(err.message || "Failed to save details. Please try again.");
        } finally {
            setIsSavingStep1(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        if (menuMode === "link" && formData.menuLink && !formData.menuLink.startsWith("http")) {
            setErrors((prev) => ({ ...prev, menuLink: "Please enter a valid URL starting with https://" }));
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = new FormData();
            if (enquiryId) {
                payload.append("enquiryId", enquiryId);
            }
            payload.append("restaurantName", formData.restaurantName.trim());
            payload.append("phone", formData.phone.trim());
            payload.append("email", formData.email.trim());

            if (menuMode === "link" && formData.menuLink) {
                payload.append("menuLink", formData.menuLink.trim());
            }

            if (menuFiles.length > 0) {
                menuFiles.forEach((file) => {
                    payload.append("menus", file);
                });
            }

            if (logoFile) {
                payload.append("logo", logoFile);
            }

            const response = await fetch("/api/enquiry", {
                method: "POST",
                body: payload,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Submission failed. Please try again.");
            }

            try {
                localStorage.removeItem(DRAFT_STORAGE_KEY);
            } catch (e) { }

            setSubmittedData({
                restaurantName: formData.restaurantName,
                phone: formData.phone,
                menuCount: menuFiles.length,
                hasMenuLink: Boolean(formData.menuLink),
                hasLogo: Boolean(logoFile),
            });
            setIsSubmitted(true);
        } catch (err) {
            setApiError(err.message || "An unexpected error occurred. Please contact us on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        try {
            localStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch (e) { }
        setFormData({
            restaurantName: "",
            phone: "",
            email: "",
            menuLink: "",
        });
        removeLogo();
        setMenuFiles([]);
        setEnquiryId(null);
        setErrors({});
        setApiError("");
        setStep(1);
        setIsSubmitted(false);
        setSubmittedData(null);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 KB";
        const k = 1024;
        const dm = 1;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    return (
        <SectionWrapper
            id="enquire"
            title={
                <>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">
                        Launch on{" "}
                        <Highlighter action="highlight" color="var(--primary)" padding={8}>
                            <span className="relative z-10 px-2 text-white">Leadio</span>
                        </Highlighter>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        Share your menu & logo. Our team configures your QR ordering system, tests your items, and sends a live WhatsApp preview within 24 hours.
                    </p>
                </>
            }
        >
            <div className="max-w-2xl mx-auto px-2 sm:px-0">
                <div className="relative rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-6 sm:p-9 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
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
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
                                    Enquiry Received! 🎉
                                </h3>

                                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                                    We’ve received your details for{" "}
                                    <span className="font-bold text-primary">{submittedData?.restaurantName}</span>.
                                    {submittedData?.menuCount > 0 && ` Successfully attached ${submittedData.menuCount} menu file(s).`}
                                    {submittedData?.hasLogo && " Logo attached."}
                                </p>

                                <div className="p-4 rounded-md bg-neutral-50/80 dark:bg-zinc-900/80 border border-neutral-200/80 dark:border-zinc-800/80 text-xs text-neutral-600 dark:text-neutral-300 mb-6 space-y-2 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-neutral-500 dark:text-neutral-400">Demo sent to:</span>
                                        <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-emerald-500" />
                                            +91 {submittedData?.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-neutral-500 dark:text-neutral-400">Turnaround:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            Under 24 Hours
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <a
                                        href={`https://wa.me/919311507651?text=${encodeURIComponent(
                                            `Hi Leadio team, I just submitted an onboarding enquiry for ${submittedData?.restaurantName || "my business"}. Could you please share updates?`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-[#25D366] hover:bg-[#1fba59] active:scale-[0.99] text-white font-bold text-xs transition-all shadow-md shadow-[#25D366]/25"
                                    >
                                        <Phone className="w-4 h-4 fill-current" />
                                        <span>Chat with us on WhatsApp</span>
                                    </a>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="h-12 px-5 rounded-md border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-all cursor-pointer"
                                    >
                                        Submit Another Restaurant
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="relative z-10">
                                {apiError && (
                                    <div className="p-3.5 mb-5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-center gap-2.5 text-red-600 dark:text-red-400 text-xs">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{apiError}</span>
                                    </div>
                                )}

                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="step-1"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-4 sm:space-y-5"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                                                        Restaurant Name <span className="text-primary">*</span>
                                                    </label>
                                                </div>
                                                <div className="relative group">
                                                    <Store className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200" />
                                                    <input
                                                        type="text"
                                                        name="restaurantName"
                                                        value={formData.restaurantName}
                                                        onChange={handleChange}
                                                        placeholder="Copper Chimney Bistro"
                                                        className={`w-full h-12 pl-10 pr-3.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400/80 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${errors.restaurantName
                                                            ? "border-red-400 dark:border-red-500 bg-red-50/20 focus:ring-red-500/10"
                                                            : "border-neutral-200 dark:border-zinc-800"
                                                            }`}
                                                    />
                                                </div>
                                                {errors.restaurantName && (
                                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        <span>{errors.restaurantName}</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Phone & Email Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                                {/* Phone Number */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                                                            WhatsApp / Phone <span className="text-primary">*</span>
                                                        </label>
                                                    </div>
                                                    <div className="relative flex group">
                                                        <span className="inline-flex items-center gap-1.5 h-12 px-3 rounded-md border border-r-0 border-neutral-200 dark:border-zinc-800 bg-neutral-100/80 dark:bg-zinc-900/80 text-sm font-semibold text-neutral-700 dark:text-neutral-300 select-none">
                                                            <span className="text-sm">🇮🇳</span>
                                                            <span>+91</span>
                                                        </span>
                                                        <div className="relative flex-1">
                                                            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200" />
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="98765 43210"
                                                                className={`w-full h-12 pl-10 pr-3.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400/80 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${errors.phone
                                                                    ? "border-red-400 dark:border-red-500 bg-red-50/20 focus:ring-red-500/10"
                                                                    : "border-neutral-200 dark:border-zinc-800"
                                                                    }`}
                                                            />
                                                        </div>
                                                    </div>
                                                    {errors.phone && (
                                                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                            <span>{errors.phone}</span>
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Work Email */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                                                            Work Email <span className="text-primary">*</span>
                                                        </label>
                                                        <span className="text-[11px] text-neutral-400">For dashboard access</span>
                                                    </div>
                                                    <div className="relative group">
                                                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="owner@restaurant.in"
                                                            className={`w-full h-12 pl-10 pr-3.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400/80 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${errors.email
                                                                ? "border-red-400 dark:border-red-500 bg-red-50/20 focus:ring-red-500/10"
                                                                : "border-neutral-200 dark:border-zinc-800"
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.email && (
                                                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                            <span>{errors.email}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Step 1 Proceed Button & Micro-Trust Badges */}
                                            <div className="pt-2 space-y-3.5">
                                                <button
                                                    type="button"
                                                    onClick={handleStep1Proceed}
                                                    disabled={isSavingStep1}
                                                    className="w-full h-12 sm:h-13 rounded-md bg-gradient-to-r from-primary via-[#ff7860] to-[#f2715b] hover:brightness-105 active:scale-[0.99] text-white px-5 font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 group cursor-pointer"
                                                >
                                                    {isSavingStep1 ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span>Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Book Demo</span>
                                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                                        </>
                                                    )}
                                                </button>

                                                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                                                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                        <span className="truncate">100% Free Setup</span>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                                                        <span className="truncate">Ready in 24h</span>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                                        <span className="truncate">WhatsApp Demo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="step-2"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-4 sm:space-y-5"
                                        >
                                            {/* Logo Upload Box */}
                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                                                        Restaurant Logo <span className="text-[11px] font-normal text-neutral-400">(Optional)</span>
                                                    </label>
                                                    <span className="text-[11px] text-neutral-400">PNG, JPG, SVG • Max 10MB</span>
                                                </div>

                                                <input
                                                    ref={logoInputRef}
                                                    type="file"
                                                    accept="image/*,.svg"
                                                    className="hidden"
                                                    onChange={(e) => handleLogoSelect(e.target.files?.[0])}
                                                />

                                                {logoFile && logoPreview ? (
                                                    <div className="relative p-3 rounded-md border border-neutral-200 dark:border-zinc-800 bg-neutral-50/80 dark:bg-zinc-900/80 flex items-center gap-3.5 shadow-xs">
                                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 shrink-0 flex items-center justify-center p-1 shadow-xs">
                                                            <img
                                                                src={logoPreview}
                                                                alt="Logo preview"
                                                                className="max-w-full max-h-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-semibold text-neutral-800 dark:text-white truncate">
                                                                {logoFile.name}
                                                            </p>
                                                            <p className="text-[11px] text-neutral-400 mt-0.5">
                                                                {formatFileSize(logoFile.size)} • Ready to upload
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={removeLogo}
                                                            className="p-1.5 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                                                            title="Remove logo"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onDragOver={(e) => {
                                                            e.preventDefault();
                                                            setIsDraggingLogo(true);
                                                        }}
                                                        onDragLeave={() => setIsDraggingLogo(false)}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            setIsDraggingLogo(false);
                                                            handleLogoSelect(e.dataTransfer.files?.[0]);
                                                        }}
                                                        onClick={() => logoInputRef.current?.click()}
                                                        className={`group cursor-pointer rounded-md border-2 border-dashed p-4 text-center transition-all duration-200 ${isDraggingLogo
                                                            ? "border-primary bg-primary/10 scale-[0.99]"
                                                            : "border-neutral-300/80 dark:border-zinc-700 hover:border-primary bg-neutral-50/60 dark:bg-zinc-900/40 hover:bg-primary/5"
                                                            }`}
                                                    >
                                                        <div className="w-9 h-9 mx-auto rounded-md bg-primary/10 text-primary flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                                            <ImageIcon className="w-4 h-4" />
                                                        </div>
                                                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                                            Click or drag restaurant logo here
                                                        </p>
                                                        <p className="text-[11px] text-neutral-400 mt-0.5">
                                                            Transparent PNG or JPG looks best on QR menus
                                                        </p>
                                                    </div>
                                                )}
                                                {errors.logo && (
                                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        <span>{errors.logo}</span>
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                                                        Restaurant Menu <span className="text-primary">*</span>
                                                    </label>
                                                    <div className="inline-flex p-0.5 rounded-md bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/60 dark:border-zinc-800/60">
                                                        <button
                                                            type="button"
                                                            onClick={() => setMenuMode("file")}
                                                            className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${menuMode === "file"
                                                                ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-xs"
                                                                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                                                }`}
                                                        >
                                                            Upload Files
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setMenuMode("link")}
                                                            className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${menuMode === "link"
                                                                ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-xs"
                                                                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                                                }`}
                                                        >
                                                            Share Link
                                                        </button>
                                                    </div>
                                                </div>

                                                {menuMode === "file" ? (
                                                    <>
                                                        <input
                                                            ref={menuInputRef}
                                                            type="file"
                                                            multiple
                                                            accept=".pdf,image/*,.docx,.xlsx"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                handleMenuSelect(e.target.files);
                                                                if (menuInputRef.current) menuInputRef.current.value = "";
                                                            }}
                                                        />

                                                        {menuFiles.length > 0 && (
                                                            <div className="space-y-1.5 mb-2.5 max-h-40 overflow-y-auto pr-1">
                                                                {menuFiles.map((file, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="p-2.5 rounded-md border border-neutral-200 dark:border-zinc-800 bg-neutral-50/80 dark:bg-zinc-900/80 flex items-center justify-between gap-2.5 text-xs shadow-xs"
                                                                    >
                                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                                            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                                                <FileText className="w-3.5 h-3.5" />
                                                                            </div>
                                                                            <div className="min-w-0">
                                                                                <p className="truncate font-semibold text-neutral-800 dark:text-neutral-200">
                                                                                    {file.name}
                                                                                </p>
                                                                                <p className="text-[10px] text-neutral-400">
                                                                                    {formatFileSize(file.size)}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeMenuFile(idx)}
                                                                            className="text-neutral-400 hover:text-red-500 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                                                        >
                                                                            <X className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div
                                                            onDragOver={(e) => {
                                                                e.preventDefault();
                                                                setIsDraggingMenu(true);
                                                            }}
                                                            onDragLeave={() => setIsDraggingMenu(false)}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                setIsDraggingMenu(false);
                                                                handleMenuSelect(e.dataTransfer.files);
                                                            }}
                                                            onClick={() => menuInputRef.current?.click()}
                                                            className={`group cursor-pointer rounded-md border-2 border-dashed p-4 text-center transition-all duration-200 ${isDraggingMenu
                                                                ? "border-primary bg-primary/10 scale-[0.99]"
                                                                : "border-neutral-300/80 dark:border-zinc-700 hover:border-primary bg-neutral-50/60 dark:bg-zinc-900/40 hover:bg-primary/5"
                                                                }`}
                                                        >
                                                            <div className="w-9 h-9 mx-auto rounded-md bg-primary/10 text-primary flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                                                <Plus className="w-4 h-4" />
                                                            </div>
                                                            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                                                {menuFiles.length > 0 ? "Add more menu photos / pages" : "Upload Menu Images or PDF"}
                                                            </p>
                                                            <p className="text-[11px] text-neutral-400 mt-0.5">
                                                                Multiple photos, PDF, or spreadsheet accepted (up to 25MB each)
                                                            </p>
                                                        </div>

                                                        {errors.menu && (
                                                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3.5 h-3.5" />
                                                                <span>{errors.menu}</span>
                                                            </p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div>
                                                        <div className="relative group">
                                                            <Link2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200" />
                                                            <input
                                                                type="url"
                                                                name="menuLink"
                                                                value={formData.menuLink}
                                                                onChange={handleChange}
                                                                placeholder="https://drive.google.com/... or Zomato / Swiggy link"
                                                                className={`w-full h-12 pl-10 pr-3.5 rounded-md border text-sm bg-neutral-50/60 dark:bg-zinc-900/50 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 focus:bg-white dark:focus:bg-zinc-900 text-neutral-900 dark:text-white placeholder:text-neutral-400/80 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${errors.menuLink
                                                                    ? "border-red-400 dark:border-red-500 bg-red-50/20 focus:ring-red-500/10"
                                                                    : "border-neutral-200 dark:border-zinc-800"
                                                                    }`}
                                                            />
                                                        </div>
                                                        {errors.menuLink && (
                                                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3.5 h-3.5" />
                                                                <span>{errors.menuLink}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2.5 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    disabled={isSubmitting}
                                                    className="h-12 px-5 rounded-md border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-700 text-neutral-700 dark:text-neutral-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                                >
                                                    <ArrowLeft className="w-3.5 h-3.5" />
                                                    <span>Back</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="flex-1 h-12 rounded-md bg-gradient-to-r from-primary via-[#ff7860] to-[#f2715b] hover:brightness-105 active:scale-[0.99] text-white px-5 font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 group cursor-pointer"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span>Submitting...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Sparkles className="w-4 h-4" />
                                                            <span>Book Demo</span>
                                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-center gap-1 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400 text-center flex-wrap">
                                                <span>By submitting, you agree to our</span>
                                                <Link
                                                    href="/privacy-policy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline hover:text-primary transition-colors font-medium"
                                                >
                                                    Privacy Policy
                                                </Link>
                                                <span>&</span>
                                                <Link
                                                    href="/terms-and-conditions"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline hover:text-primary transition-colors font-medium"
                                                >
                                                    Terms & Conditions
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
