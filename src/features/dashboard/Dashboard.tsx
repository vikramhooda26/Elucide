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

  const tabs = [
    {
      value: 'overview', name: 'Overview', component: <OverView />,
    },
    {
      value: 'brand', name: 'Brands', component: <BrandDashboard />,
    },
    {
      value: 'league', name: 'Leagues', component: <LeagueDashboard />,
    },
    {
      value: 'team', name: 'Teams', component: <TeamDashboard />,
    },
    {
      value: 'athlete', name: 'Athletes', component: <AthleteDashboard />,
    },
  ];

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
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              {tabs?.map((tab, i) => (
                <TabsTrigger value={tab?.value} key={i}>{tab?.name}</TabsTrigger>
              ))}
            </TabsList>
            {tabs?.map((content) => (
              <TabsContent value={content?.value} className="space-y-4">
                {content?.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  )
}
