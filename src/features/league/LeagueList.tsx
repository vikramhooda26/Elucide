import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import LeagueService from "../../services/features/LeagueService";
import MetadataService from "../../services/features/MetadataService";
import { listLoadingAtom } from "../../store/atoms/global";
import { league } from "../../types/league/LeagueListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { priorities, statuses } from "./data/data";
import { getColumns } from "../../components/core/view/common-columns";
import { ConditionalButton } from "../../components/button/ConditionalButton";
import FilterModal, { FilterContent } from "../../components/core/filter/FilterModal";
import { fetchFilters, TPageKey } from "../../services/filter/FilterConfigs";
import FilterService from "../../services/filter/FilterService";
import { filterState } from "../../store/atoms/filterAtom";
import LeagueTable from "./data/LeagueTable";

function LeagueList() {
    const navigator = useNavigator();
    const [leagueList, setLeagueList] = useState<Array<any>>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const pageKey: TPageKey = "leagueList";
    const filterValues = useRecoilValue(filterState);

    const userRole = useUser()?.role;

    if (!userRole) {
        return;
    }

    const fetchLeagues = async () => {
        try {
            setIsLoading(true);
            const response = await LeagueService.getAll();
            if (response?.status === HTTP_STATUS_CODES.OK) {
                const leagues = response.data;
                leagues?.forEach((league: league, i: number) => {
                    leagues[i].createdBy = league?.createdBy?.email || "N/A";
                    leagues[i].modifiedBy = league?.modifiedBy?.email || "N/A";
                });
                setLeagueList(leagues);
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

    useEffect(() => {
        if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
            handleApplyFilters();
        } else {
            fetchLeagues();
        }
    }, []);

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(id, "/api/admin/league/delete/");

            if (response?.status === HTTP_STATUS_CODES.OK) {
                toast.success("Deleted successfully");
                setLeagueList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

            if (unknownError?.response?.status === HTTP_STATUS_CODES.NOT_FOUND) {
                setLeagueList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            } else {
                toast.error("Could not delete this data");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onEdit = useCallback((id: string) => {
        navigate(`${NAVIGATION_ROUTES.EDIT_LEAGUE}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.LEAGUE;

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                canEdit,
                searchQuerykey: "name",
                title: "League name"
            }),
        []
    );

    const table = useReactTable({
        data: leagueList,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    });

    const toolbarAttributes = [
        <Input
            placeholder="Filter leagues..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
    ];

    const filterConfig: FilterContent[] = fetchFilters(pageKey);

    const handleApplyFilters = async () => {
        try {
             if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
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
                leagueList?.forEach((league: league, i: number) => {
                    leagueList[i].createdBy = league?.createdBy?.email || "N/A";
                    leagueList[i].modifiedBy = league?.modifiedBy?.email || "N/A";
                });

                leagueList = FilterService.validateMatching(leagueList, filterValues[pageKey]);

                setIsFilterApplied(true);

                setLeagueList(leagueList);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError?.response?.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                console.log("error -=- ", error);

                toast.error("An unknown error occurred");
            } else {
                setLeagueList([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
            {/* <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Applied Filters:</h2>
                <ul className="list-disc pl-5">
                    {Object.entries(filterValues[pageKey] || {}).map(([key, filter]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {JSON.stringify(filter.value)}
                        </li>
                    ))}
                </ul>
            </div> */}

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
                        onDiscardFilters={fetchLeagues}
                        pageKey={pageKey}
                    />
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.CREATE_LEAGUE)}
                        accessLevel="all_staff"
                    >
                        Create League
                    </ConditionalButton>
                </div>
            </div>
            <LeagueTable leagueList={leagueList} setLeagueList={setLeagueList} filters={filterValues[pageKey]} isFilterApplied={isFilterApplied} setIsFilterApplied={setIsFilterApplied} />
        </div>
    );
}

export default LeagueList;
