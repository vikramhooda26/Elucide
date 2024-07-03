import { ReactNode } from "react";

export type routeObjType = {
    path: string;
    element: ReactNode;
    children?: routeObjType[] | [];
}

export type routeChildrenType = {
    path: string;
    element: ReactNode;
    access: Array<'adminLogin' | 'athleteLogin' | 'teamLogin' | 'brandLogin' | 'leagueLogin'>;
}