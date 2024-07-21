import { FlipWords } from "../../components/ui/flip-words";
import { Vortex } from "../../components/ui/vortex";

export function Hero() {
    const words = ["Brands", "Teams", "Athletes", "Leagues"];
    return (
        <div className="w-full mx-auto rounded-md h-[calc(100dvh-69px)] overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex flex-col items-center justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                <h2 className="text-white text-2xl md:text-5xl font-bold text-start">
                    Access thousands of <FlipWords words={words} />
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                    Subscribe to Elucide Sports and take data backed decisions
                </p>
            </Vortex>
        </div>
    );
}
