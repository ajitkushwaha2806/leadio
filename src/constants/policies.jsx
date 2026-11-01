export const COMPANY_INFO = {
    name: "Leadio",
    emails: {
        support: "support@getrepeat.in",
        legal: "support@getrepeat.in",
        billing: "support@getrepeat.in",
        sales: "support@getrepeat.in",
        partners: "support@getrepeat.in",
        privacy: "support@getrepeat.in"
    }
};

export const SHIPPING_POLICY_DATA = {
    infoData: [
        {
            title: "Digital Access",
            description: "Instant Software Delivery",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            ),
            content: `Our SaaS platform and digital dashboard features are delivered instantly upon successful registration and payment. You will receive an onboarding email with login credentials and setup instructions immediately. There are no shipping fees associated with digital-only plans.`,
        },
        {
            title: "Order Processing Time",
            description: "When we prepare your physical goods",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `All orders containing physical materials (such as custom QR code table tents, NFC tags, or marketing collateral) are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.`,
        },
        {
            title: "Domestic Shipping Rates",
            description: "Costs and delivery estimates",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            ),
            content: `Shipping charges for your physical order will be calculated and displayed at checkout. Standard shipping typically takes 5-7 business days across India. We also offer Expedited shipping (2-3 business days) for an additional fee depending on the delivery region.`,
        },
        {
            title: "International Shipping",
            description: "Deliveries outside India",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `Leadio is a 100% digital SaaS product. Businesses and sales teams globally can subscribe to our Chrome extension and software suite without any geographical restrictions.`,
        },
        {
            title: "Order Tracking",
            description: "Monitor your shipment in real-time",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            ),
            content: `Once your physical materials have shipped, you will receive an email notification from us which will include a tracking number and a link to the courier's website. Please allow 24-48 hours for the tracking information to become active in their system.`,
        },
        {
            title: "Damaged or Lost Packages",
            description: "How we handle transit issues",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            ),
            content: `If you receive your physical materials damaged in transit, please save all packaging materials and damaged goods before filing a claim, and contact us immediately at ${COMPANY_INFO.emails.support}. If your tracking indicates the package is lost, we will send a replacement free of charge.`,
        }
    ],
    contactData: {
        title: "Need help with your shipment?",
        description: "Our support team is here to assist you with any questions regarding physical material delivery.",
        content: (
            <p className="mb-4">
                If your physical materials haven't arrived within the expected timeframe, or if you need to request replacement QR codes, please contact us at{" "}
                <a
                    href={`mailto:${COMPANY_INFO.emails.support}`}
                    className="text-primary hover:text-primary/80 font-medium hover:underline underline-offset-2 transition-colors"
                >
                    {COMPANY_INFO.emails.support}
                </a>
                .
            </p>
        )
    }
};

export const DISCLAIMER_POLICY_DATA = {
    infoData: [
        {
            title: "General Information",
            description: "No Professional Advice",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `All information provided on the ${COMPANY_INFO.name} platform and website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.`,
        },
        {
            title: "Business Results",
            description: "Not a guarantee of income",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ),
            content: `Any business results, lead volume, or sales conversion metrics mentioned on our site are illustrative estimates or past results of specific clients. ${COMPANY_INFO.name} does not guarantee that you will experience the exact same results. Your success depends on your individual effort, outreach strategy, lead quality, and market conditions.`,
        },
        {
            title: "External Links",
            description: "Third-party websites",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            ),
            content: `Through this website, you are able to link to other websites which are not under the control of ${COMPANY_INFO.name}. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.`,
        },
        {
            title: "Platform Availability",
            description: "Service interruptions",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `Every effort is made to keep the ${COMPANY_INFO.name} platform up and running smoothly. However, ${COMPANY_INFO.name} takes no responsibility for, and will not be liable for, the website or services being temporarily unavailable due to technical issues beyond our control or during scheduled maintenance windows.`,
        },
        {
            title: "Limitation of Liability",
            description: "Use at your own risk",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            ),
            content: `In no event will ${COMPANY_INFO.name} be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or our software services.`,
        }
    ],
    contactData: {
        title: "Questions about this disclaimer?",
        description: "If you require any more information or have any questions about our site's disclaimer, please feel free to contact us.",
        content: (
            <p className="mb-4">
                You can reach our legal and support team by emailing us directly at{" "}
                <a
                    href={`mailto:${COMPANY_INFO.emails.legal}`}
                    className="text-primary hover:text-primary/80 font-medium hover:underline underline-offset-2 transition-colors"
                >
                    {COMPANY_INFO.emails.legal}
                </a>
                .
            </p>
        )
    }
};

export const REFUND_POLICY_DATA = {
    infoData: [
        {
            title: "7-Day Satisfaction Guarantee",
            description: "Risk-free trial period",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            ),
            content: `We stand behind our software. If you are not completely satisfied with the ${COMPANY_INFO.name} platform within the first 7 days of your initial subscription, we will issue a full refund—no questions asked. This applies exclusively to your first subscription payment.`,
        },
        {
            title: "Standard Subscription Refunds",
            description: "Ongoing billing cycles",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `After the initial 7-day period, subscription payments are non-refundable. Because our platform is a digital service available immediately upon payment, we do not offer prorated refunds for mid-cycle cancellations on monthly plans. You will retain access until the end of your paid billing cycle.`,
        },
        {
            title: "Annual Plan Refunds",
            description: "Yearly commitments",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            ),
            content: `For users on an annual billing cycle, we may grant prorated refunds on a case-by-case basis if you decide to cancel within the first 30 days of the annual renewal. Processing fees may apply. After 30 days, annual subscriptions become strictly non-refundable.`,
        },
        {
            title: "Late or Missing Refunds",
            description: "Processing timelines",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
            ),
            content: `If your refund has been approved, it typically takes 5-10 business days for the funds to appear on your bank statement. If you haven't received it yet, first check your bank account again, then contact your credit card company, as it may take some time before your refund is officially posted.`,
        },
        {
            title: "Dispute Resolution",
            description: "Contact us first",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            ),
            content: `If you believe there has been a billing error, we kindly ask that you reach out to our support team before initiating a chargeback with your bank. Chargebacks are penalizing to small businesses, and we are committed to resolving legitimate payment issues fairly and quickly.`,
        }
    ],
    contactData: {
        title: "Need to request a refund?",
        description: "Our billing team is ready to help resolve your issue as quickly as possible.",
        content: (
            <div className="mt-4">
                <p className="mb-6">
                    To request a refund review under our 7-Day Guarantee, please email us directly with your account details and order number.
                </p>
                <a
                    href={`mailto:${COMPANY_INFO.emails.billing}`}
                    className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Contact Billing Support
                </a>
            </div>
        )
    }
};

export const RETURN_POLICY_DATA = {
    infoData: [
        {
            title: "Physical Materials & Hardware",
            description: "Custom printed items",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            ),
            content: `Leadio is delivered as a 100% digital software subscription with instant online access. No physical materials or hardware are shipped.`,
        },
        {
            title: "Damaged or Defective Items",
            description: "Free Replacements",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            ),
            content: `If you receive physical items that are damaged, defective, or misprinted due to our error, please contact us within 48 hours of delivery. Include clear photo evidence. We will gladly send a replacement at no additional cost.`,
        },
        {
            title: "Return Process",
            description: "How to send items back",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            ),
            content: `In the rare event that we require a return of the defective items before issuing a replacement, we will provide you with a prepaid shipping label. Do not return any items without receiving authorization from our support team first.`,
        }
    ],
    contactData: {
        title: "Need to replace a damaged item?",
        description: "Our support team is here to sort it out for you.",
        content: (
            <div className="mt-4">
                <p className="mb-6">
                    To initiate a replacement for damaged physical items, please email us directly with a photo of the damage and your order number.
                </p>
                <a
                    href={`mailto:${COMPANY_INFO.emails.support}`}
                    className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Contact Support
                </a>
            </div>
        )
    }
};

export const TERMS_CONDITIONS_DATA = {
    infoData: [
        {
            title: "Acceptance of Terms",
            description: "Agreement to be bound",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            content: `By accessing and using the ${COMPANY_INFO.name} website and SaaS platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.`,
        },
        {
            title: "Use License",
            description: "Permitted usage",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            ),
            content: `Permission is granted to temporarily download one copy of the materials (information or software) on ${COMPANY_INFO.name}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.`,
        },
        {
            title: "User Accounts",
            description: "Account responsibility",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            ),
            content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.`,
        },
        {
            title: "Termination",
            description: "Account suspension",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            ),
            content: `We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination.`,
        },
        {
            title: "Governing Law",
            description: "Jurisdiction",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            ),
            content: `These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
        }
    ],
    contactData: {
        title: "Questions about these Terms?",
        description: "If you have any questions about these Terms and Conditions, please contact us.",
        content: (
            <p className="mb-4">
                You can reach our legal team directly at{" "}
                <a
                    href={`mailto:${COMPANY_INFO.emails.legal}`}
                    className="text-primary hover:text-primary/80 font-medium hover:underline underline-offset-2 transition-colors"
                >
                    {COMPANY_INFO.emails.legal}
                </a>
                . We typically respond to legal inquiries within 48 hours.
            </p>
        )
    }
};

export const PRIVACY_POLICY_DATA = {
    infoData: [
        {
            title: "Data Collection",
            description: "What we collect",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            ),
            content: `We collect information that you provide directly to us when you register for an account, update your profile, or use our services. This includes personal information such as your name, email address, phone number, and business details. We also automatically collect certain information about your device and how you interact with our platform.`,
        },
        {
            title: "Data Usage",
            description: "How we use your information",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            ),
            content: `We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information, and to communicate with you. Your data helps us personalize your experience and provide relevant insights into your lead capture performance.`,
        },
        {
            title: "Data Sharing",
            description: "Third-party disclosure",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            ),
            content: `We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.`,
        },
        {
            title: "Data Security",
            description: "Protecting your information",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            ),
            content: `We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and transmitted via Secure Socket Layer (SSL) technology. We use encryption to protect sensitive information transmitted online and also protect your information offline.`,
        },
        {
            title: "Your Rights",
            description: "Access and control",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            ),
            content: `You have the right to access, update, or delete the personal information we have on you. You can do this directly within your account settings. If you need assistance or wish to exercise any of your data protection rights, please contact our support team.`,
        }
    ],
    contactData: {
        title: "Privacy Inquiries",
        description: "Reach out with any questions about how we handle data.",
        content: (
            <p className="mb-4">
                For any questions or concerns regarding our privacy practices, please email our Data Protection Officer at{" "}
                <a
                    href={`mailto:${COMPANY_INFO.emails.privacy}`}
                    className="text-primary hover:text-primary/80 font-medium hover:underline underline-offset-2 transition-colors"
                >
                    {COMPANY_INFO.emails.privacy}
                </a>
                .
            </p>
        )
    }
};

export const CONTACT_PAGE_DATA = {
    infoData: [
        {
            title: "Customer Support",
            description: "Help with your account or device",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ),
            content: `Experiencing an issue or need help setting up your Leadio Chrome extension and Google Sheets sync? Our support team is available Monday through Friday from 9 AM to 6 PM IST. Email us at ${COMPANY_INFO.emails.support} and we'll get back to you within 24 hours.`,
        },
        {
            title: "Sales Inquiries",
            description: `Interested in ${COMPANY_INFO.name}?`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ),
            content: `Want to learn more about how ${COMPANY_INFO.name} can streamline your WhatsApp lead capture into Google Sheets? Drop our sales team a line at ${COMPANY_INFO.emails.sales} to schedule a free demo.`,
        },
        {
            title: "Partnerships",
            description: "Collaborate with us",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ),
            content: `We're always looking for CRM providers, marketing agencies, and sales software companies to partner with. If you're interested in an integration or partnership, please reach out to ${COMPANY_INFO.emails.partners}.`,
        },
        {
            title: "Office Location",
            description: "Visit us",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ),
            content: `While our team works primarily remotely to support businesses nationwide, our headquarters is located in India. For any physical mail or formal correspondence, please email us first to receive our official mailing address.`,
        }
    ],
    contactData: {
        title: "Ready to get started?",
        description: `Join hundreds of other businesses and sales teams using ${COMPANY_INFO.name} today.`,
        content: (
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a
                    href={`mailto:${COMPANY_INFO.emails.support}`}
                    className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Email Support
                </a>
                <a
                    href={`mailto:${COMPANY_INFO.emails.sales}`}
                    className="inline-flex justify-center items-center px-6 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                    Contact Sales
                </a>
            </div>
        )
    }
};
