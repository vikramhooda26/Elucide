import { ScrollToTopButton } from "@/components/button/ScrollToTopButton";
import { useAuth } from "@/features/auth/auth-provider/AuthProvider";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ResizablePanel, ResizablePanelGroup } from "../../components/ui/resizable";
import { TooltipProvider } from "../../components/ui/tooltip";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { accounts, mails } from "./athlete/data";
import DashboardNavbar from "./components/DashboardNavbar";
import { SideMenu } from "./components/SideMenu";

function MainLayout() {
  const [defaultLayout, setDefaultLayout] = useState(undefined);
  const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);
  const { width } = useWindowDimensions();
  const { isAuthenticated } = useAuth();

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

  useEffect(() => {
    const CHATLING_SCRIPT_ID = "chatling-embed-script";
    const CHATLING_WIDGET_ID = "chatling-widget";

    const addChatlingScript = () => {
      console.log("Adding Chatling script...");

      const script = document.createElement("script");
      script.id = CHATLING_SCRIPT_ID;
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;

      if (!document.getElementById(CHATLING_SCRIPT_ID)) {
        document.body.appendChild(script);
        console.log("Chatling script successfully added.");
      } else {
        console.warn("Chatling script already exists.");
      }

      window.chtlConfig = { chatbotId: "4211148512" };
    };

    const removeChatlingScript = () => {
      const script = document.getElementById(CHATLING_SCRIPT_ID);
      if (script) {
        script.remove();
      }

      const widget = document.getElementById(CHATLING_WIDGET_ID);
      if (widget) {
        widget.remove();
      }

      document.querySelectorAll('[id^="chatling"]').forEach((element) => {
        element.remove();
      });

      if ("chtlConfig" in window) {
        delete window.chtlConfig;
      }
    };

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        addChatlingScript();
      } else {
        removeChatlingScript();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      removeChatlingScript();
    };
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <div className="relative h-full w-full">
        <div className="h-full w-full">
          <div className="relative h-20 w-full">
            <DashboardNavbar />
          </div>
          <div className="relative h-full w-full px-4 lg:hidden">{width <= 1024 && <Outlet />}</div>
        </div>
        <div className="relative flex h-full w-full max-lg:hidden">
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
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
              <ResizablePanel style={{ overflow: "clip" }}>
                <div className="h-full w-full px-4">{width > 1024 && <Outlet />}</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TooltipProvider>
        </div>
      </div>
      <ScrollToTopButton />
    </React.Fragment>
  );
}

export default MainLayout;
