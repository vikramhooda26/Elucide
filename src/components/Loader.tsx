import { cn } from "../lib/utils";

const Loader = ({
    visible,
    className
}: {
    visible: boolean;
    className?: string;
}) => {
    const bars = Array(12).fill(0);
    if (visible)
        return (
            <div className="sonner-loading-wrapper">
                <div className="sonner-spinner">
                    {bars.map((_, i) => (
                        <div
                            className={cn("sonner-loading-bar", className)}
                            key={`spinner-bar-${i}`}
                        />
                    ))}
                </div>
            </div>
        );
};

export default Loader;
