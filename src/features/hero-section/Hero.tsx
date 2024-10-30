import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlipWords } from "../../components/ui/flip-words";
import { GradientButton } from "../../components/ui/gradient-button";
import { Vortex } from "../../components/ui/vortex";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import { useAuth } from "../auth/auth-provider/AuthProvider";

export const Hero = ({ words, approachRef }: { words: string[]; approachRef: React.RefObject<HTMLDivElement> }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleScrollToApproach = () => {
        approachRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <Vortex
            backgroundColor="black"
            rangeY={400}
            particleCount={150}
            className="flex w-full flex-col items-center justify-center px-4 py-4 max-sm:py-40 sm:min-h-dvh md:px-10"
        >
            <h2 className="text-start text-3xl font-bold text-white sm:text-center sm:text-5xl">
                Hub of Information on Hundreds of <FlipWords words={words} />
            </h2>
            <p className="my-6 text-start text-white sm:max-w-md sm:text-center md:max-w-2xl md:text-2xl">
                An end-to-end sports sponsorship service centered around an AI-enhanced matchmaking platform, designed
                to discover and engage with the ideal sports teams, leagues, athletes, and events.
            </p>
            <div className="flex w-full items-center justify-center gap-5 max-sm:flex-col">
                <GradientButton
                    onClick={() =>
                        isAuthenticated ? navigate(NAVIGATION_ROUTES.DASHBOARD) : navigate(NAVIGATION_ROUTES.LOGIN)
                    }
                >
                    {isAuthenticated ? "Dashboard" : "Login"}
                </GradientButton>
                <GradientButton className="group" containerClassName="max-sm:hidden" onClick={handleScrollToApproach}>
                    See more{" "}
                    <ChevronRight className="ml-1 h-4 w-4 text-white duration-200 ease-in-out group-hover:translate-x-1" />
                </GradientButton>
            </div>
        </Vortex>
    );
};
