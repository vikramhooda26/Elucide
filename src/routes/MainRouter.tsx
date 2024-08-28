import { RouterProvider } from "react-router-dom";
import routes from "./Routes";
import { NotFoundPage } from "../components/not-found";

function MainRouter() {
    return <RouterProvider router={routes()} />;
}

export default MainRouter;
