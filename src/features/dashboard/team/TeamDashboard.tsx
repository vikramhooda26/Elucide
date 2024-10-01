import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "../../../components/ui/card";
import { useUser } from "../../../hooks/useUser";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import DashboardService from "../../../services/features/DashboardService";
import { listLoadingAtom } from "../../../store/atoms/global";
import { team } from "../../../types/team/TeamListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { Overview } from "../components/overview";
import TeamRecentList from "./component/TeamRecentList";
import SimpleTable, { ColumnDefinition, TableData } from "../../../components/table/SimpleTable";
import { PieChartComponent, TchartData } from "../components/PieChart";
import { ChartConfig } from "../../../components/ui/chart";
import { getRandomColor } from "../../utils/helpers";

type TDashBoardData = {
    teamsCount: number;
    numberOfTeamsPerSport: {
        chartData: TchartData[], chartConfig: ChartConfig
    };
    numberOfTeamsPerState: TableData[];
    recentlyAddedTeams: Array<any>;
    recentlyModifiedTeams: Array<any>;
}

type Props = {
    setCount?: (num: number) => void;
}

function TeamDashboard({ setCount }: Props) {
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
            const resp = await DashboardService.team();
            if (resp?.status === HTTP_STATUS_CODES.OK) {
                const data = resp?.data;

                const recentCreated = data.recentlyAddedTeams?.slice(0, 6);

                recentCreated.forEach((team: team, i: number) => {
                    recentCreated[i].createdBy = team?.createdBy?.email || "";
                    recentCreated[i].modifiedBy = team?.modifiedBy?.email || "";
                });

                data.recentlyAddedTeams = recentCreated;

                const recentModified = data?.recentlyModifiedTeams?.slice(0, 6);

                recentModified?.forEach((team: team, i: number) => {
                    recentModified[i].createdBy = team?.createdBy?.email || "";
                    recentModified[i].modifiedBy = team?.modifiedBy?.email || "";
                });

                data.recentlyModifiedTeams = recentModified;

                data.numberOfTeamsPerState = data.numberOfTeamsPerState?.map((team: any, i: number) => {
                    return { hqState: team?.state || '', teamsCount: team?._count?.dashapp_team || 0 }
                });

                const chartData: TchartData[] = [];
                const chartConfig: any = { total: { label: "Total Teams", }, };

                data?.numberOfTeamsPerSport?.forEach((d: any, i: number) => {
                    if (d?._count.dashapp_team > 0) {
                        chartData?.push({ name: d?.name || '', total: d?._count.dashapp_team || 1, fill: getRandomColor(i) })
                        chartConfig[d?.name] = {
                            label: d?.name,
                            color: getRandomColor(i),
                        };
                    }
                });

                data.numberOfTeamsPerSport = { chartData, chartConfig }

                setCount?.(data?.teamsCount || 0);
                setDashboardData(data);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
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

    const columnDefinitions: ColumnDefinition[] = [
        { key: "hqState", label: "HQ State " },
        { key: "teamsCount", label: "Number of Teams" },
    ]

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 ">
                        <div className="pl-4 pb-2">Category Brands Overview</div>
                        <div className=" h-96 overflow-y-scroll scrollbar ">
                            <SimpleTable
                                data={dashboardData?.numberOfTeamsPerState}
                                columns={columnDefinitions}
                                caption="Teams HQ State Overview"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Teams Per Sport</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 ">
                        <div className="pl-4 pb-2">Teams Per Sport Overview</div>
                        {dashboardData?.numberOfTeamsPerSport ?
                            <PieChartComponent chart={dashboardData?.numberOfTeamsPerSport} displayName={'Team-Sports'} />
                            : null}
                    </CardContent>
                </Card>
                {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
                <TeamRecentList
                    recentlyCreated={dashboardData?.recentlyAddedTeams || []}
                    recentlyModified={dashboardData?.recentlyModifiedTeams || []}
                />
            </div>
        </>
    );
}

export default TeamDashboard;
