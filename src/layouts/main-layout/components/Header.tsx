import { ModeToggle } from "../../../components/ui/ModeToggle";
import { GlobalSearch } from "./GlobalSearch";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";

function Header() {
  return (
    <div className="border-b  ">
      <div className="flex h-16 items-center px-4">
        <div className="text-2xl ">Elucide Sports</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <GlobalSearch />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Header;