import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { accounts, mails } from "../../features/templates/examples/mail/data";

function MainLayout() {
    const [defaultLayout, setDefaultLayout] = useState(undefined);
    const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);

    useEffect(() => {
        const layout = Cookies.get("react-resizable-panels:layout:mail");
        const collapsed = Cookies.get("react-resizable-panels:collapsed");

        if (layout) {
            setDefaultLayout(JSON.parse(layout));
        }
        if (collapsed) {
            setDefaultCollapsed(JSON.parse(collapsed));
        }
    }, []);

    return (
        <div className="px-4 py-2 w-full h-full">
            <div className="w-full h-full m-0 mb-4">
                <Header />
            </div>

            <div className="h-full flex w-full">
                <div className="me-4 ">
                    <SideMenu
                        accounts={accounts}
                        mails={mails}
                        defaultLayout={defaultLayout}
                        defaultCollapsed={defaultCollapsed}
                        navCollapsedSize={4}
                    />
                </div>
                {/* <div className="w-full">
                    <Outlet />
                </div> */}
            </div>

            {/* <div className='w-full h-full'><Footer /></div> */}
        </div>
    );
}

export default MainLayout;
