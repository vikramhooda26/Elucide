import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";
import { motion } from "framer-motion";

export const AboutUs = () => {
    return (
        <HeroHighlight
            className="flex flex-col items-center justify-center"
            containerClassName="lg:min-h-dvh !h-fit min-h-fit max-lg:py-40"
        >
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-lg sm:text-2xl px-4 w-[98%] lg:max-w-7xl lg:text-4xl font-bold text-white !leading-relaxed sm:text-center text-start"
            >
                At <Highlight>Elucide Sports</Highlight>, we leverage data and
                insights through our proprietary matchmaking platform. We
                specialize in delivering sports partnerships that are
                laser-focused on achieving objectives. Our approach ensures
                strategic alignment and curated insights, maximizing the impact
                of every partnership opportunity.
            </motion.h1>
        </HeroHighlight>
    );
};
