import { ReactNode } from "react";

export type loginType = 'adminLogin' | 'athleteLogin' | 'teamLogin' | 'brandLogin' | 'leagueLogin';

export type routeObjType = {
    path: string;
    element: ReactNode;
    children?: routeObjType[] | [] | undefined;
}

export type routeChildrenType = {
    path: string;
    element: ReactNode;
    access: Array<loginType>;
    children?: routeChildrenType[] | [] | undefined;
}

export type sideMenuObjType = {
    label: string;
    icon: string;
    route: string;
    access: Array<loginType>;
}