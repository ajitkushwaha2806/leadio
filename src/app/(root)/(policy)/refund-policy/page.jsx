import Template from "@/components/global/template";
import { REFUND_POLICY_DATA } from "@/constants/policies";

export const metadata = {
    title: "Refund Policy | Leadio",
    description: "Refund policy for Leadio digital services.",
};

export default function RefundPolicyPage() {
    return (
        <Template
            title="Refund Policy"
            heading="Subscription Refunds"
            description="Clear guidelines on refunds and cancellations for your Leadio account."
            infoData={REFUND_POLICY_DATA.infoData}
            contactData={REFUND_POLICY_DATA.contactData}
            GradText={true}
        />
    );
}
