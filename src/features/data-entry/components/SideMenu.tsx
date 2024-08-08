import {
    Building,
    CircleArrowOutUpRight,
    ClipboardCheck,
    Dumbbell,
    FileText,
    Handshake,
    PersonStanding,
    RefreshCcw,
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
                navigateTo: NAVIGATION_ROUTES.LEAGUE_ADMIN,
            },
            {
                title: "Athlete",
                icon: Dumbbell,
                navigateTo: NAVIGATION_ROUTES.ATHLETE_ADMIN,
            },
            {
                title: "Team",
                icon: Users,
                navigateTo: NAVIGATION_ROUTES.TEAM_ADMIN,
            },
            {
                title: "Brand",
                icon: Building,
                navigateTo: NAVIGATION_ROUTES.BRAND_ADMIN,
            },
            {
                title: "Activation",
                icon: ClipboardCheck,
                navigateTo: NAVIGATION_ROUTES.ACTIVATION_LIST,
            },
            {
                title: "Sports Deal Summary",
                icon: Handshake,
                navigateTo: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
            },
            {
                title: "Age",
                icon: RefreshCcw,
                navigateTo: NAVIGATION_ROUTES.AGE_LIST,
            },
            {
                title: "Gender",
                icon: CircleArrowOutUpRight,
                navigateTo: NAVIGATION_ROUTES.GENDER_LIST,
            },
            {
                title: "Active Campaign",
                icon: FileText,
                navigateTo: NAVIGATION_ROUTES.CAMPAIGN_LIST,
            },
            {
                title: "Personality",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.PERSONALITY_LIST,
            },
            {
                title: "Agency",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.AGENCY_LIST,
            },
            {
                title: "Asset",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.ASSET_LIST,
            },
            {
                title: "Broadcast Partner",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.BROADCAST_PARTNER_LIST,
            },
            {
                title: "City",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.CITY_LIST,
            },
            {
                title: "State",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.STATE_LIST,
            },
            {
                title: "Sub Category",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.SUB_CATEGORY_LIST,
            },
            {
                title: "Main Category",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.MAIN_CATEGORY_LIST,
            },
            {
                title: "Nccs class",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.NCCS_LIST,
            },
            {
                title: "Key Market",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.KEY_MARKET_LIST,
            },
            {
                title: "League Owner",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.LEAGUE_OWNER_LIST,
            },
            {
                title: "Level",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.LEVEL_LIST,
            },
            {
                title: "Sub Personality",
                icon: PersonStanding,
                navigateTo: NAVIGATION_ROUTES.SUB_PERSONALITY_LIST,
            },
        ],
    };

    return (
        <>
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={12}
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
