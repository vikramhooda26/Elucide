import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FlipWords } from "../../components/ui/flip-words";
import { GradientButton } from "../../components/ui/gradient-button";
import { Vortex } from "../../components/ui/vortex";
import { useNavigate } from "react-router-dom";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";

export function Hero() {
    const words = ["Brands", "Teams", "Athletes", "Leagues"];
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-dvh overflow-hidden">
            <Vortex
                backgroundColor="black"
                rangeY={400}
                particleCount={500}
                className="flex flex-col items-center justify-center px-2 md:px-10 py-4 w-full h-dvh"
            >
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
                    Hub of Information on Hundreds of{" "}
                    <FlipWords words={words} />
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-sm md:max-w-2xl my-6 text-center">
                    Precision-Driven, Insight-Rich, and ROI Led Partnerships.
                    Subscribe to Elucide Sports and Maximize Returns on Every
                    Sponsorship.
                </p>
                <div className="space-x-5">
                    <GradientButton onClick={() => navigate("/elucide/login")}>
                        Login
                    </GradientButton>
                    <GradientButton className="group">
                        See more{" "}
                        <ChevronRight className="ml-1 h-4 w-4 text-black duration-200 ease-in-out group-hover:translate-x-1 dark:text-white" />
                    </GradientButton>
                </div>
            </Vortex>
            <HeroHighlight className="flex items-center justify-center">
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
                    className="text-2xl px-4 w-[80%] md:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed md:leading-snug text-center"
                >
                    <Highlight>Elucide Sports</Highlight> has been established
                    with the vision to enhance the Indian sports ecosystem &
                    maximize results for brands investing in sporting
                    properties. The founders have vast experience of working in
                    the sponsorship & marketing spheres, crafting tailored
                    strategies for domestic & international brands as well as
                    sports rights holders.
                </motion.h1>
            </HeroHighlight>
        </div>
    );
}
