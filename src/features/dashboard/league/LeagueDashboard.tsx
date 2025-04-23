import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useUser } from "../../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import DashboardService from "../../../services/features/DashboardService";
import { listLoadingAtom } from "../../../store/atoms/global";
import { league } from "../../../types/league/LeagueListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { Overview } from "../components/overview";
import LeagueRecentList from "./component/LeagueRecentList";
import { PieChartComponent, TchartData } from "../components/PieChart";
import { getRandomColor } from "../../utils/helpers";
import { ChartConfig } from "../../../components/ui/chart";
import SimpleTable, { ColumnDefinition } from "@/components/table/SimpleTable";

type TDashBoardData = {
  leaguesCount: number;
  numberOfLeaguesPerSport: Array<any>;
  // numberOfLeaguesPerSport: {
  //     chartData: TchartData[];
  //     chartConfig: ChartConfig;
  // };
  recentlyAddedLeagues: Array<any>;
  recentlyModifiedLeagues: Array<any>;
};

type Props = {
  setCount?: (num: number) => void;
};

function LeagueDashboard({ setCount }: Props) {
  const [dashboardData, setDashboardData] = useState<TDashBoardData>();
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return;
  }

  const fetch = async () => {
    try {
      setIsLoading(true);
      const resp = await DashboardService.league();
      if (resp?.status === HTTP_STATUS_CODES.OK) {
        const data = resp?.data;

        const recentCreated = data.recentlyAddedLeagues?.slice(0, 6);

        recentCreated.forEach((league: league, i: number) => {
          recentCreated[i].createdBy = league?.createdBy?.email || "";
          recentCreated[i].modifiedBy = league?.modifiedBy?.email || "";
        });

        data.recentlyAddedLeagues = recentCreated;

        const recentModified = data.recentlyModifiedLeagues?.slice(0, 6);

        recentModified.forEach((league: league, i: number) => {
          recentModified[i].createdBy = league?.createdBy?.email || "";
          recentModified[i].modifiedBy = league?.modifiedBy?.email || "";
        });

        data.recentlyModifiedLeagues = recentModified;

        // const chartData: TchartData[] = [];
        // const chartConfig: any = { total: { label: "Total Leagues" } };

        // data?.numberOfLeaguesPerSport?.forEach((d: any, i: number) => {
        //     if (d?._count.dashapp_leagueinfo > 0) {
        //         chartData?.push({
        //             name: d?.name || "",
        //             total: d?._count.dashapp_leagueinfo || 1,
        //             fill: getRandomColor(i)
        //         });
        //         chartConfig[d?.name] = {
        //             label: d?.name,
        //             color: getRandomColor(i)
        //         };
        //     }
        // });

        // data.numberOfLeaguesPerSport = { chartData, chartConfig };

        data.numberOfLeaguesPerSport = data.numberOfLeaguesPerSport?.map((league: any, i: number) => {
          return { sport: league?.name, leagueCount: league?._count?.dashapp_leagueinfo };
        });

        setCount?.(data?.leaguesCount || 0);
        setDashboardData(data);
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError) {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const viewRoute = NAVIGATION_ROUTES.LEAGUE;

  const columnDefinitions: ColumnDefinition[] = [
    { key: "sport", label: "Sports Name" },
    { key: "leagueCount", label: "Number of League" }
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent className="pl-2">
            <div className="pb-2 pl-4">Leagues-Sports Overview</div>
            <div className="scrollbar h-96 overflow-y-scroll">
              <SimpleTable
                data={dashboardData?.numberOfLeaguesPerSport}
                columns={columnDefinitions}
                caption="Category Brands Overview"
              />
            </div>
            {/* {dashboardData?.numberOfLeaguesPerSport ? (
                            <PieChartComponent
                                chart={dashboardData?.numberOfLeaguesPerSport}
                                displayName={"Leagues-Sports"}
                            />
                        ) : null} */}
          </CardContent>
        </Card>
        {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
        <LeagueRecentList
          recentlyCreated={dashboardData?.recentlyAddedLeagues || []}
          recentlyModified={dashboardData?.recentlyModifiedLeagues || []}
          viewRoute={viewRoute}
        />
      </div>
    </>
  );
}

export default LeagueDashboard;
