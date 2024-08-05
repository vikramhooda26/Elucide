import {
    BarChart,
    Building,
    Dumbbell,
    FileText,
    Trophy,
    Users,
} from "lucide-react";
import * as React from "react";
import {
    ResizableHandle,
    ResizablePanel,
} from "../../../components/ui/resizable";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { cn } from "../../../lib/utils";
import { Nav, NavProps } from "./new-nax";


interface MailProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export const SideMenu = ({
    defaultLayout = [15],
    defaultCollapsed = false,
    navCollapsedSize,
}: MailProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const SideMenuLinks: Pick<NavProps, "links"> = {
        links: [
            {
                title: "League",
                icon: Trophy,
                label: "50",
                navigateTo: NAVIGATION_ROUTES.LEAGUE_ADMIN,
            },
            {
                title: "Athlete",
                icon: Dumbbell,
                label: "200",
                navigateTo: NAVIGATION_ROUTES.ATHLETE_ADMIN,
            },
            {
                title: "Team",
                icon: Users,
                label: "150",
                navigateTo: NAVIGATION_ROUTES.TEAM_ADMIN,
            },
            {
                title: "Brand",
                icon: Building,
                label: "100",
                navigateTo: NAVIGATION_ROUTES.BRAND_ADMIN,
            },
        ],
    };

    return (
        <>
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={10}
                maxSize={15}
                className={cn(
                    isCollapsed &&
                    "min-w-[50px] transition-all duration-300 ease-in-out"
                )}
                onCollapse={() => {
                    setIsCollapsed(true);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        true
                    )}`;
                }}
                onResize={() => {
                    setIsCollapsed(false);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        false
                    )}`;
                }}
            >
                <Nav
                    isCollapsed={isCollapsed}
                    links={SideMenuLinks.links}
                />
            </ResizablePanel>
            <ResizableHandle
                withHandle
                className="min-h-dvh"
            />
        </>
    );
};
