import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import ChatWidget from "@/components/global/chat-widget";
import EnquiryModal from "@/components/global/enquiry-modal";
import StickyBookNow from "@/components/global/sticky-book-now";
import MetaPixel from "@/components/global/meta-pixel";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leadio | WhatsApp Leads, Straight to Sheets",
  description: "Capture, qualify, and sync WhatsApp leads straight into Google Sheets automatically with Leadio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <EnquiryModal />
        <StickyBookNow />
      </body>
    </html>
  );
}
