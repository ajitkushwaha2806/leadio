"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import InfoCardGrid from "../info-card";
import Button from "@/components/global/button";
import { Highlighter } from "@/components/ui/highlighter";
import ContactCard from "@/components/global/contact-card";
import SectionWrapper from "@/components/global/section-wrapper";

const Template = ({ title = "", heading = "", description = "", ctaDescription = "", ctaLink = "#", ctaButton = "", infoData = [], contactData, GradText = true }) => {
    const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${ctaLink || ""}`;

    return (
        <>
            <Head>
                <title>{heading ? `${heading} | Leadio` : "Leadio"}</title>
                <meta name="description" content={description || "Leadio - WhatsApp Leads, Straight to Sheets."} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:title" content={heading || "Leadio"} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || ""}/assets/logo/logo.png`} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            name: typeof heading === "string" ? heading : "Leadio",
                            url: pageUrl,
                            description: typeof description === "string" ? description : "",
                            inLanguage: "en",
                        }),
                    }}
                />
            </Head>

            <main className="min-h-screen pt-24 bg-zinc-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
                <SectionWrapper
                    title={
                        <>
                            {title && (
                                <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-800 text-white tracking-tight text-center">
                                    <Highlighter action="highlight" color="var(--primary)">
                                        <span className="relative z-10 px-2">{title}</span>
                                    </Highlighter>
                                </h1>
                            )}
                            {description && (
                                <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-medium text-center">
                                    {description}
                                </p>
                            )}
                        </>
                    }
                >

                    {ctaDescription && ctaButton && ctaLink && (
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-16 w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-8 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70 transition-colors">
                            <div className="flex flex-col items-center md:flex-row justify-between gap-6">
                                <div className="md:w-2/3">
                                    <p className="text-neutral-700 dark:text-neutral-300 text-md leading-relaxed">{ctaDescription}</p>
                                </div>

                                <div className="md:w-1/3 w-full flex justify-end">
                                    <Button
                                        text={ctaButton}
                                        href={ctaLink}
                                        variant="primary"
                                        className="w-full md:w-auto font-semibold shadow-md shadow-primary/20"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {infoData && infoData.length > 0 && (
                        <div className="mt-16">
                            <InfoCardGrid cardData={infoData} />
                        </div>
                    )}

                    {contactData && (
                        <div className="mt-16 w-full">
                            <ContactCard contactData={contactData} />
                        </div>
                    )}
                </SectionWrapper>
            </main>
        </>
    );
};

export default Template;