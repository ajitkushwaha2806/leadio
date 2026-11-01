import mongoose from "mongoose";

const SubscriptionOrderSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        restaurantName: {
            type: String,
            trim: true,
            default: "Leadio Member",
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            default: "",
        },
        address: {
            street: { type: String, default: "Digital Access", trim: true },
            city: { type: String, default: "Online", trim: true },
            state: { type: String, default: "", trim: true },
            pincode: { type: String, default: "000000", trim: true },
            fullText: { type: String, default: "Digital Access - Chrome Extension" },
        },
        planId: {
            type: String,
            default: "plan_monthly",
        },
        planTitle: {
            type: String,
            default: "Leadio 1-Month Plan",
        },
        basePrice: {
            type: Number,
            default: 499,
        },
        standeesIncluded: {
            type: Number,
            default: 0,
        },
        addons: [
            {
                id: { type: String },
                title: { type: String },
                price: { type: Number },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["initiated", "paid", "failed"],
            default: "initiated",
        },
        razorpayOrderId: {
            type: String,
            default: null,
            index: true,
        },
        razorpayPaymentId: {
            type: String,
            default: null,
        },
        razorpaySignature: {
            type: String,
            default: null,
        },
        errorMessage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.SubscriptionOrder ||
    mongoose.model("SubscriptionOrder", SubscriptionOrderSchema);
