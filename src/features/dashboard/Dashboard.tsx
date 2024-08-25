import { Building, Dumbbell, Trophy, Users } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import OverView from "./tabs/OverView"
import { useEffect, useState } from "react"
import DashboardService from "../../services/features/DashboardService"
import { HTTP_STATUS_CODES } from "../../lib/constants"

const stakesCount = [
  {
    count: 0,
    name: "Total Brand",
    key: 'brandsCount',
    icon: <Building />,
  },
  {
    count: 0,
    name: "Total League",
    key: 'leaguesCount',
    icon: <Trophy />,
  },
  {
    count: 0,
    name: "Total Team",
    key: 'teamsCount',
    icon: <Users />,
  },
  {
    count: 0,
    name: "Total Athlete",
    key: 'athletesCount',
    icon: <Dumbbell />,
  },
];

export default function Dashboard() {

  const [stakesCountState, setStakesCountState] = useState(stakesCount);

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    const resp = await DashboardService.master();
    if (resp?.status === HTTP_STATUS_CODES.OK) {
      const data = stakesCount?.map((d) => {
        d.count = resp?.data?.[d?.key];
        return d;
      })
      setStakesCountState(data);
      console.log('data -=- ', data);
    }
  }

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
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stakesCountState?.map((c) => (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {c?.name}
                    </CardTitle>
                    {c?.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{c?.count}</div>
                    {/* <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                  </CardContent>
                </Card>
              ))}
            </div>
            <OverView />
          </div>
        </div>
      </div>
    </>
  )
}
