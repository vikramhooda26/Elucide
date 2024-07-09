import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../components/ui/resizable";
import { Separator } from "../../components/ui/separator";
import { TooltipProvider } from "../../components/ui/tooltip";
import { cn } from "../../lib/utils";
import CookieService from "../../services/cookies/CookieService";
import { sideMenuObjType } from "../../types/routes/RoutesTypes";
import { SideMenuNav } from "./SideMenuNav";

interface SidemenuProps {
    sidemenus: sideMenuObjType[];
    isCollapsed?: boolean;
}

export function SidemenuLayout({
    sidemenus,
    isCollapsed = false
}: SidemenuProps) {


    return (
        <TooltipProvider delayDuration={0}>
            
            <SideMenuNav
                isCollapsed={isCollapsed}
                links={sidemenus}
            />
            <Separator />
            <SideMenuNav
                isCollapsed={isCollapsed}
                links={sidemenus}
            />
            
        </TooltipProvider>
    )
}