import { ConditionalButton } from "@/components/button/ConditionalButton";
import FilterModal, { FilterContent } from "@/components/core/filter/FilterModal";
import { debounce } from "@/hooks/debounce";
import useNavigator from "@/hooks/useNavigator";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import AthleteService from "@/services/features/AthleteService";
import { fetchFilters, TPageKey } from "@/services/filter/FilterConfigs";
import FilterService from "@/services/filter/FilterService";
import { filterState } from "@/store/atoms/filterAtom";
import { listLoadingAtom } from "@/store/atoms/global";
import { athlete } from "@/types/athlete/AthleteListTypes";
import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import AthleteTable from "./data/AthleteTable";

function AthleteList() {
  const navigator = useNavigator();
  const [athletes, setAthletes] = useState<Array<any>>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const pageKey: TPageKey = "athleteList";
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
      fetchAthletes();
    }
  }, []);

  const fetchAthletes = async (
    page = pagination.pageIndex,
    pageSize = pagination.pageSize,
    sortingState = sorting,
    search = searchQuery
  ) => {
    try {
      setIsLoading(true);
      const response = await AthleteService.getPaginated(
        page,
        pageSize,
        sortingState.length > 0 ? sortingState : undefined,
        search
      );
      if (response.status === HTTP_STATUS_CODES.OK) {
        let athleteList = response.data.items || [];
        athleteList.forEach((athlete: athlete, idx: number) => {
          athleteList[idx].createdBy = athlete?.createdBy?.email || "N/A";
          athleteList[idx].modifiedBy = athlete?.modifiedBy?.email || "N/A";
        });

        setAthletes(athleteList);

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

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      if (!isFilterApplied) {
        fetchAthletes(0, pagination.pageSize, sorting, searchValue);
      }
    }, 500),
    [isFilterApplied, pagination.pageSize, sorting]
  );

  const handleSearchChange = (value: string) => {
    setIsLoading(true);
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);

    if (!isFilterApplied) {
      fetchAthletes(pagination.pageIndex, pagination.pageSize, newSorting, searchQuery);
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

      fetchAthletes(adjustedPage, newPageSize, sorting, searchQuery);
    }
  };

  const filterConfig: FilterContent[] = fetchFilters(pageKey);

  const handleApplyFilters = async () => {
    try {
      if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
        setIsFilterApplied(false);
        fetchAthletes();
        return;
      }
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

        athleteList = FilterService.validateMatching(athleteList, filterValues[pageKey], "athleteList");

        setIsFilterApplied(true);
        setAthletes(athleteList);

        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: athleteList.length
        });
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError?.response?.status !== HTTP_STATUS_CODES.NOT_FOUND) {
        toast.error("An unknown error occurred");
      } else {
        setAthletes([]);
        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
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
            onDiscardFilters={() => {
              setIsFilterApplied(false);
              fetchAthletes(pagination.pageIndex, pagination.pageSize, sorting);
            }}
            pageKey={pageKey}
          />
          <ConditionalButton onClick={() => navigator(NAVIGATION_ROUTES.CREATE_ATHLETE)} accessLevel="all_staff">
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
        pagination={pagination}
        onPageChange={handlePageChange}
        isPaginationEnabled={true}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}

export default AthleteList;
