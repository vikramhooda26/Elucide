import LightModeLogo from "@/assets/elucide-sports-logo-transparent.png";
import DarkModeLogo from "@/assets/elucide-sports-logo-white-transparent.png";
import { Hamburger } from "@/components/hamburger/Hamburger";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { dataEntrySideMenuLinks } from "@/features/data-entry/components/SideMenu";
import { useDebounce } from "@/hooks/useDebounce";
import { useUser } from "@/hooks/useUser";
import { NAVIGATION_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme/theme-provider";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./MainNav";
import { SideMenuLinks } from "./SideMenu";
import { UserNav } from "./UserNav";

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
        "w-full border-b bg-background py-2 transition-all duration-500 ease-in-out max-lg:fixed max-lg:top-0 max-lg:z-[999]",
        !isVisible && "pointer-events-none !-top-20"
      )}
    >
      <div className="flex h-16 items-center px-4">
        <div className="z-[9999] h-8 cursor-pointer overflow-hidden text-2xl">
          <img
            src={theme === "light" ? LightModeLogo : DarkModeLogo}
            className="h-full object-contain object-center"
            onClick={() => navigate(NAVIGATION_ROUTES.DASHBOARD)}
          />
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <GlobalSearch /> */}
          <ModeToggle />
          <UserNav />
          {showDataEntryMenu ? (
            <Hamburger
              isActive={showDataEntryMenu}
              setIsActive={setShowDataEntryMenu}
              className={cn(
                "stroke-[#020817] dark:stroke-white",
                showDataEntryMenu && "stroke-white dark:stroke-white"
              )}
            />
          ) : (
            <Hamburger
              isActive={showMenu}
              setIsActive={setShowMenu}
              className={cn("stroke-[#020817] dark:stroke-white", showMenu && "stroke-white dark:stroke-white")}
            />
          )}
        </div>
      </div>
      <div
        className={cn(
          "fixed top-0 z-50 flex h-screen w-full flex-col items-start justify-start gap-5 bg-[#020817] py-24 transition-all duration-500 ease-in-out lg:hidden",
          showMenu ? "left-0" : "-left-[200%]"
        )}
      >
        {SideMenuLinks.links.map(
          (navLink, index) =>
            navLink.roles.some((role) => role === user?.role) && (
              <div
                key={index}
                className="textshine w-full border-b border-t text-4xl md:active:brightness-50"
                onClick={() => {
                  if (navLink.navigateTo === NAVIGATION_ROUTES.DATA_ENTRY_LIST) {
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
          "fixed top-0 z-50 flex h-screen w-full flex-col items-start justify-start gap-5 overflow-auto bg-[#020817] py-24 transition-all duration-500 ease-in-out lg:hidden",
          showDataEntryMenu ? "left-0" : "-left-[200%]"
        )}
      >
        {dataEntrySideMenuLinks.links.map(
          (navLink, index) =>
            navLink.roles.some((role) => role === user?.role) && (
              <div
                key={index}
                className="textshine w-full border-b border-t text-4xl md:active:brightness-50"
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
