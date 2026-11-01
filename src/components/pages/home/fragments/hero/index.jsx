"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Button from "@/components/global/button";
import { PhoneAnimation } from "./phone-animation";
import { Highlighter } from "@/components/ui/highlighter";
import { GridPattern } from "@/components/ui/grid-pattern";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-30 md:pt-32 pb-16 overflow-hidden">
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "absolute inset-0 h-full w-full stroke-gray-300/40 fill-gray-300/40 dark:stroke-gray-800/60 dark:fill-gray-800/60 z-0",
                    "[mask-image:linear-gradient(to_bottom,white,transparent_90%)]",
                )}
            />

            <div className="relative z-10 w-[95%] max-w-6xl mx-auto px-3 grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                            🚀 Introducing Leadio
                        </span>
                    </div>

                    <h1 className="mt-8 pb-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.2] text-gray-900 dark:text-white">
                            WhatsApp <span className="text-primary">Leads</span>, Straight to{" "}
                            <span className="inline-flex -rotate-1 transform transition-transform hover:rotate-0 duration-500 hover:scale-105 cursor-default mt-2 mx-1 align-middle">
                                <Highlighter action="highlight" color="var(--primary)" padding={8}>
                                    <span className="text-white relative z-10 px-3 py-1 rounded-md whitespace-nowrap">
                                      Google Sheets.
                                    </span>
                                </Highlighter>
                            </span>
                        </div>
                    </h1>

                    <p className="mt-8 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                        Stop manually copying and pasting contact info. Leadio&apos;s Chrome extension captures leads directly from WhatsApp Web and saves them into your Google Sheets in just 1 click.
                    </p>

                    <div className="mt-10 flex items-center justify-center lg:justify-start w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <Button
                            text="Buy Now • ₹499"
                            variant="primary"
                            size="lg"
                            onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-modal"))}
                            icon={{ icon: ArrowRight, position: "end" }}
                            className="w-full sm:w-auto font-semibold rounded-md shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex justify-center px-8 text-base whitespace-nowrap cursor-pointer"
                        />
                    </div>
                </div>

                <div className="lg:col-span-6 relative w-full max-w-full min-w-0 flex items-center justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-700 delay-700">
                    <PhoneAnimation />
                </div>
            </div>
        </section>
    );
};