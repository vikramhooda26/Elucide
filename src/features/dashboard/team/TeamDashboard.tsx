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

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={dashboardData?.numberOfTeamsPerSport} />
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
