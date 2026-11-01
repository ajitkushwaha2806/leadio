import { LEADIO_LOGO_BASE64 } from "@/constants/leadio-logo-base64";
import { trackPurchase } from "@/lib/meta-pixel";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (typeof window !== "undefined" && window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const paymentService = {
    createOrder: async (amount, metadata = {}) => {
        const response = await fetch("/api/payments/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, ...metadata }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to create order");
        }
        
        return response.json();
    },

    verifyPayment: async (paymentDetails) => {
        const response = await fetch("/api/payments/verfiy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to verify payment");
        }

        return response.json();
    },

    initiateCheckout: async ({
        planTitle,
        price,
        phone,
        email,
        fullName,
        restaurantName,
        address,
        pincode,
        city,
        state,
        planId,
        addons,
        onSuccess,
        onError,
        onDismiss,
    }) => {
        try {
            await loadRazorpayScript();

            if (typeof window === "undefined" || !window.Razorpay) {
                throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
            }

            const orderData = await paymentService.createOrder(price * 100, {
                fullName,
                restaurantName: restaurantName || "Leadio Member",
                phone,
                email,
                address: address || "Digital Delivery - Chrome Extension",
                pincode: pincode || "000000",
                city: city || "Online",
                state: state || "",
                planId: planId || "plan_monthly",
                planTitle: planTitle || "Leadio 1-Month Plan",
                addons: addons || [],
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Leadio",
                description: `${planTitle} - WhatsApp Leads to Sheets`,
                image: LEADIO_LOGO_BASE64,
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        const verifyData = await paymentService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        
                        if (verifyData.success) {
                            trackPurchase({
                                order_id: response.razorpay_order_id,
                                value: price,
                                currency: "INR",
                                content_name: planTitle,
                            });
                            if (onSuccess) onSuccess({ ...verifyData, razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id });
                        } else {
                            if (onError) onError(new Error("Payment verification failed. Please contact support."));
                        }
                    } catch (error) {
                        if (onError) onError(new Error("Error verifying payment."));
                    }
                },
                modal: {
                    ondismiss: function() {
                        if (onDismiss) onDismiss();
                    }
                },
                prefill: {
                    name: fullName || "",
                    contact: phone || "",
                    email: email || "",
                },
                theme: {
                    color: "#ca604e"
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                if (onError) onError(new Error(response.error.description || "Payment failed!"));
            });

            rzp.open();
        } catch (error) {
            console.error("Razorpay Checkout Error:", error);
            if (onError) onError(new Error(error.message || "Checkout failed to initialize. Please try again."));
        }
    }
};
