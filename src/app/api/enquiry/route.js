import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/enquiry.model";
import { capturePostHogLog } from "@/lib/posthog-logs";
import {
    sendMetaServerEvent,
    extractClientIp,
    extractUserAgent,
    extractMetaCookies,
} from "@/lib/meta-conversions-api";

export async function POST(req) {
    try {
        let bodyData = {};
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            bodyData = await req.json();
        } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await req.formData();
            bodyData = {
                fullName: formData.get("fullName")?.toString() || formData.get("name")?.toString() || "",
                restaurantName: formData.get("restaurantName")?.toString() || "",
                phone: formData.get("phone")?.toString() || "",
                email: formData.get("email")?.toString() || "",
                plan: formData.get("plan")?.toString() || "Leadio 1-Month Plan (₹499)",
            };
        }

        const fullName = (bodyData.fullName || bodyData.name || bodyData.restaurantName || "").trim();
        const phone = (bodyData.phone || "").trim();
        const email = (bodyData.email || "").trim().toLowerCase();
        const plan = (bodyData.plan || "Leadio 1-Month Plan (₹499)").trim();

        if (!fullName || !phone || !email) {
            return NextResponse.json(
                { error: "Name, phone number, and email are required." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const savedEnquiry = await Enquiry.create({
            fullName,
            restaurantName: fullName,
            phone,
            email,
            plan,
            status: "pending",
        });

        console.log("[Lead Saved to MongoDB]:", savedEnquiry._id, fullName, phone, email);

        try {
            await capturePostHogLog("lead_submitted", { fullName, phone, email, plan });
        } catch {}

        // Send Server-Side Lead Event to Meta Conversions API
        try {
            const clientIp = extractClientIp(req);
            const userAgent = extractUserAgent(req);
            const { fbp, fbc } = extractMetaCookies(req);

            await sendMetaServerEvent({
                eventName: "Lead",
                eventId: bodyData.eventId || `lead_${savedEnquiry._id}`,
                eventSourceUrl: req.headers.get("referer") || "https://leadio.in",
                userData: {
                    fullName,
                    phone,
                    email,
                    clientIp,
                    userAgent,
                    fbp,
                    fbc,
                },
                customData: {
                    content_name: plan,
                    value: 499,
                    currency: "INR",
                },
            });
        } catch (capiErr) {
            console.warn("[Meta CAPI Lead Error]:", capiErr.message);
        }

        return NextResponse.json({
            success: true,
            message: "Lead saved successfully!",
            id: savedEnquiry._id,
            data: savedEnquiry,
        });
    } catch (error) {
        console.error("[Lead API Error]:", error);
        return NextResponse.json(
            { error: error.message || "Failed to save lead." },
            { status: 500 }
        );
    }
}
