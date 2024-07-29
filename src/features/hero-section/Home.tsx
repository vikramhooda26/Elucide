import { useEffect, useRef } from "react";
import { ScrollToTopButton } from "../../components/scroll-to-top";
import { Features } from "./Features";
import { Clients } from "../../layouts/main-layout/components/Clients";
import Footer from "../../layouts/main-layout/components/Footer";
import { useTheme } from "../../provider/theme/theme-provider";
import { AboutUs } from "./About";
import { Approach } from "./Approach";
import { Hero } from "./Hero";

export const Home = () => {
    const words = ["Brands", "Teams", "Athletes", "Leagues"];
    const approachRef = useRef<HTMLDivElement>(null);
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");
    }, []);

    return (
        <div className="w-full min-h-dvh overflow-hidden">
            <Hero
                approachRef={approachRef}
                words={words}
            />
            <AboutUs />
            <Approach approachRef={approachRef} />
            <Features />
            <Clients />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};
