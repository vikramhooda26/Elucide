import { ConditionalButton } from "@/components/button/ConditionalButton";
import FilterModal, { FilterContent } from "@/components/core/filter/FilterModal";
import useNavigator from "@/hooks/useNavigator";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import TeamService from "@/services/features/TeamService";
import { fetchFilters, TPageKey } from "@/services/filter/FilterConfigs";
import FilterService from "@/services/filter/FilterService";
import { filterState } from "@/store/atoms/filterAtom";
import { listLoadingAtom } from "@/store/atoms/global";
import { team } from "@/types/team/TeamListTypes";
import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import TeamTable from "./data/TeamTable";

function TeamList() {
  const navigator = useNavigator();
  const [teamList, setTeamList] = useState<any[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const pageKey: TPageKey = "teamList";
  const filterValues = useRecoilValue(filterState);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return null;
  }

  useEffect(() => {
    if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
      handleApplyFilters();
    } else {
      fetchTeams();
    }
  }, []);

  const fetchTeams = async (page = pagination.pageIndex, pageSize = pagination.pageSize, sortingState = sorting) => {
    try {
      setIsLoading(true);
      const response = await TeamService.getPaginated(
        page,
        pageSize,
        sortingState.length > 0 ? sortingState : undefined
      );
      if (response.status === HTTP_STATUS_CODES.OK) {
        let teams = response.data.items || [];
        teams.forEach((team: team, idx: number) => {
          teams[idx].createdBy = team?.createdBy?.email || "N/A";
          teams[idx].modifiedBy = team?.modifiedBy?.email || "N/A";
        });
        setTeamList(teams);

        setPagination((prev) => ({
          ...prev,
          pageIndex: page,
          pageSize: pageSize,
          totalCount: response.data.totalCount || 0
        }));
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

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);

    if (!isFilterApplied) {
      fetchTeams(pagination.pageIndex, pagination.pageSize, newSorting);
    }
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    if (isFilterApplied) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: newPage,
        pageSize: newPageSize
      }));
      return;
    }

    const currentlyShowingAllData =
      pagination.pageIndex === 0 &&
      pagination.totalCount <= pagination.pageSize &&
      newPageSize >= pagination.totalCount;

    if (currentlyShowingAllData) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
        pageSize: newPageSize
      }));
    } else {
      let adjustedPage = newPage;

      if (pagination.pageSize !== newPageSize) {
        const currentStartRecord = pagination.pageIndex * pagination.pageSize;
        adjustedPage = Math.floor(currentStartRecord / newPageSize);
      }

      fetchTeams(adjustedPage, newPageSize);
    }
  };

  const filterConfig: FilterContent[] = fetchFilters(pageKey);

  const handleApplyFilters = async () => {
    try {
      if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
        setIsFilterApplied(false);
        fetchTeams();
        return;
      }
      setIsLoading(true);
      const processedData = FilterService.processFilterData(filterValues[pageKey]);
      if (processedData?.teamIds) {
        processedData.ids = processedData?.teamIds;
        delete processedData?.teamIds;
      }
      if (processedData?.teamOwnerIds) {
        processedData.ownerIds = processedData?.teamOwnerIds;
        delete processedData?.teamOwnerIds;
      }

      const response = await TeamService.getFilteredTeams(processedData);

      if (response.status === HTTP_STATUS_CODES.OK) {
        let teams = response.data;
        teams.forEach((team: team, idx: number) => {
          teams[idx].createdBy = team?.createdBy?.email || "N/A";
          teams[idx].modifiedBy = team?.modifiedBy?.email || "N/A";
        });

        teams = FilterService.validateMatching(teams, filterValues[pageKey], "teamList");

        setIsFilterApplied(true);
        setTeamList(teams);

        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: teams.length
        });
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError?.response?.status !== HTTP_STATUS_CODES?.NOT_FOUND) {
        toast.error("An unknown error occurred");
      } else {
        setTeamList([]);
        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team List</h2>
          <p className="text-muted-foreground">Here&apos;s a list of teams.</p>
        </div>
        <div className="flex items-center space-x-2">
          <FilterModal
            isOpen={isFilterModalOpen}
            filters={filterConfig}
            onClose={() => setIsFilterModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            onDiscardFilters={() => {
              setIsFilterApplied(false);
              fetchTeams(pagination.pageIndex, pagination.pageSize, sorting);
            }}
            pageKey={pageKey}
          />
          <ConditionalButton onClick={() => navigator(NAVIGATION_ROUTES.CREATE_TEAM)} accessLevel="all_staff">
            Create Team
          </ConditionalButton>
        </div>
      </div>
      <TeamTable
        teamList={teamList}
        setTeamList={setTeamList}
        filters={filterValues[pageKey]}
        isFilterApplied={isFilterApplied}
        setIsFilterApplied={setIsFilterApplied}
        pagination={pagination}
        onPageChange={handlePageChange}
        isPaginationEnabled={true}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />
    </div>
  );
}

export default TeamList;
