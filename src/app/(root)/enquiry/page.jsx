import EnquirySection from "@/components/pages/home/fragments/enquiry";

export const metadata = {
    title: "Schedule Consultation | Leadio",
    description: "Submit your details to get a personalized demo of Leadio WhatsApp to Google Sheets automation.",
};

export default function EnquiryPage() {
    return (
        <main className="min-h-screen pt-24 bg-zinc-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
            <EnquirySection />
        </main>
    );
}
