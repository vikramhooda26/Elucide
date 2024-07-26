import { AnimatedGradientText } from "../../components/ui/animated-gradient-text";
import { MovingBorderCard } from "../../components/ui/moving.border";

export const Features = () => {
    const features: { title: string; description: string }[] = [
        {
            title: "Stakeholder Information Hub",
            description:
                "A robust database with profiles of over 200 sports leagues, events, teams & athletes to provide a wide search base.",
        },
        {
            title: "Detailed Stakeholder Profiles",
            description:
                "Detailed stakeholder profiles offer insights into target audiences, brand identity, & partnership value.",
        },
        {
            title: "Smart Match-making",
            description:
                "Data & insight based matchmaking based on brand requirements & objectives to drive efficient engagements.",
        },
        {
            title: "Advanced Search Filters",
            description:
                "20+ criteria based filters to make advanced search functions to filter & narrow down on the right brand fit.",
        },
    ];
    return (
        <div className="relative md:min-h-dvh w-full px-8 flex justify-center md:py-40 py-24 border-t border-input">
            <span className="blob-2 absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10" />
            <div className="w-[90%]">
                <AnimatedGradientText className="text-6xl font-bold">
                    Features
                </AnimatedGradientText>
                <p className="max-w-xl text-xl mt-12 mb-20">
                    Elucide Sports uses its in-house resources to discover,
                    analyse and facilitate direct communication with potential
                    partners.
                </p>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {features.map((feature) => (
                        <MovingBorderCard>
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
        <div className="flex flex-col gap-4 justify-center">
            <h1 className="md:text-2xl text-lg font-bold text-start">
                {title}
            </h1>
            <p className="text-sm text-start">{description}</p>
        </div>
    );
};
