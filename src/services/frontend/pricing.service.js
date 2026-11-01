import { PRICING_PLANS } from "@/constants/pricing";

export const pricingService = {
    fetchPlans: async (params = {}) => {
        try {
            let filteredPlans = PRICING_PLANS;
            
            if (typeof params === 'string' && params) {
                filteredPlans = PRICING_PLANS.filter(plan => plan.type === params);
            } else if (params && typeof params === 'object' && params.type) {
                filteredPlans = PRICING_PLANS.filter(plan => plan.type === params.type);
            }

            return filteredPlans;
        } catch (error) {
            console.error('[PricingService] Error fetching plans:', error.message);
            throw error;
        }
    },

    fetchPlanById: async (id) => {
        try {
            const plan = PRICING_PLANS.find(p => p._id === id);
            if (!plan) throw new Error("Plan not found");
            return plan;
        } catch (error) {
            console.error(`[PricingService] Error fetching plan ${id}:`, error.message);
            throw error;
        }
    }
};