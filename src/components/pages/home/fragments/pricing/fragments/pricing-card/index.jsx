"use client";
import { useState } from "react";
import Script from "next/script";
import posthog from "posthog-js";
import { motion } from "framer-motion";
import Button from "@/components/global/button";
import { Check, Sparkles, ShieldCheck, ArrowRight, Zap } from "lucide-react";

function PriceBlock({ price, originalPrice, priceUnit }) {
    return (
        <div className="p-5 sm:p-6 rounded-md bg-gradient-to-br from-primary/[0.07] via-neutral-50/70 to-transparent dark:from-primary/10 dark:via-neutral-900/60 dark:to-neutral-950 border border-primary/20 dark:border-primary/30 mb-6 text-center sm:text-left shadow-xs transition-all">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-3 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>50% Launch Discount</span>
                <span className="opacity-40">•</span>
                <span className="line-through font-normal text-neutral-400">₹{originalPrice || 999}</span>
            </div>

            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                <span className="text-5xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight">
                    ₹{price}
                </span>
                <span className="text-lg font-bold text-neutral-500 dark:text-neutral-400">
                    /{priceUnit || "month"}
                </span>
            </div>

            <p className="mt-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span>Billed monthly</span>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Cancel anytime</span>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span>Zero lock-in</span>
            </p>
        </div>
    );
}

export default function PricingCard({ plan, index }) {
    const { _id, title, description, price, originalPrice, priceUnit, billingCycle, badge, features } = plan;
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const finalPrice = plan.totalPrice || price;

    const checkoutProperties = {
        plan_id: _id,
        billing_cycle: billingCycle,
        amount: finalPrice,
    };

    const onGetStarted = () => {
        posthog.capture("subscription_checkout_opened", checkoutProperties);
        window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="relative w-full max-w-lg lg:max-w-none mx-auto rounded-md p-6 sm:p-8 lg:p-10 bg-white dark:bg-neutral-900 border-2 border-primary shadow-2xl shadow-primary/10 transition-all duration-300"
            >
                {badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0">
                        <span className="px-3.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-md bg-primary inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Sparkles className="w-3.5 h-3.5" />
                            {badge}
                        </span>
                    </div>
                )}

                {/* ===================== MOBILE VIEW ===================== */}
                <div className="block lg:hidden">
                    {/* Header: Title & Description */}
                    <div className="mb-5 text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                            {title}
                        </h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Redesigned Price Block */}
                    <PriceBlock price={price} originalPrice={originalPrice} priceUnit={priceUnit} />

                    {/* Features List */}
                    <div className="mb-6">
                        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-3">
                            Everything included in your subscription:
                        </p>
                        <div className="space-y-2.5">
                            {(showAllFeatures ? features : features.slice(0, 5)).map((feature, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                                    <div className="mt-0.5 rounded-md p-1 bg-primary/10 text-primary flex-shrink-0">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>
                        {features.length > 5 && (
                            <button
                                type="button"
                                onClick={() => setShowAllFeatures(!showAllFeatures)}
                                className="mt-3 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                                {showAllFeatures ? "View less" : `View ${features.length - 5} more features`}
                            </button>
                        )}
                    </div>

                    {/* CTA & Trust */}
                    <div className="pt-2">
                        <Button
                            onClick={onGetStarted}
                            text={
                                <span className="flex items-center justify-center gap-2 text-base font-bold">
                                    <span>Buy Now</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                                    <span>₹{finalPrice} / month</span>
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            }
                            className="w-full py-4 rounded-md font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl cursor-pointer"
                        />
                        <div className="mt-3 flex items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Secure Razorpay</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-primary" />
                                <span>Instant Activation</span>
                            </span>
                            <span>•</span>
                            <span>Cancel Anytime</span>
                        </div>
                    </div>
                </div>

                {/* ===================== DESKTOP VIEW (Horizontal 2-Column Card) ===================== */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                    {/* Left Column: Plan, Price, & CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between border-r border-neutral-100 dark:border-neutral-800 pr-8">
                        <div>
                            <div className="mb-4">
                                <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {/* Redesigned Price Block */}
                            <PriceBlock price={price} originalPrice={originalPrice} priceUnit={priceUnit} />
                        </div>

                        {/* CTA & Trust */}
                        <div className="pt-4">
                            <Button
                                onClick={onGetStarted}
                                text={
                                    <span className="flex items-center justify-center gap-2 text-base font-bold">
                                        <span>Buy Now</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                                        <span>₹{finalPrice} /month</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                }
                                className="w-full py-4 rounded-md font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl cursor-pointer"
                            />
                            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Secure Razorpay</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Zap className="w-3.5 h-3.5 text-primary" />
                                    <span>Instant Activation</span>
                                </span>
                                <span>•</span>
                                <span>Cancel Anytime</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Everything Included */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                            {/* Section Header */}
                            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                                Everything included in your 1-Month Subscription:
                            </h4>

                            {/* 2-Column Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {features.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2.5 p-3.5 rounded-md bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800/80"
                                    >
                                        <div className="mt-0.5 rounded-md p-1 bg-primary/10 text-primary flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        <span className="text-neutral-800 dark:text-neutral-200 text-xs sm:text-[13px] font-medium leading-snug">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Trust Bar */}
                        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" />
                                <span>Immediate access after checkout</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                                <Check className="w-4 h-4" />
                                <span>Cancel anytime • No lock-in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
