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
import SimpleTable, { ColumnDefinition } from "../../../components/table/SimpleTable";

type TDashBoardData = {
    teamsCount: number;
    numberOfTeamsPerSport: Array<any>;
    numberOfTeamsPerState: Array<any>;
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

                data.numberOfTeamsPerSport = data?.numberOfTeamsPerSport?.map((d: any) => {
                    return {
                        name: d?.name || '',
                        total: d?._count?.dashapp_team || 0
                    }
                })

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

    const sampleData = [
        { hqState: "Andhra Pradesh", teamsCount: 23 },
        { hqState: "Arunachal Pradesh", teamsCount: 22 },
        { hqState: "Assam", teamsCount: 25 },
        { hqState: "Bihar", teamsCount: 11 },
        { hqState: "Chhattisgarh", teamsCount: 37 },
        { hqState: "Goa", teamsCount: 19 },
        { hqState: "Gujarat", teamsCount: 45 },
        { hqState: "Haryana", teamsCount: 32 },
        { hqState: "Himachal Pradesh", teamsCount: 28 },
        { hqState: "Jharkhand", teamsCount: 14 },
        { hqState: "Karnataka", teamsCount: 40 },
        { hqState: "Kerala", teamsCount: 27 },
        { hqState: "Madhya Pradesh", teamsCount: 33 },
        { hqState: "Maharashtra", teamsCount: 38 },
        { hqState: "Manipur", teamsCount: 12 },
        { hqState: "Meghalaya", teamsCount: 20 },
        { hqState: "Mizoram", teamsCount: 15 },
        { hqState: "Nagaland", teamsCount: 18 },
        { hqState: "Odisha", teamsCount: 29 },
        { hqState: "Punjab", teamsCount: 26 },
        { hqState: "Rajasthan", teamsCount: 35 },
        { hqState: "Sikkim", teamsCount: 13 },
        { hqState: "Tamil Nadu", teamsCount: 44 },
        { hqState: "Telangana", teamsCount: 41 },
        { hqState: "Tripura", teamsCount: 16 },
        { hqState: "Uttar Pradesh", teamsCount: 47 },
        { hqState: "Uttarakhand", teamsCount: 21 },
        { hqState: "West Bengal", teamsCount: 39 }
    ]

    const columnDefinitions: ColumnDefinition[] = [
        { key: "hqState", label: "HQ State " },
        { key: "teamsCount", label: "Number of Teams" },
    ]

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 ">
                        <div className="pl-4 pb-2">Category Brands Overview</div>
                        <div className=" h-96 overflow-y-scroll scrollbar ">
                            <SimpleTable
                                data={sampleData}
                                columns={columnDefinitions}
                                caption="Teams HQ State Overview"
                            />
                        </div>
                        {/* <Overview data={dashboardData?.categoriesCount} /> */}
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
