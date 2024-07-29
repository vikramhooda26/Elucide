import { Outlet } from "react-router-dom";
import DashboardNavbar from "./components/DashboardNavbar";
import { SideMenu } from "./components/SideMenu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { accounts, mails } from "../../features/templates/examples/mail/data";
import { TooltipProvider } from "../../components/ui/tooltip";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable";

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
        <div className="w-full h-full">
            <div className="w-full h-full">
                <DashboardNavbar />
            </div>

            <div className="h-full flex w-full relative">
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
                            <div className="w-full h-full py-8 px-4">
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
