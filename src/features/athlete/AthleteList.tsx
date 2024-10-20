import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { ConditionalButton } from "../../components/button/ConditionalButton";
import FilterModal, { FilterContent } from "../../components/core/filter/FilterModal";
import useNavigator from "../../hooks/useNavigator";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import AthleteService from "../../services/features/AthleteService";
import { fetchFilters, TPageKey } from "../../services/filter/FilterConfigs";
import FilterService from "../../services/filter/FilterService";
import { filterState } from "../../store/atoms/filterAtom";
import { listLoadingAtom } from "../../store/atoms/global";
import { athlete } from "../../types/athlete/AthleteListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import AthleteTable from "./data/AthleteTable";

function AthleteList() {
    const navigator = useNavigator();
    const [athletes, setAthletes] = useState<Array<any>>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate();
    const userRole = useUser()?.role;

    const pageKey: TPageKey = "athleteList";
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const filterValues = useRecoilValue(filterState);

    if (!userRole) {
        return;
    }

    useEffect(() => {
        if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
            handleApplyFilters();
        } else {
            fetchAthletes();
        }
    }, []);

    const fetchAthletes = async () => {
        try {
            setIsLoading(true);
            const response = await AthleteService.getAll();
            if (response.status === HTTP_STATUS_CODES.OK) {
                let athleteList = response.data;
                athleteList.forEach((athlete: athlete, i: number) => {
                    athleteList[i].createdBy = athlete?.createdBy?.email || "N/A";
                    athleteList[i].modifiedBy = athlete?.modifiedBy?.email || "N/A";
                });

                setAthletes(athleteList);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const filterConfig: FilterContent[] = fetchFilters(pageKey);

    const handleApplyFilters = async () => {
        try {
            setIsLoading(true);
            const processedData = FilterService.processFilterData(filterValues[pageKey]);
            if (processedData?.athleteIds) {
                processedData.ids = processedData?.athleteIds;
            }
            delete processedData?.athleteIds;

            const response = await AthleteService.getFilteredAthletes(processedData);

            if (response.status === HTTP_STATUS_CODES.OK) {
                let athleteList = response.data;
                athleteList.forEach((athlete: athlete, i: number) => {
                    athleteList[i].createdBy = athlete?.createdBy?.email || "N/A";
                    athleteList[i].modifiedBy = athlete?.modifiedBy?.email || "N/A";
                });

                athleteList = FilterService.validateMatching(athleteList, filterValues[pageKey]);

                setIsFilterApplied(true);

                setAthletes(athleteList);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError?.response?.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
            } else {
                setAthletes([]);
            }
            console.log("error -=- ", error);
        } finally {
            setIsLoading(false);
        }
    };    

    return (
        <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Athlete List</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of athletes.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <FilterModal
                        isOpen={isFilterModalOpen}
                        filters={filterConfig}
                        onClose={() => setIsFilterModalOpen(false)}
                        onApplyFilters={handleApplyFilters}
                        onDiscardFilters={fetchAthletes}
                        pageKey={pageKey}
                    />
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.CREATE_ATHLETE)}
                        accessLevel="all_staff"
                    >
                        Create Athlete
                    </ConditionalButton>
                </div>
            </div>
            <AthleteTable
                athletes={athletes}
                setAthletes={setAthletes}
                filters={filterValues[pageKey]}
                isFilterApplied={isFilterApplied}
                setIsFilterApplied={setIsFilterApplied}
            />
        </div>
    );
}

export default AthleteList;
