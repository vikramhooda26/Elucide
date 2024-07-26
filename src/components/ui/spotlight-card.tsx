import React from "react";

export const SpotlightCard = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="w-80 h-64 rounded-xl p-[1px] bg-[radial-gradient(circle_230px_at_0%_0%,_#ffffff,_#0c0d0d)] relative overflow-hidden">
            <div className="w-[5px] aspect-square absolute bg-white shadow-[0_0_10px_#ffffff] rounded-full z-40 right-[10%] top-[10%] animate-move-dot" />
            <div className="z-10 w-full h-full rounded-xl border border-[#202222] bg-[20px_20px] bg-[radial-gradient(circle_280px_at_0%_0%,_#444444,_#0c0d0d)] flex items-center justify-center relative flex-col text-white">
                <div className="w-[220px] h-12 rounded-full absolute bg-[#c7c7c7] opacity-40 shadow-[0_0_50px_#fff] blur-md origin-[10%] top-[0%] left-0 rotate-[40deg]" />
                {children}
                <div className="w-full h-[1px] absolute bg-[#2c2c2c] top-[10%] bg-[linear-gradient(90deg,_#888888_30%,_#1d1f1f_70%)] topl"></div>
                <div className="absolute bg-[#2c2c2c] left-[10%] w-[1px] h-full bg-[linear-gradient(180deg,_#747474_30%,_#222424_70%)] "></div>
                <div className="w-full h-[1px] absolute bg-[#2c2c2c] bottom-[10%]"></div>
                <div className="absolute bg-[#2c2c2c] right-[10%] w-[1px] h-full "></div>
            </div>
        </div>
    );
};
