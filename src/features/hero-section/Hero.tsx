import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FlipWords } from "../../components/ui/flip-words";
import { GradientButton } from "../../components/ui/gradient-button";
import { Vortex } from "../../components/ui/vortex";
import { useNavigate } from "react-router-dom";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";
import {
    CanvasRevealEffect,
    Card,
} from "../../components/ui/card-reveal-effect";
import { useEffect, useRef } from "react";
import { ScrollToTopButton } from "../../components/scroll-to-top";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import { Features } from "./Features";
import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";
import { Clients } from "../../layouts/main-layout/components/Clients";
import { useTheme } from "../../provider/theme/theme-provider";

export function Hero() {
    const words = ["Brands", "Teams", "Athletes", "Leagues"];
    const navigate = useNavigate();
    const approachRef = useRef<HTMLDivElement>(null);
    const { setTheme } = useTheme();

    const handleScrollToApproach = () => {
        approachRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        setTheme("dark");
    }, []);

    return (
        <div className="w-full min-h-dvh overflow-hidden">
            <Vortex
                backgroundColor="black"
                rangeY={400}
                particleCount={150}
                className="flex flex-col items-center justify-center px-2 md:px-10 py-4 w-full h-dvh"
            >
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
                    Hub of Information on Hundreds of{" "}
                    <FlipWords words={words} />
                </h2>
                <p className="text-white text-sm max-md:font-semibold md:text-2xl w-[90%] md:max-w-2xl my-6 text-center">
                    Precision-Driven, Insight-Rich, and ROI Led Partnerships.
                    Subscribe to Elucide Sports and Maximize Returns on Every
                    Sponsorship.
                </p>
                <div className="gap-5 flex max-sm:flex-col items-center">
                    <GradientButton
                        onClick={() => navigate(NAVIGATION_ROUTES.LOGIN)}
                    >
                        Login
                    </GradientButton>
                    <GradientButton
                        className="group"
                        containerClassName="max-sm:hidden"
                        onClick={handleScrollToApproach}
                    >
                        See more{" "}
                        <ChevronRight className="ml-1 h-4 w-4 duration-200 ease-in-out group-hover:translate-x-1 text-white" />
                    </GradientButton>
                </div>
            </Vortex>
            <HeroHighlight className="flex flex-col items-center justify-center">
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
                    className="sm:text-2xl px-4 w-[98%] lg:w-[80%] lg:text-4xl font-bold text-white !leading-relaxed text-center"
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
            <div
                className="flex flex-col justify-center text-white gap-16 items-center md:min-h-dvh bg-[#000319] w-full md:py-40 py-24 px-8"
                ref={approachRef}
            >
                <h1 className="text-4xl font-bold">
                    Our <AnimatedGradientText>Advantage</AnimatedGradientText>
                </h1>
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-16">
                    <Card
                        title="Objective Focused"
                        description="We prioritize aligning sponsorships with your brand&#39;s specific goals, ensuring every partnership is tailored to achieve your unique objectives"
                        icon={<GradientButton>Advantage 1</GradientButton>}
                    >
                        <CanvasRevealEffect
                            animationSpeed={3}
                            containerClassName="bg-emerald-900"
                        />
                    </Card>
                    <Card
                        title="Data & Insights Based"
                        description="Our platform utilizes comprehensive data and advanced analytics to provide deep insights, enabling smarter, more informed sponsorship decisions."
                        icon={<GradientButton>Advantage 2</GradientButton>}
                    >
                        <CanvasRevealEffect
                            animationSpeed={3}
                            containerClassName="bg-black"
                            colors={[
                                [236, 72, 153],
                                [232, 121, 249],
                            ]}
                            dotSize={2}
                        />
                    </Card>
                    <Card
                        title="ROI Led"
                        description="Driven by return on investment, we meticulously track and measure the impact of each partnership to maximize your brand’s value and growth."
                        icon={<GradientButton>Advantage 3</GradientButton>}
                    >
                        <CanvasRevealEffect
                            animationSpeed={3}
                            containerClassName="bg-sky-600"
                            colors={[[125, 211, 252]]}
                        />
                    </Card>
                </div>
            </div>
            <Features />
            <div className="flex justify-center bg-[#161d2b] md:py-40 py-24 text-white">
                <div className="w-[90%]">
                    <h1 className="text-4xl font-bold mb-10">
                        Robust{" "}
                        <AnimatedGradientText>Database</AnimatedGradientText>
                    </h1>
                    <h3 className="text-2xl font-bold">
                        <AnimatedGradientText>
                            200+ Profiles
                        </AnimatedGradientText>
                    </h3>
                    <p className="text-neutral-400 max-w-xl mb-4">
                        of Sports Leagues, Teams, Athletes & Events that cover
                        the entire Indian sports ecosystem
                    </p>
                </div>
            </div>
            <Clients />
            <ScrollToTopButton />
        </div>
    );
}
