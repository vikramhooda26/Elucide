import { ConditionalButton } from "@/components/button/ConditionalButton";
import FilterModal, { FilterContent } from "@/components/core/filter/FilterModal";
import useNavigator from "@/hooks/useNavigator";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import LeagueService from "@/services/features/LeagueService";
import { fetchFilters, TPageKey } from "@/services/filter/FilterConfigs";
import FilterService from "@/services/filter/FilterService";
import { filterState } from "@/store/atoms/filterAtom";
import { listLoadingAtom } from "@/store/atoms/global";
import { league } from "@/types/league/LeagueListTypes";
import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import LeagueTable from "./data/LeagueTable";

function LeagueList() {
  const navigator = useNavigator();
  const [leagueList, setLeagueList] = useState<Array<any>>([]);
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
  const pageKey: TPageKey = "leagueList";
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
      fetchLeagues();
    }
  }, []);

  const fetchLeagues = async (page = pagination.pageIndex, pageSize = pagination.pageSize, sortingState = sorting) => {
    try {
      setIsLoading(true);
      const response = await LeagueService.getPaginated(
        page,
        pageSize,
        sortingState.length > 0 ? sortingState : undefined
      );
      if (response?.status === HTTP_STATUS_CODES.OK) {
        const leagues = response.data.items || [];
        leagues?.forEach((league: league, idx: number) => {
          leagues[idx].createdBy = league?.createdBy?.email || "N/A";
          leagues[idx].modifiedBy = league?.modifiedBy?.email || "N/A";
        });

        setLeagueList(leagues);

        setPagination((prev) => ({
          ...prev,
          pageIndex: page,
          pageSize: pageSize,
          totalCount: response.data.totalCount || 0
        }));
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

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);

    if (!isFilterApplied) {
      fetchLeagues(pagination.pageIndex, pagination.pageSize, newSorting);
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

      fetchLeagues(adjustedPage, newPageSize, sorting);
    }
  };

  const filterConfig: FilterContent[] = fetchFilters(pageKey);

  const handleApplyFilters = async () => {
    try {
      if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
        setIsFilterApplied(false);
        fetchLeagues();
        return;
      }
      setIsLoading(true);
      const processedData = FilterService.processFilterData(filterValues[pageKey]);
      if (processedData?.leagueIds) {
        processedData.ids = processedData?.leagueIds;
        delete processedData?.leagueIds;
      }

      if (processedData?.leagueOwnerIds) {
        processedData.ownerIds = processedData?.leagueOwnerIds;
        delete processedData?.leagueOwnerIds;
      }

      const response = await LeagueService.getFilteredLeagues(processedData);

      if (response?.status === HTTP_STATUS_CODES.OK) {
        let leagueList = response?.data;
        leagueList?.forEach((league: league, idx: number) => {
          leagueList[idx].createdBy = league?.createdBy?.email || "N/A";
          leagueList[idx].modifiedBy = league?.modifiedBy?.email || "N/A";
        });

        leagueList = FilterService.validateMatching(leagueList, filterValues[pageKey], pageKey);

        setIsFilterApplied(true);
        setLeagueList(leagueList);

        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: leagueList.length
        });
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError?.response?.status !== HTTP_STATUS_CODES.NOT_FOUND) {
        console.log("error -=- ", error);

        toast.error("An unknown error occurred");
      } else {
        setLeagueList([]);
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
          <h2 className="text-2xl font-bold tracking-tight">League List</h2>
          <p className="text-muted-foreground">Here&apos;s a list of leagues.</p>
        </div>
        <div className="flex items-center space-x-2">
          <FilterModal
            isOpen={isFilterModalOpen}
            filters={filterConfig}
            onClose={() => setIsFilterModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            onDiscardFilters={() => {
              setIsFilterApplied(false);
              fetchLeagues(pagination.pageIndex, pagination.pageSize, sorting);
            }}
            pageKey={pageKey}
          />
          <ConditionalButton onClick={() => navigator(NAVIGATION_ROUTES.CREATE_LEAGUE)} accessLevel="all_staff">
            Create League
          </ConditionalButton>
        </div>
      </div>
      <LeagueTable
        leagueList={leagueList}
        setLeagueList={setLeagueList}
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

export default LeagueList;
