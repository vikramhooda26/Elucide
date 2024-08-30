import { RouterProvider } from "react-router-dom";
import { ScrollToTopButton } from "../components/button/ScrollToTopButton";
import routes from "./Routes";

function MainRouter() {
    const pathname = window.location.pathname;
    return (
        <>
            <RouterProvider router={routes()} />
            {!pathname.startsWith("/elucide") && <ScrollToTopButton />}
        </>
    );
}

export default MainRouter;
