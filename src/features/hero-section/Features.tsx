import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";
import { MovingBorderCard } from "../../components/ui/moving-border";

export const Features = () => {
    const features: { title: string; description: string }[] = [
        {
            title: "Robust Stakeholder Database",
            description:
                "Over 200 profiles of sports teams, leagues, athletes, and events covering the entire Indian sports ecosystem. Curated and developed through primary and secondary research methods, the database is continuously evolving and regularly updated to keep pace with industry developments.",
        },
        {
            title: "Advanced Search Filters",
            description:
                "Detailed stakeholder profiles covering key data points such as target audiences, brand identity, and partnership value. With over 15 criteria-based filters, the advanced search functions help filter and narrow down the right brand fit.",
        },
        {
            title: "Smart Match-making",
            description:
                "An advanced data sorting algorithm backed by AI-enhanced search functionality delivers smart matchmaking based on brand objectives and targeted briefs.",
        },
    ];
    return (
        <div className="relative md:min-h-dvh w-full px-8 flex justify-center md:py-40 py-24 border-t border-input">
            <span className="blob-2 max-sm:hidden absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10" />
            <div className="w-[96%]">
                <AnimatedGradientText className="text-6xl font-bold">
                    Features
                </AnimatedGradientText>
                <p className="max-w-xl text-xl mt-12 mb-20">
                    Our proprietary matchmaking platform boasts various features
                    that provide unique insights, making it an unparalleled
                    resource in the Indian sports landscape.
                </p>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {features.map((feature, i) => (
                        <MovingBorderCard
                            key={i}
                            as={"div"}
                            className="p-8"
                        >
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
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="md:text-2xl text-lg font-bold text-start">
                {title}
            </h1>
            <p className="text-sm text-start">{description}</p>
        </div>
    );
};
