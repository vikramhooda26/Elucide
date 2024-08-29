import { cn } from "../../lib/utils";

const ButtonBackgroundShine = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={cn(
                "inline-flex animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonBackgroundShine;
