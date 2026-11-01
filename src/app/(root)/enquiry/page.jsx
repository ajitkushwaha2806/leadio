import EnquirySection from "@/components/pages/home/fragments/enquiry";

export const metadata = {
    title: "Get Onboarded | Submit Details | Leadio",
    description: "Submit your details to launch your Leadio WhatsApp lead automation system in 24 hours.",
};

export default function EnquiryPage() {
    return (
        <main className="min-h-screen pt-24 bg-zinc-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
            <EnquirySection />
        </main>
    );
}
