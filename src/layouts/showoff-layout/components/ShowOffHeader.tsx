import { useNavigate } from "react-router-dom";
import ButtonBackgroundShine from "../../../components/ui/shine-button";
// import { ModeToggle } from "../../../components/ui/ModeToggle";
// import { ShowOffNav } from "./ShowOffNav";

function ShowOffHeader() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/elucide/login");
    };
    
    return (
        <div className="border-b px-10 bg-black">
            <div className="flex h-16 items-center px-4">
                <div className="text-2xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                    Elucide Sports
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
