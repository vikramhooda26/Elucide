import { Outlet } from "react-router-dom";
import ShowOffHeader from "./components/ShowOffHeader";

function ShowOffLayout() {
    return (
        <div>
            <ShowOffHeader />
            <Outlet />
        </div>
    );
}

export default ShowOffLayout;
