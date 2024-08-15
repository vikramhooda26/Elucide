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
    VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import LeagueService from "../../services/features/LeagueService";
import { isDeletedAtom, listLoadingAtom } from "../../store/atoms/global";
import { league } from "../../types/league/LeagueListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getSportsDealSummaryColumns } from "./data/columns";
import { priorities, statuses } from "./data/data";
import { useUser } from "../../hooks/useUser";
import MetadataService from "../../services/features/MetadataService";

function LeagueList() {
    const navigator = useNavigator();
    const [leagueList, setLeagueList] = useState<Array<any>>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [rowDeleted, setIsDeleted] = useRecoilState(isDeletedAtom);

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchLeagues = async () => {
        try {
            setIsLoading(true);
            const response = await LeagueService.getAll({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const leagues = response.data;
                leagues.forEach((league: league, i: number) => {
                    leagues[i].createdBy = league?.createdBy?.email || "N/A";
                    leagues[i].modifiedBy = league?.modifiedBy?.email || "N/A";
                });
                setLeagueList(leagues);
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
        fetchLeagues();
    }, []);

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(
                id,
                "/api/admin/league/delete/"
            );

            if (response.status === HTTP_STATUS_CODES.OK) {
                console.log();

                toast.success("Deleted successfully");
                setLeagueList((prevDataList) =>
                    prevDataList.filter((data) => data.id !== id)
                );
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );

            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                setLeagueList((prevDataList) =>
                    prevDataList.filter((data) => data.id !== id)
                );
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

    const columns = useMemo(
        () => getSportsDealSummaryColumns({ onDelete, onEdit, userRole, viewRoute }),
        []
    );

    const table = useReactTable({
        data: leagueList,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
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
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const toolbarAttributes = [
        <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        <DataTableFacetedFilter
            column={table.getColumn("createdDate")}
            title="Created At"
            options={statuses}
        />,
        <DataTableFacetedFilter
            column={table.getColumn("modifiedDate")}
            title="Modiefied At"
            options={priorities}
        />,
    ];

    return (
        <div className=" h-full flex-1 flex-col space-y-8  md:flex py-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        League List
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of leagues.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() =>
                            navigator(NAVIGATION_ROUTES.CREATE_LEAGUE)
                        }
                    >
                        Create League
                    </Button>
                </div>
            </div>
            <DataTable
                table={table}
                columns={columns}
                toolbarAttributes={toolbarAttributes}
            />
        </div>
    );
}

export default LeagueList;
