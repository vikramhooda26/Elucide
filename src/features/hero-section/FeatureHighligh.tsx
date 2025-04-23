import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";

export const FeatureHighlight = () => {
  return (
    <div className="flex justify-center bg-[#161d2b] py-24 text-white md:py-40">
      <div className="w-[90%]">
        <h1 className="mb-10 text-4xl font-bold">
          Robust <AnimatedGradientText>Database</AnimatedGradientText>
        </h1>
        <h3 className="text-2xl font-bold">
          <AnimatedGradientText>200+ Profiles</AnimatedGradientText>
        </h3>
        <p className="mb-4 max-w-xl text-neutral-400">
          of Sports Leagues, Teams, Athletes & Events that cover the entire Indian sports ecosystem
        </p>
      </div>
    </div>
  );
};
