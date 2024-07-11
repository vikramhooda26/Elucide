import {
  ChevronLeft,
  ChevronRight,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Users2
} from "lucide-react";
import { useState } from "react";
import { sideMenuObjType } from "../types/routes/RoutesTypes";
import { SidemenuLayout } from "./components/SidemenuLayout";

const menusList: sideMenuObjType[] = [
  {
    title: 'Dashboard',
    icon: Inbox,
    route: "/",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "default",
  },
  {
    title: 'Athlete',
    icon: File,
    route: "/athlete/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "ghost",
  },
  {
    title: 'Team',
    icon: Send,
    route: "/team/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "ghost",
  },
  {
    title: 'Brand',
    icon: ShoppingCart,
    route: "/brand/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "ghost",
  },
  {
    title: 'Task',
    icon: MessagesSquare,
    route: "/task/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "ghost",
  },
  {
    title: 'Mail',
    icon: Users2,
    route: "/mail/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    variant: "ghost",
  }
];


function SideMenu() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className=" relative flex-col md:flex p-2 border rounded-md">
      <SidemenuLayout
        sidemenus={menusList}
        isCollapsed={isCollapsed}
      />
      <div onClick={() => setIsCollapsed(pv => !pv)} className="absolute -right-4 top-20 w-8 h-8 border rounded-md flex items-center justify-center">
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </div>
    </div>
  )
}

export default SideMenu;