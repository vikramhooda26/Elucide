import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

export const HeroHighlight = ({
    children,
    className,
    containerClassName
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        <div
            className={cn(
                "group relative flex min-h-[80vh] w-full items-center justify-center bg-black max-sm:py-16 md:h-dvh",
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <div className="pointer-events-none absolute inset-0 bg-dot-thick-neutral-800" />
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-indigo-500 group-hover:opacity-100"
                style={{
                    WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                    maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
                }}
            />

            <div className={cn("relative z-20", className)}>{children}</div>
        </div>
    );
};

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%"
            }}
            animate={{
                backgroundSize: "100% 100%"
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline"
            }}
            className={cn(
                `relative inline-block !rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-1 pb-1`,
                className
            )}
        >
            {children}
        </motion.span>
    );
};
