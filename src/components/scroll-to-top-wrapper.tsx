import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ScrollToTopButtonWrapper = ({
    children
}: {
    children: React.ReactNode;
}) => {
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

    return (
        <div
            className={cn(
                "fixed -bottom-20 right-6 z-50 transition-all duration-500 ease-in-out",
                showScrollToTop && "bottom-6"
            )}
        >
            {children}
        </div>
    );
};
