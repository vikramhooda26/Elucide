import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";
import {
    CanvasRevealEffect,
    Card
} from "../../components/ui/card-reveal-effect";
import { GradientButton } from "../../components/ui/gradient-button";

export const Approach = ({
    approachRef
}: {
    approachRef: React.RefObject<HTMLDivElement>;
}) => {
    return (
        <div
            className="flex w-full flex-col items-center justify-center gap-16 bg-[#000319] px-8 py-24 text-white md:min-h-dvh md:py-40"
            ref={approachRef}
        >
            <h1 className="text-4xl font-bold">
                Our <AnimatedGradientText>Advantage</AnimatedGradientText>
            </h1>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <Card
                    title="Objective-Focused Approach"
                    description="By prioritizing and understanding the specific objectives of each brand, we ensure that every partnership is goal-oriented and results-driven"
                    icon={<GradientButton>Advantage 1</GradientButton>}
                >
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-emerald-900"
                    />
                </Card>
                <Card
                    title="Data-Driven Insights"
                    description="By leveraging extensive data and insights, we provide strategic and informed recommendations, leading to better alignment with brand objectives."
                    icon={<GradientButton>Advantage 2</GradientButton>}
                >
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-black"
                        colors={[
                            [236, 72, 153],
                            [232, 121, 249]
                        ]}
                        dotSize={2}
                    />
                </Card>
                <Card
                    title="Customized Solutions"
                    description="Our bespoke service tailors each sponsorship opportunity to meet the specific goals and needs of each brand, rather than offering generic packages."
                    icon={<GradientButton>Advantage 3</GradientButton>}
                >
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-sky-600"
                        colors={[[125, 211, 252]]}
                    />
                </Card>
                <Card
                    title="Comprehensive Support"
                    description="Offering an end-to-end service, from initial matchmaking to partnership execution, ensures a seamless experience for brands throughout the sponsorship journey."
                    icon={<GradientButton>Advantage 4</GradientButton>}
                >
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-transparent"
                        colors={[
                            [59, 130, 246],
                            [139, 92, 246]
                        ]}
                        dotSize={2}
                    />
                </Card>
            </div>
        </div>
    );
};
