import {
    HelpCircle,
    Zap,
    CheckCircle2,
    FileSpreadsheet,
    Users,
    ClipboardCheck,
    MessageSquare,
    CreditCard,
    RefreshCcw,
    Save,
    ShieldCheck,
    LifeBuoy
} from "lucide-react";

export const FAQS = [
    {
        question: "What is Leadio?",
        answer: (
            <>
                Leadio is a <span className="text-primary font-semibold">Chrome extension</span> that helps you capture leads directly from WhatsApp and save them to your Google Sheets. Instead of manually copying and pasting lead information, your team can submit leads in just a few clicks.
            </>
        ),
        icon: HelpCircle
    },
    {
        question: "How does Leadio work?",
        answer: (
            <>
                Simply install the Leadio Chrome extension, connect your Google account, select your Google Sheet, and start adding leads from WhatsApp. Your submitted leads will be <span className="text-primary font-semibold">saved directly to your connected spreadsheet</span>.
            </>
        ),
        icon: Zap
    },
    {
        question: "Do I need technical knowledge to use Leadio?",
        answer: (
            <>
                <span className="text-primary font-semibold">Not at all!</span> Leadio is designed to be simple and easy to use. If you know how to use WhatsApp and Google Sheets, you can start using Leadio without any technical knowledge.
            </>
        ),
        icon: CheckCircle2
    },
    {
        question: "Can I connect my own Google Sheet?",
        answer: (
            <>
                <span className="text-primary font-semibold">Yes!</span> You can connect your existing Google Sheet to Leadio. Your leads will be saved directly to the spreadsheet you have connected.
            </>
        ),
        icon: FileSpreadsheet
    },
    {
        question: "Do my employees need to connect their own Google Sheets?",
        answer: (
            <>
                Your employees can use the connected workflow to submit leads to your designated Google Sheet, depending on the access and setup you provide. This makes it easier to maintain a <span className="text-primary font-semibold">centralized lead database</span>.
            </>
        ),
        icon: Users
    },
    {
        question: "Do I need to manually copy and paste WhatsApp leads?",
        answer: (
            <>
                <span className="text-primary font-semibold">No!</span> That's exactly what Leadio is built to solve. It simplifies the process of capturing lead information from WhatsApp and submitting it to Google Sheets.
            </>
        ),
        icon: ClipboardCheck
    },
    {
        question: "Is Leadio compatible with WhatsApp Web?",
        answer: (
            <>
                <span className="text-primary font-semibold">Yes!</span> Leadio is designed to work alongside WhatsApp Web through your Chrome browser.
            </>
        ),
        icon: MessageSquare
    },
    {
        question: "How much does Leadio cost?",
        answer: (
            <>
                Leadio costs just <span className="text-primary font-semibold">₹499 per month</span>. You get access to the Chrome extension and its lead-capturing functionality for a simple monthly subscription.
            </>
        ),
        icon: CreditCard
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: (
            <>
                <span className="text-primary font-semibold">Yes!</span> You can cancel your subscription whenever you want. You won't need to continue paying for future billing cycles after cancellation.
            </>
        ),
        icon: RefreshCcw
    },
    {
        question: "Will my leads be saved automatically?",
        answer: (
            <>
                Once you submit a lead through Leadio, it is sent to your connected Google Sheet. You don't need to manually transfer the information. Make sure your Google Sheet connection and permissions are active.
            </>
        ),
        icon: Save
    },
    {
        question: "Is my Google Sheet data safe?",
        answer: (
            <>
                Leadio uses <span className="text-primary font-semibold">Google account authorization</span> to connect to your spreadsheet. Your data is handled according to the permissions you grant. We recommend including a dedicated Privacy Policy explaining exactly what data Leadio accesses, stores, and processes.
            </>
        ),
        icon: ShieldCheck
    },
    {
        question: "What if I face an issue while using Leadio?",
        answer: (
            <>
                If you experience any issues with connecting your Google Sheet or capturing leads, you can <span className="text-primary font-semibold">contact our support team</span> for assistance.
            </>
        ),
        icon: LifeBuoy
    }
];
