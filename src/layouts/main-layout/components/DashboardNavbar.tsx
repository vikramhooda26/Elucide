import { ModeToggle } from "../../../components/ui/ModeToggle";
import { GlobalSearch } from "./GlobalSearch";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";
import LightModeLogo from "../../../assets/elucide-sports-logo-transparent.png";
import DarkModeLogo from "../../../assets/elucide-sports-logo-white-transparent.png";
import { useTheme } from "../../../provider/theme/theme-provider";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../../lib/constants";

const DashboardNavbar = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    return (
        <div className="border-b py-2">
            <div className="flex h-16 items-center px-4">
                <div className="text-2xl h-8 overflow-hidden cursor-pointer">
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
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
