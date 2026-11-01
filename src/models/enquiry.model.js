import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            default: "",
        },
        restaurantName: {
            type: String,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            trim: true,
            lowercase: true,
        },
        plan: {
            type: String,
            default: "Leadio 1-Month Plan (₹499)",
        },
        status: {
            type: String,
            enum: ["pending", "in_progress", "completed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
