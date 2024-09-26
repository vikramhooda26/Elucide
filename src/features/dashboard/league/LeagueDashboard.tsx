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
import { league } from "../../../types/league/LeagueListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { Overview } from "../components/overview";
import LeagueRecentList from "./component/LeagueRecentList";

type TDashBoardData = {
    leaguesCount: number;
    numberOfLeaguesPerSport: Array<any>;
    recentlyAddedLeagues: Array<any>;
    recentlyModifiedLeagues: Array<any>;
}

type Props = {
    setCount?: (num: number) => void;
}

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

                data.numberOfTeamsPerSport = data?.numberOfLeaguesPerSport?.map((d: any) => {
                    return {
                        name: d?.name || '',
                        total: d?._count?.dashapp_league || 0
                    }
                })

                setCount?.(data?.leaguesCount || 0);
                console.log('data -=-', data);
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

    console.log('dashboardData -=- ', dashboardData);


    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={dashboardData?.numberOfLeaguesPerSport} />
                    </CardContent>
                </Card>
                {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
                <LeagueRecentList
                    recentlyCreated={dashboardData?.recentlyAddedLeagues || []}
                    recentlyModified={dashboardData?.recentlyModifiedLeagues || []}
                />
            </div>
        </>
    );
}

export default LeagueDashboard;
