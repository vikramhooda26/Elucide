"use client"

import { LucideIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../../components/ui/tooltip"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
        route: string;
        access: string[]
    }[],
}

export function SideMenuNav({ links, isCollapsed = false }: NavProps) {
    const pathname = useLocation().pathname;
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-screen "
            onMouseEnter={() => setOpenMenu(true)} onMouseLeave={() => setOpenMenu(false)}
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed && !openMenu ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    to={link?.route}
                                    className={cn(
                                        buttonVariants({ variant: pathname === link?.route ? 'default' : 'ghost', size: "icon" }),
                                        "h-9 w-9",
                                        pathname === link?.route &&
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white "
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span className="sr-only">{link.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {link.title}
                                {link.label && (
                                    <span className="ml-auto text-muted-foreground">
                                        {link.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            to={link?.route}
                            className={cn(
                                buttonVariants({ variant: pathname === link?.route ? 'secondary' : 'ghost', size: "sm" }),
                                pathname === link?.route &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white text-blue-500 ",
                                "justify-start pe-12 "
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        link.variant === "default" &&
                                        "text-background dark:text-white"
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}
