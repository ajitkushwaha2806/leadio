"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";
import Button from "@/components/global/button";
import { navLinks, navMobileLinks } from "./helper/constants";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => isOpen && setIsOpen(false);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    return (
        <header className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-3 rounded-md backdrop-blur-md bg-white/70 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between py-2 sm:py-2.5">
                <Link href="/" className="group flex items-center gap-2.5">
                    <Image
                        src="/assets/logo/leadio-header-logo.png"
                        alt="Leadio - WhatsApp Leads, Straight to Sheets"
                        width={150}
                        height={60}
                        className="w-32 sm:w-36 md:w-40 h-auto rounded-md shadow-xs object-cover"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks?.map((link, i) => (
                        <div
                            key={i}
                            className="animate-in fade-in slide-in-from-top-2 duration-500 fill-mode-both"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <Link
                                href={link.href}
                                className="relative text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors group"
                            >
                                {link.title}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <AnimatedThemeToggler className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none" />
                        <GetStartedButton />
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <AnimatedThemeToggler className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 dark:text-white p-1 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="md:hidden px-4 pb-4 pt-1 space-y-2 border-t border-gray-200 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    {navMobileLinks?.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className="block text-gray-800 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-700 text-sm font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.title}
                        </Link>
                    ))}
                    <GetStartedButton />
                </div>
            )}
        </header>
    );
}


export const GetStartedButton = () => {
    return (
        <Button
            text="Buy Now • ₹499"
            variant="primary"
            onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-modal"))}
            size="sm"
            icon={{ icon: Rocket, position: "start" }}
            className="rounded-md font-bold cursor-pointer"
        />
    );
};