import React from "react";

export const SpotlightCard = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="relative h-52 w-72 overflow-hidden rounded-xl bg-[radial-gradient(circle_230px_at_0%_0%,_#ffffff,_#0c0d0d)] p-[1px]">
            <div className="absolute right-[10%] top-[10%] z-40 aspect-square w-[5px] animate-move-dot rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-xl border border-[#202222] bg-[radial-gradient(circle_280px_at_0%_0%,_#444444,_#0c0d0d)] bg-[20px_20px] text-white">
                <div className="absolute left-0 top-[0%] h-12 w-[220px] origin-[10%] rotate-[40deg] rounded-full bg-[#c7c7c7] opacity-40 shadow-[0_0_50px_#fff] blur-md" />
                {children}
                <div className="topl absolute top-[10%] h-[1px] w-full bg-[#2c2c2c] bg-[linear-gradient(90deg,_#888888_30%,_#1d1f1f_70%)]"></div>
                <div className="absolute left-[10%] h-full w-[1px] bg-[#2c2c2c] bg-[linear-gradient(180deg,_#747474_30%,_#222424_70%)]"></div>
                <div className="absolute bottom-[10%] h-[1px] w-full bg-[#2c2c2c]"></div>
                <div className="absolute right-[10%] h-full w-[1px] bg-[#2c2c2c]"></div>
            </div>
        </div>
    );
};
