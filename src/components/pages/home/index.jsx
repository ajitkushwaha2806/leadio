import Faqs from "./fragments/faqs";
import { Hero } from "./fragments/hero";
import Testimonials from "./fragments/reviews";
import PricingSection from "./fragments/pricing";
import FeaturesSection from "./fragments/features";

const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturesSection />
            <PricingSection />
            <Testimonials />
            <Faqs />
        </div>
    )
}

export default Home;