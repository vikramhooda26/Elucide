import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleBack}
            type="button"
        >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
        </Button>
    );
}

export default BackButton;
