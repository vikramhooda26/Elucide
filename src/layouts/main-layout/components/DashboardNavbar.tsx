import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LightModeLogo from "../../../assets/elucide-sports-logo-transparent.png";
import DarkModeLogo from "../../../assets/elucide-sports-logo-white-transparent.png";
import { Hamburger } from "../../../components/hamburger/Hamburger";
import { ModeToggle } from "../../../components/ui/ModeToggle";
import { useDebounce } from "../../../hooks/useDebounce";
import { useUser } from "../../../hooks/useUser";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { cn } from "../../../lib/utils";
import { useTheme } from "../../../provider/theme/theme-provider";
import { GlobalSearch } from "./GlobalSearch";
import { MainNav } from "./MainNav";
import { SideMenuLinks } from "./SideMenu";
import { UserNav } from "./UserNav";
import { dataEntrySideMenuLinks } from "../../../features/data-entry/components/SideMenu";

const DashboardNavbar = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showDataEntryMenu, setShowDataEntryMenu] = useState<boolean>(false);
    const user = useUser();
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [scrollY, setScrollY] = useState<number>(0);
    const dbScrollY = useDebounce(scrollY, 50);

    const handleScroll = useCallback(() => {
        if (typeof window !== "undefined") {
            const cur = window.scrollY;
            setIsVisible(dbScrollY > cur || cur < 10);
            setScrollY(cur);
        }
    }, [dbScrollY]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (showMenu || showDataEntryMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [showMenu, showDataEntryMenu]);

    return (
        <div
            className={cn(
                "border-b py-2 max-lg:z-[999] transition-all duration-500 ease-in-out w-full max-lg:fixed max-lg:top-0 bg-background",
                !isVisible && "pointer-events-none !-top-20"
            )}
        >
            <div className="flex h-16 items-center px-4">
                <div className="text-2xl h-8 overflow-hidden cursor-pointer z-[9999]">
                    <img
                        src={theme === "light" ? LightModeLogo : DarkModeLogo}
                        className="object-contain object-center h-full"
                        onClick={() => navigate(NAVIGATION_ROUTES.DASHBOARD)}
                    />
                </div>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <GlobalSearch />
                    <ModeToggle />
                    <UserNav />
                    {showDataEntryMenu ? (
                        <Hamburger
                            isActive={showDataEntryMenu}
                            setIsActive={setShowDataEntryMenu}
                            className={cn(
                                "dark:stroke-white stroke-[#020817]",
                                showDataEntryMenu &&
                                    "stroke-white dark:stroke-white"
                            )}
                        />
                    ) : (
                        <Hamburger
                            isActive={showMenu}
                            setIsActive={setShowMenu}
                            className={cn(
                                "dark:stroke-white stroke-[#020817]",
                                showMenu && "stroke-white dark:stroke-white"
                            )}
                        />
                    )}
                </div>
            </div>
            <div
                className={cn(
                    "fixed h-screen gap-5 lg:hidden top-0 w-full transition-all duration-500 ease-in-out z-50 flex flex-col justify-start py-24 items-start bg-[#020817]",
                    showMenu ? "left-0" : "-left-[200%]"
                )}
            >
                {SideMenuLinks.links.map(
                    (navLink, index) =>
                        navLink.roles.some((role) => role === user?.role) && (
                            <div
                                key={index}
                                className="md:active:brightness-50 textshine text-4xl w-full border-b border-t"
                                onClick={() => {
                                    if (
                                        navLink.navigateTo ===
                                        NAVIGATION_ROUTES.DATA_ENTRY_LIST
                                    ) {
                                        setShowMenu(false);
                                        setShowDataEntryMenu(true);
                                    } else {
                                        navigate(navLink.navigateTo);
                                        setShowMenu(false);
                                    }
                                }}
                            >
                                {navLink.title}
                            </div>
                        )
                )}
            </div>
            <div
                className={cn(
                    "fixed h-screen gap-5 lg:hidden top-0 w-full overflow-auto transition-all py-24 duration-500 ease-in-out z-50 flex flex-col justify-start items-start bg-[#020817]",
                    showDataEntryMenu ? "left-0" : "-left-[200%]"
                )}
            >
                {dataEntrySideMenuLinks.links.map(
                    (navLink, index) =>
                        navLink.roles.some((role) => role === user?.role) && (
                            <div
                                key={index}
                                className="md:active:brightness-50 textshine text-4xl w-full border-b border-t"
                                onClick={() => {
                                    navigate(navLink.navigateTo);
                                    setShowDataEntryMenu(false);
                                }}
                            >
                                {navLink.title}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default DashboardNavbar;
