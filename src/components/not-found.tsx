import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-black">
            <h1>404 - Page Not Found</h1>
            <h1>Looks like you have drifted away into outer space.</h1>
            <Button variant="link" onClick={() => navigate(-1)}>
                Go back!
            </Button>
        </div>
    );
};
