import { ChevronRight } from "lucide-react";
import { FlipWords } from "../../components/ui/flip-words";
import { Vortex } from "../../components/ui/vortex";
import { GradientButton } from "../../components/ui/gradient-button";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider/AuthProvider";

export const Hero = ({
    words,
    approachRef,
}: {
    words: string[];
    approachRef: React.RefObject<HTMLDivElement>;
}) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleScrollToApproach = () => {
        approachRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <Vortex
            backgroundColor="black"
            rangeY={400}
            particleCount={150}
            className="flex flex-col items-center justify-center px-4 md:px-10 py-4 w-full sm:min-h-dvh max-sm:py-40"
        >
            <h2 className="text-white text-3xl sm:text-5xl font-bold sm:text-center text-start">
                Hub of Information on Hundreds of <FlipWords words={words} />
            </h2>
            <p className="text-white sm:max-w-md md:text-2xl md:max-w-2xl my-6 sm:text-center text-start">
                An end-to-end sports sponsorship service centered around an
                AI-enhanced matchmaking platform, designed to discover and
                engage with the ideal sports teams, leagues, athletes, and
                events.
            </p>
            <div className="gap-5 flex max-sm:flex-col sm:items-center items-start w-full justify-center">
                <GradientButton
                    onClick={() =>
                        isAuthenticated
                            ? navigate(NAVIGATION_ROUTES.DASHBOARD)
                            : navigate(NAVIGATION_ROUTES.LOGIN)
                    }
                >
                    {isAuthenticated ? "Dashboard" : "Login"}
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
    );
};
