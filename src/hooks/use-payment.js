import { useState } from "react";
import { paymentService } from "@/services/frontend/payment.service";

export const usePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async ({
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
        setIsProcessing(true);
        try {
            await paymentService.initiateCheckout({
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
                onSuccess: (res) => {
                    setIsProcessing(false);
                    if (onSuccess) onSuccess(res);
                    else alert("Payment successful! Welcome to Leadio.");
                },
                onError: (err) => {
                    setIsProcessing(false);
                    if (onError) onError(err);
                    else alert(err.message);
                },
                onDismiss: () => {
                    setIsProcessing(false);
                    if (onDismiss) onDismiss();
                }
            });
        } catch (error) {
            setIsProcessing(false);
            if (onError) onError(error);
            else alert(error.message || "Something went wrong during checkout.");
        }
    };

    return {
        isProcessing,
        handlePayment
    };
};
