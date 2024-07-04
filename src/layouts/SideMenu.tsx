import {
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "..//components/ui/dropdown-menu";
import { Button } from '../components/ui/button';
import { useNavigate } from "react-router-dom";
import { loginType, sideMenuObjType } from "../types/routes/RoutesTypes";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";

const menusList: sideMenuObjType[] = [
  {
    label: 'Dashboard',
    icon: '',
    route: "/dashboard",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    label: 'Athlete',
    icon: '',
    route: "/athlete/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    label: 'Team',
    icon: '',
    route: "/team/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    label: 'Brand',
    icon: '',
    route: "/brand/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  }
];

// submenus: [
//   {
//     label: 'Team',
//     icon: '',
//     route: "/team/list",
//     access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
//   },
// ]

function SideMenu() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // Later take from session response.
  const loginType: loginType = 'adminLogin';

  const allowedMenuList = menusList?.filter((d, i) => {
    if (d?.access?.indexOf(loginType) !== -1) { return d; };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {allowedMenuList?.map((d, i) => (
            <DropdownMenuItem onClick={() => navigate(d?.route)}>
              <User className="mr-2 h-4 w-4" />
              <span>{d?.label}</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SideMenu;