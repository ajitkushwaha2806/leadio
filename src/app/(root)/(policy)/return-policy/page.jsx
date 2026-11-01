import Template from "@/components/global/template";
import { RETURN_POLICY_DATA } from "@/constants/policies";

export const metadata = {
    title: "Return Policy | Leadio",
    description: "Return policy for Leadio physical materials and hardware.",
};

export default function ReturnPolicyPage() {
    return (
        <Template
            title="Return Policy"
            heading="Physical Items Returns"
            description="Guidelines on returning custom printed items and requesting replacements for damaged goods."
            infoData={RETURN_POLICY_DATA.infoData}
            contactData={RETURN_POLICY_DATA.contactData}
            GradText={true}
        />
    );
}
