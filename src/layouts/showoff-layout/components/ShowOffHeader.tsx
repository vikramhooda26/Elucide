import { useNavigate } from "react-router-dom";
import ButtonBackgroundShine from "../../../components/ui/shine-button";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import Logo from "../../../assets/elucide-sports-logo-transparent.png";

function ShowOffHeader() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(NAVIGATION_ROUTES.LOGIN);
    };

    return (
        <div className="border-b px-10 bg-black">
            <div className="flex h-20 items-center px-4">
                <div
                    className="h-56 cursor-pointer"
                    onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
                >
                    <img
                        src={Logo}
                        className="object-contain h-full object-center"
                    />
                </div>
                {/* <ShowOffNav className="mx-6" /> */}
                <div className="ml-auto flex items-center space-x-4">
                    <ButtonBackgroundShine onClick={handleLoginClick}>
                        {/* <PlusCircle className="h-3.5 w-3.5" /> */}
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Login
                        </span>
                    </ButtonBackgroundShine>
                </div>
            </div>
        </div>
    );
}

export default ShowOffHeader;
