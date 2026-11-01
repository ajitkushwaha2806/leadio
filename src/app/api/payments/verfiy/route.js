import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";
import { capturePostHogLog } from "@/lib/posthog-logs";
import { connectToDatabase } from "@/lib/mongodb";
import SubscriptionOrder from "@/models/subscription-order.model";

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const isValid = backendPaymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            try {
                await connectToDatabase();
                await SubscriptionOrder.findOneAndUpdate(
                    { razorpayOrderId: razorpay_order_id },
                    { status: "failed", errorMessage: "Invalid signature" }
                );
            } catch (dbErr) {
                console.error("[MongoDB SubscriptionOrder Update Failed]:", dbErr);
            }

            await capturePostHogLog("payment_signature_rejected");
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }

        try {
            await connectToDatabase();
            await SubscriptionOrder.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: "paid",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                }
            );
        } catch (dbErr) {
            console.error("[MongoDB SubscriptionOrder Update Success]:", dbErr);
        }

        await capturePostHogLog("payment_signature_verified");
        return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    } catch (error) {
        await capturePostHogLog("payment_verification_failed");
        console.error("Payment verification error:", error);
        if (error.message && error.message.includes("Missing required fields")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
