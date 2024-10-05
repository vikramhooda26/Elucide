import { useNavigate } from "react-router-dom";
import ButtonBackgroundShine from "../../../components/ui/shine-button";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import Logo from "../../../assets/elucide-sports-logo-white-transparent.png";
import { useAuth } from "../../auth/auth-provider/AuthProvider";

export const HomePageNavbar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    return (
        <div className="border-b bg-black px-10">
            <div className="flex h-20 items-center px-4">
                <div
                    className="flex h-8 w-full cursor-pointer items-center max-sm:justify-center"
                    onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
                >
                    <img src={Logo} className="h-full object-contain object-center" />
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    <ButtonBackgroundShine
                        onClick={() =>
                            isAuthenticated ? navigate(NAVIGATION_ROUTES.DASHBOARD) : navigate(NAVIGATION_ROUTES.LOGIN)
                        }
                        className="max-sm:hidden"
                    >
                        {isAuthenticated ? "Dashboard" : "Login"}
                    </ButtonBackgroundShine>
                </div>
            </div>
        </div>
    );
};
