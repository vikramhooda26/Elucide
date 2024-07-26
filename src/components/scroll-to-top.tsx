import { ChevronsUp } from "lucide-react";
import { GradientButton } from "./ui/gradient-button";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ScrollToTopButton = () => {
    const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    return (
        <div
            className={cn(
                "fixed -bottom-20 right-6 transition-all duration-500 ease-in-out z-50",
                showScrollToTop && "bottom-6"
            )}
        >
            <GradientButton
                className="rounded-full !px-4"
                onClick={handleScrollToTop}
            >
                <ChevronsUp className="h-5 w-5" />
            </GradientButton>
        </div>
    );
};
