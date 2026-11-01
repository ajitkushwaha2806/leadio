import crypto from "crypto";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1022159150903209";
const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_ACCESS_TOKEN || process.env.FB_ACCESS_TOKEN;
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

/**
 * SHA-256 hash a normalized string according to Meta specifications.
 */
function hashString(str) {
    if (!str || typeof str !== "string") return undefined;
    const normalized = str.trim().toLowerCase();
    if (!normalized) return undefined;
    return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Normalize and SHA-256 hash a phone number according to Meta specifications:
 * Digits only, including country code (defaults to 91 for India if 10 digits).
 */
function hashPhone(phone) {
    if (!phone) return undefined;
    let digits = String(phone).replace(/\D/g, "");
    if (!digits) return undefined;
    // If user provided a 10-digit Indian phone without country code, prepend 91
    if (digits.length === 10) {
        digits = "91" + digits;
    }
    return crypto.createHash("sha256").update(digits).digest("hex");
}

/**
 * Split a full name into first and last name.
 */
function splitName(fullName) {
    if (!fullName || typeof fullName !== "string") return { firstName: "", lastName: "" };
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    return { firstName, lastName };
}

/**
 * Extract client IP from Next.js / standard HTTP request headers.
 */
export function extractClientIp(req) {
    if (!req) return undefined;
    const headers = req.headers;
    const forwardedFor = typeof headers.get === "function" ? headers.get("x-forwarded-for") : headers["x-forwarded-for"];
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }
    const realIp = typeof headers.get === "function" ? headers.get("x-real-ip") : headers["x-real-ip"];
    if (realIp) return realIp.trim();
    return undefined;
}

/**
 * Extract User-Agent from Next.js / standard HTTP request headers.
 */
export function extractUserAgent(req) {
    if (!req) return undefined;
    const headers = req.headers;
    return typeof headers.get === "function" ? headers.get("user-agent") || undefined : headers["user-agent"] || undefined;
}

/**
 * Extract Meta cookies (_fbp and _fbc) from request cookies or header.
 */
export function extractMetaCookies(req) {
    if (!req) return { fbp: undefined, fbc: undefined };
    try {
        let cookieHeader = "";
        if (typeof req.headers?.get === "function") {
            cookieHeader = req.headers.get("cookie") || "";
        } else if (req.headers?.cookie) {
            cookieHeader = req.headers.cookie;
        }

        const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
        const fbcMatch = cookieHeader.match(/_fbc=([^;]+)/);

        return {
            fbp: fbpMatch ? decodeURIComponent(fbpMatch[1]) : undefined,
            fbc: fbcMatch ? decodeURIComponent(fbcMatch[1]) : undefined,
        };
    } catch {
        return { fbp: undefined, fbc: undefined };
    }
}

/**
 * Send a server-side event to Meta Conversions API.
 *
 * @param {Object} options
 * @param {string} options.eventName - e.g. "Lead", "Purchase", "InitiateCheckout", "PageView"
 * @param {string} [options.eventId] - Unique ID for deduplication with browser pixel
 * @param {string} [options.eventSourceUrl] - URL of the page where the conversion happened
 * @param {Object} [options.userData] - Raw user data { email, phone, fullName, clientIp, userAgent, fbp, fbc }
 * @param {Object} [options.customData] - Event data { value, currency, content_name, order_id, ... }
 */
export async function sendMetaServerEvent({
    eventName,
    eventId,
    eventSourceUrl = "https://leadio.in",
    userData = {},
    customData = {},
}) {
    if (!META_ACCESS_TOKEN) {
        console.warn("[Meta CAPI] Skipped: META_CONVERSIONS_API_ACCESS_TOKEN is not set in environment.");
        return { success: false, reason: "missing_access_token" };
    }

    try {
        const { firstName, lastName } = splitName(userData.fullName);

        // Build Meta user_data object with proper SHA-256 hashing
        const metaUserData = {
            client_ip_address: userData.clientIp || undefined,
            client_user_agent: userData.userAgent || undefined,
            fbp: userData.fbp || undefined,
            fbc: userData.fbc || undefined,
        };

        const hashedEmail = hashString(userData.email);
        if (hashedEmail) metaUserData.em = [hashedEmail];

        const hashedPhone = hashPhone(userData.phone);
        if (hashedPhone) metaUserData.ph = [hashedPhone];

        const hashedFn = hashString(firstName);
        if (hashedFn) metaUserData.fn = [hashedFn];

        const hashedLn = hashString(lastName);
        if (hashedLn) metaUserData.ln = [hashedLn];

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId || `server_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                    event_source_url: eventSourceUrl,
                    action_source: "website",
                    user_data: metaUserData,
                    custom_data: {
                        currency: customData.currency || "INR",
                        value: customData.value !== undefined ? Number(customData.value) : undefined,
                        content_name: customData.content_name || undefined,
                        content_type: customData.content_type || "product",
                        order_id: customData.order_id || undefined,
                    },
                },
            ],
        };

        if (META_TEST_EVENT_CODE) {
            payload.test_event_code = META_TEST_EVENT_CODE;
        }

        const url = `https://graph.facebook.com/v21.0/${FB_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("[Meta CAPI Error]:", JSON.stringify(data));
            return { success: false, error: data };
        }

        console.log(`[Meta CAPI Success] Event: ${eventName}, EventID: ${payload.data[0].event_id}, FB trace:`, data.fbtrace_id);
        return { success: true, data };
    } catch (err) {
        console.error("[Meta CAPI Exception]:", err.message);
        return { success: false, error: err.message };
    }
}

