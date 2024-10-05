import { useEffect, useRef } from "react";
import { ScrollToTopButtonWrapper } from "../../components/scroll-to-top-wrapper";
import { Features } from "./Features";
import { Clients } from "../../layouts/main-layout/components/Clients";
import Footer from "../../layouts/main-layout/components/Footer";
import { useTheme } from "../../provider/theme/theme-provider";
import { AboutUs } from "./About";
import { Approach } from "./Approach";
import { Hero } from "./Hero";
import { GradientButton } from "../../components/ui/gradient-button";
import { ChevronsUp } from "lucide-react";

export const Home = () => {
    const words = ["Brands", "Teams", "Athletes", "Leagues"];
    const approachRef = useRef<HTMLDivElement>(null);
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-dvh w-full overflow-hidden">
            <Hero approachRef={approachRef} words={words} />
            <AboutUs />
            <Approach approachRef={approachRef} />
            <Features />
            <Clients />
            <ScrollToTopButtonWrapper>
                <GradientButton className="rounded-full !px-4" onClick={handleScrollToTop}>
                    <ChevronsUp className="h-5 w-5" />
                </GradientButton>
            </ScrollToTopButtonWrapper>
            <Footer />
        </div>
    );
};
