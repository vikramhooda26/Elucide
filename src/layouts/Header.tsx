import { GlobalSearch } from "./components/GlobalSearch";
import { MainNav } from "./components/MainNav";
import { UserNav } from "./components/UserNav";

function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Elucide Sports</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <GlobalSearch />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Header;