export const FB_PIXEL_ID = "1510173147588157";

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
 * Track standard Meta Pixel event.
 */
export const trackEvent = (name, options = {}) => {
    fbq("track", name, options);
};

/**
 * Standard Event: Lead Capture
 * Triggered when a user submits their contact information (Name, WhatsApp Number, Email).
 */
export const trackLead = ({
    content_name = "Leadio 1-Month Plan",
    value = 499,
    currency = "INR",
    ...custom
} = {}) => {
    trackEvent("Lead", {
        content_name,
        content_category: "Subscription",
        value: Number(value) || 499,
        currency,
        ...custom,
    });
};

/**
 * Standard Event: Initiate Checkout
 * Triggered when the Razorpay payment gateway is opened.
 */
export const trackInitiateCheckout = ({
    content_name = "Leadio 1-Month Plan",
    value = 499,
    currency = "INR",
} = {}) => {
    trackEvent("InitiateCheckout", {
        content_name,
        content_category: "Subscription",
        value: Number(value) || 499,
        currency,
        num_items: 1,
    });
};

/**
 * Standard Event: Purchase / Sale
 * Triggered when payment is successfully verified.
 * Includes deduplication via sessionStorage to prevent duplicate counts on page refresh.
 */
export const trackPurchase = ({
    order_id,
    value = 499,
    currency = "INR",
    content_name = "Leadio 1-Month Plan",
} = {}) => {
    if (typeof window !== "undefined" && order_id) {
        const dedupeKey = `meta_purchase_tracked_${order_id}`;
        if (sessionStorage.getItem(dedupeKey)) {
            return;
        }
        sessionStorage.setItem(dedupeKey, "true");
    }

    trackEvent("Purchase", {
        value: Number(value) || 499,
        currency,
        content_name,
        content_type: "product",
        order_id: order_id || undefined,
        num_items: 1,
    });
};

