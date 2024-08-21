import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./components/SideMenu";
import {
    ResizablePanel,
    ResizablePanelGroup
} from "../../components/ui/resizable";
import { TooltipProvider } from "../../components/ui/tooltip";
import useWindowDimensions from "../../hooks/useWindowDimension";

function DataEntryList() {
    const [defaultLayout, setDefaultLayout] = useState(undefined);
    const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);
    const { width } = useWindowDimensions();

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
        <div className="h-full w-full">
            <div className="relative h-full w-full px-4 py-8 lg:hidden">
                {width <= 1024 && <Outlet />}
            </div>
            <div className="relative flex h-full w-full max-lg:hidden">
                <TooltipProvider delayDuration={0}>
                    <ResizablePanelGroup
                        direction="horizontal"
                        onLayout={(sizes: number[]) => {
                            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
                                sizes
                            )}`;
                        }}
                        className="h-full items-stretch gap-4"
                        style={{ overflow: "clip" }}
                    >
                        <SideMenu
                            defaultLayout={defaultLayout}
                            defaultCollapsed={defaultCollapsed}
                            navCollapsedSize={4}
                        />
                        <ResizablePanel>
                            <div className="h-full w-full px-4 py-8">
                                {width > 1024 && <Outlet />}
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </TooltipProvider>
            </div>
        </div>
    );
}

export default DataEntryList;
