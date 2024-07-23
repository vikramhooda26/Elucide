"use client"

import { LucideIcon } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { buttonVariants } from "../../../components/ui/button"
import { cn } from "../../../lib/utils"

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

    const menuOpen = !isCollapsed || openMenu;

    return (
        <div
            data-collapsed={isCollapsed}
            className={cn(
                "group flex flex-col gap-4 py-2 h-screen transition-all duration-300 ease-in-out",
                menuOpen ? "w-44" : "w-14"
            )}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
        >
            <nav className="flex flex-col items-start">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link?.route}
                        className={cn(
                            buttonVariants({ variant: pathname === link?.route ? 'secondary' : 'ghost', size: "sm" }),
                            pathname === link?.route &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white text-blue-500 ",
                            "flex items-center px-1 ps-2 transition-all duration-300 ease-in-out my-1",
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        <span className={cn(
                            "ml-4 overflow-hidden transition-all duration-300 ease-in-out",
                            menuOpen ? "opacity-100 w-20" : "opacity-0 w-0"
                        )}>
                            {link.title}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}
