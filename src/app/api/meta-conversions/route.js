import { NextResponse } from "next/server";
import {
    sendMetaServerEvent,
    extractClientIp,
    extractUserAgent,
    extractMetaCookies,
} from "@/lib/meta-conversions-api";

export async function POST(req) {
    try {
        const body = await req.json();
        const { eventName, eventId, eventSourceUrl, userData = {}, customData = {} } = body;

        if (!eventName) {
            return NextResponse.json({ error: "eventName is required" }, { status: 400 });
        }

        const clientIp = extractClientIp(req);
        const userAgent = extractUserAgent(req);
        const { fbp, fbc } = extractMetaCookies(req);

        const result = await sendMetaServerEvent({
            eventName,
            eventId,
            eventSourceUrl: eventSourceUrl || req.headers.get("referer") || "https://leadio.in",
            userData: {
                ...userData,
                clientIp: userData.clientIp || clientIp,
                userAgent: userData.userAgent || userAgent,
                fbp: userData.fbp || fbp,
                fbc: userData.fbc || fbc,
            },
            customData,
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("[/api/meta-conversions error]:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

