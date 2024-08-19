import { Button } from "../../components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import AthleteDashboard from "./athlete/AthleteDashboard"
import BrandDashboard from "./brand/BrandDashboard"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import LeagueDashboard from "./league/LeagueDashboard"
import OverView from "./tabs/OverView"
import TeamDashboard from "./team/TeamDashboard"

export default function Dashboard() {

  return (
    <>
      <div className=" flex-col md:flex">

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Search</Button>
            </div>
          </div>
          <OverView />
        </div>
      </div>
    </>
  )
}
