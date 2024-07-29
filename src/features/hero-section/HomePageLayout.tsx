import { Outlet } from "react-router-dom";
import { HomePageNavbar } from "./components/HomePageNavbar";

export const HomePageLayout: React.FC = (): JSX.Element => {
    return (
        <div>
            <HomePageNavbar />
            <Outlet />
        </div>
    );
};
