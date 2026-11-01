'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowRight, Copy, Check, Home, ShieldCheck, Zap } from 'lucide-react';
import posthog from 'posthog-js';
import { trackPurchase } from '@/lib/meta-pixel';

export default function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const plan = searchParams.get('plan') || 'Leadio 1-Month Plan';
    const amount = searchParams.get('amount') || '499';

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (orderId) {
            trackPurchase({
                order_id: orderId,
                value: amount,
                currency: 'INR',
                content_name: plan,
            });
        }
    }, [orderId, amount, plan]);

    const handleCopy = () => {
        if (!orderId) return;
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const whatsappMessage = encodeURIComponent(
        `Hi Leadio Team! I just purchased the ${plan} (Order ID: ${orderId || 'Direct'}). Please guide me with extension activation.`
    );
    const whatsappLink = `https://wa.me/919311507651?text=${whatsappMessage}`;

    if (!orderId) {
        return (
            <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-md shadow-sm text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-neutral-100 dark:bg-zinc-900 text-neutral-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">No Order Details Found</h2>
                <p className="text-xs text-neutral-500 mb-6">
                    If you completed a payment, please message our support team on WhatsApp with your payment screenshot.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href="https://wa.me/919311507651?text=Hi%20Leadio%20Team!%20Need%20help%20with%20my%20recent%20payment."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-md bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#1fba59] transition-all"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Support on WhatsApp</span>
                    </a>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-md border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-1.5"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-md p-5 sm:p-7 md:p-8 shadow-sm relative overflow-hidden">
            {/* Top Success Banner */}
            <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Payment Verified via Razorpay</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                    Payment Successful!
                </h1>

                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
                    Thank you for choosing Leadio. Your subscription is active and ready to use.
                </p>
            </div>

            {/* Order Summary Card */}
            <div className="p-4 sm:p-5 rounded-md bg-neutral-50/80 dark:bg-zinc-900/50 border border-neutral-200/80 dark:border-zinc-800/80 mb-5 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/60 dark:border-zinc-800 text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-400 text-[10px]">
                        Order Summary
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Instant Access</span>
                    </span>
                </div>

                {/* Plan */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Plan</span>
                    <span className="font-extrabold text-neutral-900 dark:text-white">
                        {plan}
                    </span>
                </div>

                {/* Amount Paid */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Amount Paid</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                            ₹{amount}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">INR</span>
                    </div>
                </div>

                {/* Order ID with Copy Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 pt-2 border-t border-neutral-200/60 dark:border-zinc-800 text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400 shrink-0">Order ID</span>
                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-neutral-200 dark:border-zinc-800 self-start sm:self-auto max-w-full">
                        <span className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300 truncate">
                            {orderId}
                        </span>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="p-1 hover:text-primary transition-colors text-neutral-400 cursor-pointer"
                            title="Copy Order ID"
                        >
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Next Steps & CTA */}
            <div className="space-y-3.5 text-center">
                <div className="p-3 rounded-md bg-primary/[0.06] border border-primary/20 text-left">
                    <div className="flex items-center gap-2 mb-1 text-primary font-bold text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Next Step: Onboarding & Setup</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        Message our WhatsApp support team to receive your Chrome extension install link and Google Sheets sync guide.
                    </p>
                </div>

                {/* Primary CTA */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture('onboarding_whatsapp_opened')}
                    className="w-full h-12 rounded-md bg-[#25D366] hover:bg-[#1fba59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Contact Support on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                </a>

                {/* Secondary Actions */}
                <div className="flex items-center justify-center gap-4 pt-1">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Return to Home</span>
                    </Link>
                </div>

                <p className="text-[11px] text-neutral-400 pt-1">
                    Need instant help? Call or WhatsApp us at <span className="font-semibold text-neutral-600 dark:text-neutral-300">+91 9311507651</span>
                </p>
            </div>
        </div>
    );
}
