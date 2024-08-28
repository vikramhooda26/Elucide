import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useRouteError } from "react-router-dom";
import { toast } from "sonner";
import { NAVIGATION_ROUTES } from "../../lib/constants";

const GlobalErrorHandler: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    useEffect(() => {
        toast.error("Application Error!", {
            description: "Please contact the developer for support!"
        });
    }, []);

    return (
        <div className="flex h-dvh w-full flex-col items-center justify-center gap-5 bg-black text-white">
            <div className="w-full text-center">
                <h1>An unexpected error has occurred!</h1>
                <p>
                    If the error persists, please contact the developer for
                    support
                </p>
            </div>
            <Button variant="link">
                <Link to={NAVIGATION_ROUTES.HOME} replace>
                    Go back to the Home Page
                </Link>
            </Button>
        </div>
    );
};

export default GlobalErrorHandler;
