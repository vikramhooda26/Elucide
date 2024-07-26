import { cn } from "../../lib/utils";

export const GradientButton = ({
    children,
    className,
    onClick,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            className={cn(
                "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 select-none",
                containerClassName
            )}
        >
            <span className="absolute inset-[-1000%] z-[-1] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <button
                className={cn(
                    "inline-flex h-12 animate-background-shine items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white",
                    className
                )}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};
