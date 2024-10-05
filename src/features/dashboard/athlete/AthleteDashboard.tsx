import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useUser } from "../../../hooks/useUser";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import DashboardService from "../../../services/features/DashboardService";
import { listLoadingAtom } from "../../../store/atoms/global";
import { athlete } from "../../../types/athlete/AthleteListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { Overview } from "../components/overview";
import AthleteRecentList from "./component/AthleteRecentList";
import { PieChartComponent, TchartData } from "../components/PieChart";
import { getRandomColor } from "../../utils/helpers";
import { ChartConfig } from "../../../components/ui/chart";

type TDashBoardData = {
    athletesCount: number;
    numberOfAthletesPerSport: {
        chartData: TchartData[];
        chartConfig: ChartConfig;
    };
    recentlyAddedAthletes: Array<any>;
    recentlyModifiedAthletes: Array<any>;
};

type Props = {
    setCount?: (num: number) => void;
};

function AthleteDashboard({ setCount }: Props) {
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
            const resp = await DashboardService.athlete();
            if (resp?.status === HTTP_STATUS_CODES.OK) {
                const data = resp?.data;

                const rcAthletes = data.recentlyAddedAthletes?.slice(0, 6);

                rcAthletes.forEach((athlete: athlete, i: number) => {
                    rcAthletes[i].createdBy = athlete?.createdBy?.email || "";
                    rcAthletes[i].modifiedBy = athlete?.modifiedBy?.email || "";
                });

                data.recentlyAddedAthletes = rcAthletes;

                const rmAthletes = data.recentlyModifiedAthletes?.slice(0, 6);

                rmAthletes.forEach((athlete: athlete, i: number) => {
                    rmAthletes[i].createdBy = athlete?.createdBy?.email || "";
                    rmAthletes[i].modifiedBy = athlete?.modifiedBy?.email || "";
                });

                data.recentlyModifiedAthletes = rmAthletes;

                const chartData: TchartData[] = [];
                const chartConfig: any = { total: { label: "Total Athletes" } };

                data?.numberOfAthletesPerSport?.forEach((d: any, i: number) => {
                    if (d?._count.dashapp_athlete > 0) {
                        chartData?.push({
                            name: d?.name || "",
                            total: d?._count.dashapp_athlete || 1,
                            fill: getRandomColor(i)
                        });
                        chartConfig[d?.name] = {
                            label: d?.name,
                            color: getRandomColor(i)
                        };
                    }
                });

                data.numberOfAthletesPerSport = { chartData, chartConfig };

                setCount?.(data?.athletesCount || 0);
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

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <Overview data={dashboardData?.numberOfAthletesPerSport} /> */}
                        {dashboardData?.numberOfAthletesPerSport ? (
                            <PieChartComponent
                                chart={dashboardData?.numberOfAthletesPerSport}
                                displayName={"Athletes-Sports"}
                            />
                        ) : null}
                    </CardContent>
                </Card>
                {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
                <AthleteRecentList
                    recentlyCreated={dashboardData?.recentlyAddedAthletes || []}
                    recentlyModified={dashboardData?.recentlyModifiedAthletes || []}
                />
            </div>
        </>
    );
}

export default AthleteDashboard;
