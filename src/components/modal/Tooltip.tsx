import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PopUpProps {
    triggerText: string;
    content?: React.ReactNode;
    triggerOnHover?: boolean;
    children?: ReactNode;
    className?: string;
}

export default function Tooltip({ triggerText, content, triggerOnHover = false, children, className }: PopUpProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        if (triggerOnHover) {
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (triggerOnHover) {
            setIsOpen(false);
        }
    };

    const handleClick = () => {
        if (!triggerOnHover) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    {triggerText}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children ? children : content}
            </PopoverContent>
        </Popover>
    );
}
