import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ModeToggle } from "../../../components/ui/ModeToggle";
import { ShowOffNav } from "./ShowOffNav";

function ShowOffHeader() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }
    return (
        <div className="border-b px-10 ">
            <div className="flex h-16 items-center px-4">
                <div className="text-2xl ">Elucide Sports</div>
                <ShowOffNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <Button onClick={handleLoginClick} size="sm" className="h-8 gap-1 dark:bg-white bg-stone-500">
                        {/* <PlusCircle className="h-3.5 w-3.5" /> */}
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Login
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ShowOffHeader;