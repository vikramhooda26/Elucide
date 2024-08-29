import { RouterProvider } from "react-router-dom";
import { ScrollToTopButton } from "../components/button/ScrollToTopButton";
import routes from "./Routes";

function MainRouter() {
    return (
        <>
            <RouterProvider router={routes()} />
            <ScrollToTopButton />
        </>
    );
}

export default MainRouter;
