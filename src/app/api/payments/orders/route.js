import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";
import { capturePostHogLog } from "@/lib/posthog-logs";
import { connectToDatabase } from "@/lib/mongodb";
import SubscriptionOrder from "@/models/subscription-order.model";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            amount,
            currency,
            receipt,
            fullName,
            restaurantName,
            phone,
            email,
            address,
            pincode,
            city,
            state,
            planId,
            planTitle,
            basePrice,
            addons,
        } = body;

        const order = await backendPaymentService.createOrder(amount, currency, receipt);

        let subscriptionOrderId = null;

        // Save order in MongoDB if customer details are provided
        if (phone || fullName || email || restaurantName) {
            try {
                await connectToDatabase();
                const newSubscriptionOrder = await SubscriptionOrder.create({
                    fullName: fullName || "Valued Customer",
                    restaurantName: restaurantName || "Leadio Member",
                    phone: phone || "",
                    email: email || "",
                    address: {
                        street: typeof address === "string" ? address : address?.street || "Digital Access",
                        city: city || address?.city || "Online",
                        state: state || address?.state || "",
                        pincode: pincode || address?.pincode || "000000",
                        fullText: typeof address === "string" ? address : `${address?.street || "Digital Access"}, ${city || "Online"}`,
                    },
                    planId: planId || "plan_monthly",
                    planTitle: planTitle || "Leadio 1-Month Plan",
                    basePrice: basePrice || 499,
                    standeesIncluded: 0,
                    addons: addons || [],
                    totalAmount: Math.round(Number(amount) / 100),
                    status: "initiated",
                    razorpayOrderId: order.id,
                });
                subscriptionOrderId = newSubscriptionOrder._id;
            } catch (dbErr) {
                console.error("[MongoDB SubscriptionOrder Save Error]:", dbErr);
            }
        }

        await capturePostHogLog("payment_order_created");

        return NextResponse.json({
            ...order,
            subscriptionOrderId,
        }, { status: 200 });
    } catch (error) {
        await capturePostHogLog("payment_order_creation_failed");
        console.error("Razorpay order creation error:", error);
        if (error.message && error.message.includes("Invalid amount")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
