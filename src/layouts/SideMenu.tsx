
const menusList = [
  {
    label: 'Dashboard',
    icon: '',
    route: "/dashboard",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Athlete',
    icon: '',
    route: "/athlete/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Team',
    icon: '',
    route: "/team/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Brand',
    icon: '',
    route: "/brand/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  }
]

// submenus: [
//   {
//     label: 'Team',
//     icon: '',
//     route: "/team/list",
//     access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
//   },
// ]



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

function SideMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menusList?.map((d, i) => (
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