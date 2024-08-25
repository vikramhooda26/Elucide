import { Tooltip } from "@radix-ui/react-tooltip";
import { LucideIcon } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "../../../components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../../components/ui/button";
import { TRoles } from "../../../lib/constants";

export interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant?: "default" | "ghost";
        navigateTo: string;
        roles: TRoles[];
    }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
    const pathname = useLocation().pathname;

    const getVariant = (navigateTo: string) => {
        return pathname === navigateTo ? "default" : "ghost";
    };

    return (
        <div
            data-collapsed={isCollapsed}
            className="scrollbar group !sticky !top-0 flex max-h-[calc(100dvh-80px)] flex-col overflow-auto py-8"
        >
            <nav className="grid gap-3 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    to={link.navigateTo}
                                    className={cn(
                                        buttonVariants({
                                            variant: getVariant(
                                                link.navigateTo
                                            ),
                                            size: "icon"
                                        }),
                                        "h-9 w-9",
                                        getVariant(link.navigateTo) ===
                                            "default" &&
                                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span className="sr-only">
                                        {link.title}
                                    </span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="flex items-center gap-4"
                            >
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
                            to={link.navigateTo}
                            className={cn(
                                buttonVariants({
                                    variant: getVariant(link.navigateTo),
                                    size: "sm"
                                }),
                                getVariant(link.navigateTo) === "default" &&
                                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start"
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        getVariant(link.navigateTo) ===
                                            "default" &&
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
    );
}
