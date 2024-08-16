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

export const dataEntrySideMenuLinks: Pick<NavProps, "links"> = {
    links: [
        {
            title: "League",
            icon: Trophy,
            navigateTo: NAVIGATION_ROUTES.LEAGUE_ADMIN,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Athlete",
            icon: Dumbbell,
            navigateTo: NAVIGATION_ROUTES.ATHLETE_ADMIN,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Team",
            icon: Users,
            navigateTo: NAVIGATION_ROUTES.TEAM_ADMIN,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Brand",
            icon: Building,
            navigateTo: NAVIGATION_ROUTES.BRAND_ADMIN,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Activation",
            icon: ClipboardCheck,
            navigateTo: NAVIGATION_ROUTES.ACTIVATION_LIST,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Sports Deal Summary",
            icon: Handshake,
            navigateTo: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
            roles: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        },
        {
            title: "Age",
            icon: RefreshCcw,
            navigateTo: NAVIGATION_ROUTES.AGE_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Association Level",
            icon: RefreshCcw,
            navigateTo: NAVIGATION_ROUTES.ASSOCIATION_LEVEL_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Gender",
            icon: CircleArrowOutUpRight,
            navigateTo: NAVIGATION_ROUTES.GENDER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Active Campaign",
            icon: FileText,
            navigateTo: NAVIGATION_ROUTES.CAMPAIGN_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Personality",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.PERSONALITY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Sub Personality",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.SUB_PERSONALITY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Agency",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.AGENCY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Asset",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.ASSET_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Broadcast Partner",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.BROADCAST_PARTNER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "City",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.CITY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "State",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.STATE_LIST,
            roles: ["SUPER_ADMIN"],
        },

        {
            title: "Main Category",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.MAIN_CATEGORY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Sub Category",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.SUB_CATEGORY_LIST,
            roles: ["SUPER_ADMIN"],
        },

        {
            title: "Nccs class",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.NCCS_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Key Market",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.KEY_MARKET_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "League Owner",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.LEAGUE_OWNER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Level",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.LEVEL_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Marketing Platform",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.MARKETING_PLATFORM_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "OTT Partner",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.OTT_PARTNER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Parent Organization",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.PARENT_ORG_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Sport",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.SPORT_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Tagline",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.TAGLINE_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Team Owner",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.TEAM_OWNER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Territory",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.TERRITORY_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Tier",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.TIER_LIST,
            roles: ["SUPER_ADMIN"],
        },
        {
            title: "Country",
            icon: PersonStanding,
            navigateTo: NAVIGATION_ROUTES.COUNTRY_LIST,
            roles: ["SUPER_ADMIN"],
        },
    ],
};

export const SideMenu = ({
    defaultLayout = [15],
    defaultCollapsed = false,
    navCollapsedSize,
}: MailProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

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
                    "min-w-[50px] transition-all duration-300 ease-in-out relative"
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
                    links={dataEntrySideMenuLinks.links}
                />
            </ResizablePanel>
            <ResizableHandle
                withHandle
                className="min-h-dvh"
            />
        </>
    );
};
