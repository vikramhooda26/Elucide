import { Outlet } from "react-router-dom";
// import Footer from "../main-layout/components/Footer";
import ShowOffHeader from "./components/ShowOffHeader";

function ShowOffLayout() {
    return (
        <div className="">
            <div className="w-full h-full">
                {" "}
                <ShowOffHeader />
            </div>
            <div className="">
                <div>
                    <Outlet />
                </div>
            </div>
            <div className="">{/* <Footer /> */}</div>
        </div>
    );
}

export default ShowOffLayout;
