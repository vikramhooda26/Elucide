import { SetStateAction } from "react";
import "./hamburger.css";
import { cn } from "../../lib/utils";

interface HamburgerProps {
    isActive: boolean;
    setIsActive: React.Dispatch<SetStateAction<boolean>>;
    className?: string;
    containerClassName?: string;
}

export const Hamburger = ({
    isActive,
    setIsActive,
    className,
    containerClassName,
}: HamburgerProps) => {
    return (
        <label className={cn("hamburger lg:hidden", containerClassName)}>
            <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((p) => !p)}
            />
            <svg viewBox="0 0 30 30">
                <path
                    className={cn("line line-top-bottom", className)}
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path
                    className={cn("line", className)}
                    d="M7 16 27 16"
                ></path>
            </svg>
        </label>
    );
};
