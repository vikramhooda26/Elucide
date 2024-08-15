import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import AthleteService from "../../services/features/AthleteService";
import { athlete } from "../../types/athlete/AthleteListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getColumns } from "./data/common-columns";
import { priorities, statuses } from "./data/data";
import MetadataService from "../../services/features/MetadataService";
import { useUser } from "../../hooks/useUser";
import { listLoadingAtom } from "../../store/atoms/global";

function AthleteList() {
    const navigator = useNavigator();
    const [athletes, setAthletes] = useState<Array<any>>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const userRole = useUser()?.role;

    if (!userRole) {
        return;
    }

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                setIsLoading(true);
                const response = await AthleteService.getAll();
                if (response.status === HTTP_STATUS_CODES.OK) {
                    const athleteList = response.data;
                    athleteList.forEach((athlete: athlete, i: number) => {
                        athleteList[i].createdBy =
                            athlete?.createdBy?.email || "N/A";
                        athleteList[i].modifiedBy =
                            athlete?.modifiedBy?.email || "N/A";
                    });
                    setAthletes(athleteList);
                }
            } catch (error) {
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (
                    unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND
                ) {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchAthletes();
    }, []);

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(
                id,
                "/api/admin/athlete/delete/"
            );

            if (response.status === HTTP_STATUS_CODES.OK) {
                console.log();

                toast.success("Deleted successfully");
                setAthletes((prevDataList) =>
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
                setAthletes((prevDataList) =>
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
        navigate(`${NAVIGATION_ROUTES.EDIT_ATHLETE}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.ATHLETE;

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                searchQuerykey: "name",
                title: "Athlete name",
            }),
        []
    );

    const table = useReactTable({
        data: athletes,
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
                        Athlete List
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of athletes.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() =>
                            navigator(NAVIGATION_ROUTES.CREATE_ATHLETE)
                        }
                    >
                        Create Athlete
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

export default AthleteList;
