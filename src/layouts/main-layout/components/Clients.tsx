import PumaLogo from "../../../assets/client-puma-logo.png";
import NewBalanceLogo from "../../../assets/client-new-balance-logo.png";
import MyProtienLogo from "../../../assets/client-my-protien-logo.png";
import SSLogo from "../../../assets/client-ss-logo.png";
import { SpotlightCard } from "../../../components/ui/spotlight-card";
import { AnimatedGradientText } from "../../../components/ui/animated-gradient-text";

export const Clients = () => {
    const logos = [PumaLogo, NewBalanceLogo, MyProtienLogo, SSLogo];
    return (
        <div className="flex items-center justify-center bg-black py-24 text-white md:py-40">
            <div className="w-[90%]">
                <h1 className="mb-20 text-4xl font-bold">
                    Some of our{" "}
                    <AnimatedGradientText>clients</AnimatedGradientText>
                </h1>
                <div className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {logos.map((logo, index) => (
                        <SpotlightCard key={index}>
                            <div className="aspect-square h-28 overflow-hidden">
                                <img
                                    src={logo}
                                    className="h-full object-contain object-center brightness-0 invert filter"
                                />
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
};
