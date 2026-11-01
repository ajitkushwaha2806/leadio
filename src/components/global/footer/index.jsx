"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_LINKS, FOOTER_ANIMATION } from "./helpers/constant"

const WEBSITE_NAME =
    process.env.NEXT_PUBLIC_BUSINESS_NAME;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            {...FOOTER_ANIMATION}
            className="w-full bg-gray-50 border-t border-gray-200 dark:border-gray-800 py-6 text-sm text-gray-600 dark:text-gray-400"
        >
            <div className="mx-auto w-[95%] max-w-6xl px-3 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-left">
                    © {currentYear} {WEBSITE_NAME}. All rights reserved.
                </p>

                <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
                    {FOOTER_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-black dark:hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.footer>
    );
}