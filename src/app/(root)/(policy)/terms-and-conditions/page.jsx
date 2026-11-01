import Template from "@/components/global/template";

export const metadata = {
    title: "Terms and Conditions | Leadio",
    description: "Terms and conditions for using Leadio.",
};

import { TERMS_CONDITIONS_DATA } from "@/constants/policies";

export default function TermsAndConditionsPage() {
    return (
        <Template
            title="Terms & Conditions"
            heading="Rules of Engagement"
            description="Please read these terms and conditions carefully before using Our Service."
            infoData={TERMS_CONDITIONS_DATA.infoData}
            contactData={TERMS_CONDITIONS_DATA.contactData}
            GradText={true}
        />
    );
}
