export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1022159150903209";

/**
 * Safely call Meta Pixel's fbq function on the client.
 */
export const fbq = (...args) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq(...args);
    }
};

/**
 * Track page view.
 */
export const pageview = () => {
    fbq("track", "PageView");
};

/**
 * Track custom Meta Pixel event.
 */
export const trackCustomEvent = (name, options = {}) => {
    fbq("trackCustom", name, options);
};

/**
 * Track standard Meta Pixel event with optional eventID for Conversions API deduplication.
 */
export const trackEvent = (name, options = {}, eventId = undefined) => {
    if (eventId) {
        fbq("track", name, options, { eventID: eventId });
    } else {
        fbq("track", name, options);
    }
};

/**
 * Standard Event: Lead Capture
 * Triggered when a user submits their contact information (Name, WhatsApp Number, Email).
 */
export const trackLead = ({
    content_name = "Leadio 1-Month Plan",
    value = 499,
    currency = "INR",
    eventId = undefined,
    ...custom
} = {}) => {
    trackEvent(
        "Lead",
        {
            content_name,
            content_category: "Subscription",
            value: Number(value) || 499,
            currency,
            ...custom,
        },
        eventId
    );
};

/**
 * Standard Event: Initiate Checkout
 * Triggered when the Razorpay payment gateway is opened.
 * Sends both client-side Pixel event and server-side Conversions API event with matching eventID.
 */
export const trackInitiateCheckout = ({
    content_name = "Leadio 1-Month Plan",
    value = 499,
    currency = "INR",
    eventId = undefined,
    userData = {},
} = {}) => {
    const id = eventId || `initiate_checkout_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    trackEvent(
        "InitiateCheckout",
        {
            content_name,
            content_category: "Subscription",
            value: Number(value) || 499,
            currency,
            num_items: 1,
        },
        id
    );

    // Forward to server-side Conversions API in background
    if (typeof window !== "undefined") {
        fetch("/api/meta-conversions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eventName: "InitiateCheckout",
                eventId: id,
                eventSourceUrl: window.location.href,
                userData,
                customData: {
                    content_name,
                    value: Number(value) || 499,
                    currency,
                },
            }),
        }).catch(() => {});
    }
};

/**
 * Standard Event: Purchase / Sale
 * Triggered when payment is successfully verified.
 * Includes deduplication via sessionStorage and matching eventID for Conversions API.
 */
export const trackPurchase = ({
    order_id,
    value = 499,
    currency = "INR",
    content_name = "Leadio 1-Month Plan",
    userData = {},
} = {}) => {
    const eventId = order_id ? `purchase_${order_id}` : undefined;

    if (typeof window !== "undefined" && order_id) {
        const dedupeKey = `meta_purchase_tracked_${order_id}`;
        if (sessionStorage.getItem(dedupeKey)) {
            return;
        }
        sessionStorage.setItem(dedupeKey, "true");
    }

    trackEvent(
        "Purchase",
        {
            value: Number(value) || 499,
            currency,
            content_name,
            content_type: "product",
            order_id: order_id || undefined,
            num_items: 1,
        },
        eventId
    );

    // Forward to server-side Conversions API in background
    if (typeof window !== "undefined") {
        fetch("/api/meta-conversions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eventName: "Purchase",
                eventId,
                eventSourceUrl: window.location.href,
                userData,
                customData: {
                    content_name,
                    value: Number(value) || 499,
                    currency,
                    order_id,
                },
            }),
        }).catch(() => {});
    }
};

