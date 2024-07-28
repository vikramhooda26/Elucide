import PumaLogo from "../../../assets/client-puma-logo.png";
import NewBalanceLogo from "../../../assets/client-new-balance-logo.png";
import MyProtienLogo from "../../../assets/client-my-protien-logo.png";
import SSLogo from "../../../assets/client-ss-logo.png";
import { SpotlightCard } from "../../../components/ui/spotlight-card";
import { AnimatedGradientText } from "../../../components/ui/animated-gradient-text";

export const Clients = () => {
    const logos = [PumaLogo, NewBalanceLogo, MyProtienLogo, SSLogo];
    return (
        <div className="flex justify-center bg-black md:py-40 py-24 text-white">
            <div className="w-[90%]">
                <h1 className="text-4xl mb-20 font-bold">
                    Some of our{" "}
                    <AnimatedGradientText>clients</AnimatedGradientText>
                </h1>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {logos.map((logo, index) => (
                        <SpotlightCard key={index}>
                            <div className="h-28 aspect-square overflow-hidden">
                                <img
                                    src={logo}
                                    className="object-contain object-center h-full filter invert brightness-0"
                                />
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
};
