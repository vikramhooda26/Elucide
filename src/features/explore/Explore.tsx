import FilterModal, { FilterContent } from "@/components/core/filter/FilterModal";
import { Button } from "@/components/ui/button";
import { HTTP_STATUS_CODES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import DashboardService from "@/services/features/DashboardService";
import { fetchFilters, TPageKey } from "@/services/filter/FilterConfigs";
import FilterService from "@/services/filter/FilterService";
import { filterState } from "@/store/atoms/filterAtom";
import { listLoadingAtom } from "@/store/atoms/global";
import { athlete } from "@/types/athlete/AthleteListTypes";
import { league } from "@/types/league/LeagueListTypes";
import { team } from "@/types/team/TeamListTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import AthleteTable from "../athlete/data/AthleteTable";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import LeagueTable from "../league/data/LeagueTable";
import TeamTable from "../team/data/TeamTable";
import ChatGPT from "./components/ChatGPT";

function Explore() {
    const [brandList, setBrandList] = useState<Array<any>>([]);
    const [leagueList, setLeagueList] = useState<Array<any>>([]);
    const [teamList, setTeamList] = useState<any[]>([]);
    const [athletes, setAthletes] = useState<Array<any>>([]);
    const [openAi, setOpenAi] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const pageKey: TPageKey = "allStakeList";
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const filterValues = useRecoilValue(filterState);

    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
            handleApplyFilters();
        } else {
            setEmpty();
        }
    }, []);

    const setEmpty = () => {
        setBrandList([]);
        setLeagueList([]);
        setTeamList([]);
        setAthletes([]);
        setIsLoading(false);
    };

    const filterConfig: FilterContent[] = fetchFilters(pageKey);

    const handleApplyFilters = async () => {
        try {
            setIsLoading(true);
            const processedData = FilterService.processFilterData(filterValues[pageKey]);

            const response = await DashboardService.getFilteredStakes(processedData);

            console.log("response -=- ", response);

            if (response.status === HTTP_STATUS_CODES.OK) {
                const allStakeList = response.data;
                setIsFilterApplied(true);

                // let brandList = allStakeList?.filteredBrands;
                // brandList.forEach((brand: brand, i: number) => {
                //     brandList[i].createdBy = brand?.createdBy?.email || "N/A";
                //     brandList[i].modifiedBy = brand?.modifiedBy?.email || "N/A";
                // });
                // brandList = FilterService.validateMatching(brandList, filterValues[pageKey]);
                // setBrandList(brandList);

                let leagueList = allStakeList?.filteredLeagues;
                leagueList.forEach((league: league, i: number) => {
                    leagueList[i].createdBy = league?.createdBy?.email || "N/A";
                    leagueList[i].modifiedBy = league?.modifiedBy?.email || "N/A";
                });
                leagueList = FilterService.validateMatching(leagueList, filterValues[pageKey], "leagueList");
                setLeagueList(leagueList);

                let teamList = allStakeList?.filteredTeams;

                teamList.forEach((athlete: team, i: number) => {
                    teamList[i].createdBy = athlete?.createdBy?.email || "N/A";
                    teamList[i].modifiedBy = athlete?.modifiedBy?.email || "N/A";
                });
                teamList = FilterService.validateMatching(teamList, filterValues[pageKey], "teamList");
                setTeamList(teamList);

                let athleteList = allStakeList?.filteredAthletes;
                allStakeList?.filteredAthletes.forEach((athlete: athlete, i: number) => {
                    athleteList[i].createdBy = athlete?.createdBy?.email || "N/A";
                    athleteList[i].modifiedBy = athlete?.modifiedBy?.email || "N/A";
                });
                athleteList = FilterService.validateMatching(athleteList, filterValues[pageKey], "athleteList");
                setAthletes(athleteList);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
            } else {
                setAthletes([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Explore Elucide</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of all stakes on filter.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <FilterModal
                        isOpen={isFilterModalOpen}
                        filters={filterConfig}
                        onClose={() => setIsFilterModalOpen(false)}
                        onApplyFilters={handleApplyFilters}
                        onDiscardFilters={setEmpty}
                        pageKey={pageKey}
                    />

                    <Button variant="outline" onClick={() => setOpenAi((pv) => !pv)}>
                        Open AI
                    </Button>
                </div>
            </div>

            {openAi && <ChatGPT />}
            <div>
                {/* <h3 className="my-4 text-2xl tracking-tight">List Of Brands</h3>
                <BrandTable brandList={brandList} setBrandList={setBrandList} /> */}
                <h3 className="my-4 text-2xl tracking-tight">List Of Leagues</h3>
                <LeagueTable
                    leagueList={leagueList}
                    setLeagueList={setLeagueList}
                    filters={filterValues[pageKey]}
                    isFilterApplied={isFilterApplied}
                    setIsFilterApplied={setIsFilterApplied}
                />
                <h3 className="my-4 text-2xl tracking-tight">List Of Teams</h3>
                <TeamTable
                    teamList={teamList}
                    setTeamList={setTeamList}
                    filters={filterValues[pageKey]}
                    isFilterApplied={isFilterApplied}
                    setIsFilterApplied={setIsFilterApplied}
                />
                <h3 className="my-4 text-2xl tracking-tight">List Of Athletes</h3>
                <AthleteTable
                    athletes={athletes}
                    setAthletes={setAthletes}
                    filters={filterValues[pageKey]}
                    isFilterApplied={isFilterApplied}
                    setIsFilterApplied={setIsFilterApplied}
                />
            </div>
        </div>
    );
}

export default Explore;
