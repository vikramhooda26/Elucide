import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}
function Shimmer({ children }: Props) {
    return (
        <div
            className="relative 
                        before:absolute before:inset-0
                        before:-translate-x-full
                        before:animate-[shimmer_2s_infinite]
                        before:bg-gradient-to-r
                        before:from-transparent before:via-rose-100/10 before:to-transparent"
        >
            {children}
        </div>
    )
}

export default Shimmer