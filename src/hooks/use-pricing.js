import { useState, useEffect, useCallback } from "react";
import { pricingService } from "@/services/frontend/pricing.service";

export const usePricing = (initialParams = {}) => {
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const paramsString = JSON.stringify(initialParams);

    const loadPlans = useCallback(async (params = initialParams) => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedPlans = await pricingService.fetchPlans(params);
            setPlans(fetchedPlans || []);
        } catch (err) {
            setError(err.message || "An unexpected error occurred while fetching plans.");
            setPlans([]);
        } finally {
            setIsLoading(false);
        }
    }, [paramsString]);

    useEffect(() => {
        let isMounted = true;
        const initFetch = async () => {
            try {
                const params = JSON.parse(paramsString);
                const fetchedPlans = await pricingService.fetchPlans(params);
                if (isMounted) {
                    setPlans(fetchedPlans || []);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred while fetching plans.");
                    setPlans([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initFetch();
        return () => {
            isMounted = false;
        };
    }, [paramsString]);

    return {
        plans,
        isLoading,
        error,
        refetch: loadPlans
    };
};
