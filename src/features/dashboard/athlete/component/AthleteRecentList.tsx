import React, { useEffect, useState } from "react";
import RecentList from "../../components/RecentList";
import { toast } from "sonner";
import ErrorService from "../../../../services/error/ErrorService";
import { athlete } from "../../../../types/athlete/AthleteListTypes";
import AthleteService from "../../../../services/features/AthleteService";
import { HTTP_STATUS_CODES } from "../../../../lib/constants";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/auth-provider/AuthProvider";
import { useSetRecoilState } from "recoil";
import { listLoadingAtom } from "../../../../store/atoms/global";
import useNavigator from "../../../../hooks/useNavigator";

function AthleteRecentList() {
    const navigator = useNavigator();
    const [athleteList, setAthleteList] = useState<any[]>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchAthletes = async () => {
        try {
            setIsLoading(true);
            const response = await AthleteService.getAll();
            if (response.status === HTTP_STATUS_CODES.OK) {
                const athletes = response.data?.slice(0, 6);
                athletes.forEach((brand: athlete, i: number) => {
                    athletes[i].createdBy = brand?.createdBy?.email || "";
                    athletes[i].modifiedBy = brand?.modifiedBy?.email || "";
                });
                setAthleteList(athletes);
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
        fetchAthletes();
    }, []);
    return (
        <>
            <RecentList
                title={"Added Athletes"}
                list={athleteList}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdDate"}
                operationKey={"createdBy"}
            />
            <RecentList
                title={"Modified Athletes"}
                list={athleteList}
                operation={"modified by"}
                nameKey={"name"}
                dateKey={"modifiedDate"}
                operationKey={"modifiedBy"}
            />
        </>
    );
}

export default AthleteRecentList;
