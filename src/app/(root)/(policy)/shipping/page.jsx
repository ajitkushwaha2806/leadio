import Template from "@/components/global/template";

export const metadata = {
    title: "Shipping Policy | Leadio",
    description: "Shipping and delivery policy for Leadio physical materials.",
};

import { SHIPPING_POLICY_DATA } from "@/constants/policies";

export default function ShippingPolicyPage() {
    return (
        <Template
            title="Shipping Policy"
            heading="Delivery & Shipping Information"
            description="Details regarding the delivery of digital services and physical materials for your business."
            infoData={SHIPPING_POLICY_DATA.infoData}
            contactData={SHIPPING_POLICY_DATA.contactData}
            GradText={true}
        />
    );
}
