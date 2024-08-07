import React from "react";
import { Button } from "../ui/button";

const ErrorPage: React.FC = () => {
    return (
        <div className="bg-black text-white h-dvh w-full flex flex-col items-center justify-center gap-5">
            <div className="text-center w-full">
                <h1>Oops! Something went wrong.</h1>
                <p>An unexpected error has occurred.</p>
            </div>
            <Button variant="default">
                <a href="/elucide/home">Go back to the homepage</a>
            </Button>
        </div>
    );
};

export default ErrorPage;
