import Template from "@/components/global/template";

export const metadata = {
    title: "Privacy Policy | Leadio",
    description: "Privacy policy for Leadio data handling and usage.",
};

import { PRIVACY_POLICY_DATA } from "@/constants/policies";

export default function PrivacyPolicyPage() {
    return (
        <Template
            title="Privacy Policy"
            heading="How we handle your data"
            description="Our commitment to protecting your privacy and securing your business data."
            infoData={PRIVACY_POLICY_DATA.infoData}
            contactData={PRIVACY_POLICY_DATA.contactData}
            GradText={true}
        />
    );
}
