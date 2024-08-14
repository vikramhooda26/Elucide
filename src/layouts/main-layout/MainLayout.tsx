import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./components/DashboardNavbar";
import { SideMenu } from "./components/SideMenu";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable";
import { TooltipProvider } from "../../components/ui/tooltip";
import { accounts, mails } from "./athlete/data";

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
        <div className="w-full h-full relative">
            <div className="w-full h-full">
                <div className="relative w-full h-20">
                    <DashboardNavbar />
                </div>
                <div className="w-full h-full px-4 lg:hidden relative">
                    <Outlet />
                </div>
            </div>

            <div className="h-full flex w-full relative max-lg:hidden">
                <TooltipProvider delayDuration={0}>
                    <ResizablePanelGroup
                        direction="horizontal"
                        onLayout={(sizes: number[]) => {
                            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
                                sizes
                            )}`;
                        }}
                        className="h-full items-stretch gap-4"
                    >
                        <SideMenu
                            accounts={accounts}
                            mails={mails}
                            defaultLayout={defaultLayout}
                            defaultCollapsed={defaultCollapsed}
                            navCollapsedSize={4}
                        />
                        <ResizablePanel>
                            <div className="w-full h-full px-4">
                                <Outlet />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </TooltipProvider>
            </div>
        </div>
    );
}

export default MainLayout;
