import Template from "@/components/global/template";

export const metadata = {
    title: "Contact Us | Leadio",
    description: "Get in touch with the Leadio team for support, sales, or partnerships.",
};

import { CONTACT_PAGE_DATA } from "@/constants/policies";

export default function ContactPage() {
    return (
        <Template
            title="Contact Us"
            heading="We'd love to hear from you"
            description="Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions."
            infoData={CONTACT_PAGE_DATA.infoData}
            contactData={CONTACT_PAGE_DATA.contactData}
        />
    );
}
