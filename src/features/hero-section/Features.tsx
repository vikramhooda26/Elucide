import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";
import { MovingBorderCard } from "../../components/ui/moving-border";

export const Features = () => {
    const features: { title: string; description: string }[] = [
        {
            title: "Robust Stakeholder Database",
            description:
                "Over 200 profiles of sports teams, leagues, athletes, and events covering the entire Indian sports ecosystem. Curated and developed through primary and secondary research methods, the database is continuously evolving and regularly updated to keep pace with industry developments."
        },
        {
            title: "Advanced Search Filters",
            description:
                "Detailed stakeholder profiles covering key data points such as target audiences, brand identity, and partnership value. With over 15 criteria-based filters, the advanced search functions help filter and narrow down the right brand fit."
        },
        {
            title: "Smart Match-making",
            description:
                "An advanced data sorting algorithm backed by AI-enhanced search functionality delivers smart matchmaking based on brand objectives and targeted briefs."
        }
    ];
    return (
        <div className="relative flex w-full justify-center border-t border-input px-8 py-24 md:min-h-dvh md:py-40">
            <span className="blob-2 absolute right-0 top-[20%] -z-10 h-5/6 w-1/3 rotate-180 blur-[100px] max-sm:hidden" />
            <div className="w-[96%]">
                <AnimatedGradientText className="text-6xl font-bold">
                    Features
                </AnimatedGradientText>
                <p className="mb-20 mt-12 max-w-xl text-xl">
                    Our proprietary matchmaking platform boasts various features
                    that provide unique insights, making it an unparalleled
                    resource in the Indian sports landscape.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature, i) => (
                        <MovingBorderCard key={i} as={"div"} className="p-8">
                            <CardContent
                                title={feature.title}
                                description={feature.description}
                            />
                        </MovingBorderCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CardContent = ({
    title,
    description
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-start text-lg font-bold md:text-2xl">
                {title}
            </h1>
            <p className="text-start text-sm">{description}</p>
        </div>
    );
};
