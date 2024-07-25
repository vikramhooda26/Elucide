import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { TRoles } from "../../lib/constants";

export type routeObjType = {
    path: string;
    element: ReactNode;
    children?: routeObjType[] | [] | undefined;
};

export type routeChildrenType = {
    path: string;
    element: ReactNode;
    access: Array<TRoles>;
    children?: routeChildrenType[] | [] | undefined;
};

export type sideMenuObjType = {
    title: string;
    icon: LucideIcon;
    route: string;
    access: Array<TRoles>;
    variant: "default" | "ghost";
};
