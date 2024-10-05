import * as React from "react";
import { ArchiveX, Dumbbell, File, Search, Trophy, Users } from "lucide-react";

import { cn } from "../../../lib/utils";
import { TooltipProvider } from "../../../components/ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../../components/ui/resizable";
import { Separator } from "../../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { AccountSwitcher } from "./account-switcher";
import { Nav, NavProps } from "./new-nax";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";
import { useRecoilValue } from "recoil";
import { configAtom } from "./use-mail";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { TMail } from "./data";
import { SideMenuLinks } from "../components/SideMenu";

interface MailProps {
    accounts: {
        label: string;
        email: string;
        icon: React.ReactNode;
    }[];
    mails: TMail[];
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export function Mail({ mails, defaultLayout = [20, 32, 48], defaultCollapsed = false, navCollapsedSize }: MailProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const mail = useRecoilValue(configAtom);

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={10}
                    maxSize={10}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                    onCollapse={() => {
                        setIsCollapsed(true);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
                    }}
                    onResize={() => {
                        setIsCollapsed(false);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
                    }}
                >
                    <Nav isCollapsed={isCollapsed} links={SideMenuLinks.links} />
                    <Separator />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <Tabs defaultValue="all">
                        <div className="flex items-center px-4 py-2">
                            <h1 className="text-xl font-bold">Inbox</h1>
                            <TabsList className="ml-auto">
                                <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                    All mail
                                </TabsTrigger>
                                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                    Unread
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search" className="pl-8" />
                                </div>
                            </form>
                        </div>
                        <TabsContent value="all" className="m-0">
                            <MailList items={mails} />
                        </TabsContent>
                        <TabsContent value="unread" className="m-0">
                            <MailList items={mails.filter((item) => !item.read)} />
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
