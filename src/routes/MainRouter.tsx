import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import ErrorFallBack from "../components/error-boundary";
import routes from "./Routes";

function MainRouter() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <RouterProvider router={routes()} />
        </ErrorBoundary>
    );
}

export default MainRouter;
