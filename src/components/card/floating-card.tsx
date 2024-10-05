import { Dot } from "lucide-react";
import React from "react";
import { nameAndId } from "../../types/metadata/Metadata";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export const FloatingCard = ({ children, data }: { children?: React.ReactNode; data: any }) => {
    return (
        <HoverCard openDelay={200} closeDelay={0}>
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-md" side="top">
                <div className="grid gap-4">
                    <Label className="text-lg">All Brands</Label>
                    <Separator />
                    <ul className="grid gap-2 text-muted-foreground">
                        {data?.map((value: nameAndId, index: number) => (
                            <li key={index} className="flex items-center">
                                <Dot />
                                <span>{value.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
