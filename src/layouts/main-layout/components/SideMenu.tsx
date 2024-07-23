import {
  ArrowLeft,
  ArrowRight,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Users2
} from "lucide-react";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth/AuthService";
import { loginType, sideMenuObjType } from "../../../types/routes/RoutesTypes";
import { SidemenuLayout } from "./SidemenuLayout";

const menusList: sideMenuObjType[] = [
  {
    title: 'Dashboard',
    icon: Inbox,
    route: "/",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "default",
  },
  {
    title: 'Athlete',
    icon: File,
    route: "/athlete/list",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "ghost",
  },
  {
    title: 'Team',
    icon: Send,
    route: "/team/list",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "ghost",
  },
  {
    title: 'Brand',
    icon: ShoppingCart,
    route: "/brand/list",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "ghost",
  },
  {
    title: 'League',
    icon: MessagesSquare,
    route: "/task/list",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "ghost",
  },
  {
    title: 'Mail',
    icon: Users2,
    route: "/mail/list",
    access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    variant: "ghost",
  }
];


function SideMenu() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const loginRole: loginType = AuthService.getUser()?.role;
  const [allowedMenus, setAllowedMenus] = useState<sideMenuObjType[]>([]);

  useEffect(() => {
    const menus = menusList?.filter((d) => d?.access?.some((x) => x === loginRole));
    setAllowedMenus(menus);
  }, [loginRole])


  return (
    <div className=" relative flex-col md:flex p-2 border rounded-md">
      <SidemenuLayout
        sidemenus={allowedMenus}
        isCollapsed={isCollapsed}
      />
      <div onClick={() => setIsCollapsed(pv => !pv)} className="absolute -right-4 top-20 w-7 h-7 border rounded-md flex items-center justify-center">
        {isCollapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
      </div>
    </div>
  )
}

export default SideMenu;