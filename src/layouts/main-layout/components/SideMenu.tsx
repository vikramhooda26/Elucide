import * as React from "react";
import {
    Dumbbell,
    BarChart,
    FileText,
    Trophy,
    Users,
    Building,
} from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
} from "../../../components/ui/resizable";
import { TMail } from "../../../features/templates/examples/mail/data";
import { Nav, NavProps } from "../athlete/new-nax";
import { cn } from "../../../lib/utils";
import { NAVIGATION_ROUTES } from "../../../lib/constants";

interface MailProps {
    accounts: {
        label: string;
        email: string;
        icon: React.ReactNode;
    }[];
    mails: TMail[];
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export const SideMenu = ({
    defaultLayout = [10],
    defaultCollapsed = false,
    navCollapsedSize,
}: MailProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const SideMenuLinks: Pick<NavProps, "links"> = {
        links: [
            {
                title: "Dashboard",
                icon: BarChart,
                label: "50",
                navigateTo: NAVIGATION_ROUTES.DASHBOARD,
            },
            {
                title: "Data Entry",
                icon: FileText,
                label: "50",
                navigateTo: NAVIGATION_ROUTES.DATA_ENTRY,
            },
            {
                title: "League",
                icon: Trophy,
                label: "50",
                navigateTo: NAVIGATION_ROUTES.LEAGUE_LIST,
            },
            {
                title: "Athlete",
                icon: Dumbbell,
                label: "200",
                navigateTo: NAVIGATION_ROUTES.ATHLETE_LIST,
            },
            {
                title: "Team",
                icon: Users,
                label: "150",
                navigateTo: NAVIGATION_ROUTES.TEAM_LIST,
            },
            {
                title: "Brand",
                icon: Building,
                label: "100",
                navigateTo: NAVIGATION_ROUTES.BRAND_LIST,
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
                maxSize={12}
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
