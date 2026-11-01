import crypto from "crypto";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const backendPaymentService = {
    createOrder: async (amount, currency = "INR", receipt) => {
        if (!amount || amount < 100) {
            throw new Error("Invalid amount. Minimum amount is 100 paise.");
        }

        const options = {
            amount: amount.toString(),
            currency,
            receipt: receipt || "receipt_" + Math.random().toString(36).substring(7),
        };

        return await razorpay.orders.create(options);
    },

    verifySignature: (orderId, paymentId, signature) => {
        if (!orderId || !paymentId || !signature) {
            throw new Error("Missing required fields for signature verification.");
        }

        const text = orderId + "|" + paymentId;
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest("hex");

        return generatedSignature === signature;
    }
};
