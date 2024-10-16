import * as React from "react";
import { Dumbbell, BarChart, FileText, Trophy, Users, Building, Telescope } from "lucide-react";
import { ResizableHandle, ResizablePanel } from "../../../components/ui/resizable";
import { Nav, NavProps } from "../athlete/new-nax";
import { cn } from "../../../lib/utils";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import { TMail } from "../athlete/data";
import DashboardService from "@/services/features/DashboardService";

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

export const SideMenuLinks: Pick<NavProps, "links"> = {
    links: [
        {
            title: "Dashboard",
            icon: BarChart,
            label: "50",
            navigateTo: NAVIGATION_ROUTES.DASHBOARD,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"]
        },
        {
            title: "Explore",
            icon: Telescope,
            label: "50",
            navigateTo: NAVIGATION_ROUTES.EXPLORE,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"]
        },
        {
            title: "Data Entry",
            icon: FileText,
            label: "50",
            navigateTo: NAVIGATION_ROUTES.DATA_ENTRY_LIST,
            roles: ["ADMIN", "SUPER_ADMIN", "STAFF"]
        },
        {
            title: "Brand",
            icon: Building,
            label: "100",
            navigateTo: NAVIGATION_ROUTES.BRAND_DASHBOARD,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"],
            key: "brandsCount",
        },
        {
            title: "League",
            icon: Trophy,
            label: "50",
            navigateTo: NAVIGATION_ROUTES.League_DASHBOARD,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"],
            key: "leaguesCount",
        },
        {
            title: "Team",
            icon: Users,
            label: "150",
            navigateTo: NAVIGATION_ROUTES.TEAM_DASHBOARD,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"],
            key: "teamsCount",
        },
        {
            title: "Athlete",
            icon: Dumbbell,
            label: "200",
            navigateTo: NAVIGATION_ROUTES.ATHLETE_DASHBOARD,
            roles: ["ADMIN", "STAFF", "SUPER_ADMIN", "USER"],
            key: "athletesCount",
        }
    ]
};

export const SideMenu = ({ defaultLayout = [15], defaultCollapsed = false, navCollapsedSize }: MailProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [sideMenus, setSideMenus] = React.useState(SideMenuLinks.links);

    React.useEffect(() => {
        fetchMasterData();
    }, []);

    const fetchMasterData = async () => {
        const resp = await DashboardService.master();
        if (resp?.status === HTTP_STATUS_CODES.OK) {
            const data = sideMenus?.map((d) => {
                d.label = d?.key && resp?.data?.[d?.key];
                return d;
            });
            setSideMenus(data);
        }
    };

    return (
        <>
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={10}
                maxSize={15}
                className={cn(isCollapsed && "relative min-w-[50px] transition-all duration-300 ease-in-out")}
                onCollapse={() => {
                    setIsCollapsed(true);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
                }}
                onResize={() => {
                    setIsCollapsed(false);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
                }}
                style={{ overflow: "clip" }}
            >
                <Nav isCollapsed={isCollapsed} links={SideMenuLinks.links} />
            </ResizablePanel>
            <ResizableHandle withHandle className="min-h-dvh" />
        </>
    );
};
