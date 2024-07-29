import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";

export const FeatureHighlight = () => {
    return (
        <div className="flex justify-center bg-[#161d2b] md:py-40 py-24 text-white">
            <div className="w-[90%]">
                <h1 className="text-4xl font-bold mb-10">
                    Robust <AnimatedGradientText>Database</AnimatedGradientText>
                </h1>
                <h3 className="text-2xl font-bold">
                    <AnimatedGradientText>200+ Profiles</AnimatedGradientText>
                </h3>
                <p className="text-neutral-400 max-w-xl mb-4">
                    of Sports Leagues, Teams, Athletes & Events that cover the
                    entire Indian sports ecosystem
                </p>
            </div>
        </div>
    );
};
