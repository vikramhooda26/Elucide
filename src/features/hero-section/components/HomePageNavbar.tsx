import { useNavigate } from "react-router-dom";
import ButtonBackgroundShine from "../../../components/ui/shine-button";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import Logo from "../../../assets/elucide-sports-logo-white-transparent.png";
import { useAuth } from "../../auth/auth-provider/AuthProvider";

export const HomePageNavbar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    return (
        <div className="border-b px-10 bg-black">
            <div className="flex h-20 items-center px-4">
                <div
                    className="h-8 cursor-pointer w-full flex items-center max-sm:justify-center"
                    onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
                >
                    <img
                        src={Logo}
                        className="object-contain h-full object-center"
                    />
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    <ButtonBackgroundShine
                        onClick={() =>
                            isAuthenticated
                                ? navigate(NAVIGATION_ROUTES.DASHBOARD)
                                : navigate(NAVIGATION_ROUTES.LOGIN)
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
