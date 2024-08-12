import { useEffect, useState } from "react";
// import { DataTable } from "../../components/table/data-table";
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
import { useSetRecoilState } from "recoil";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import AthleteService from "../../services/features/AthleteService";
import { listLoadingAtom } from "../../store/atoms/global";
import { athlete } from "../../types/athlete/AthleteListTypes";
import { columns } from "./data/columns";
import { priorities, statuses } from "./data/data";
import ErrorService from "../../services/error/ErrorService";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

    const fetchAthletes = async () => {
        try {
            setIsLoading(true);
            const response = await AthleteService.getAll({});
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

    const onView = (id: string) => {
        navigator(NAVIGATION_ROUTES.ATHLETE, [id]);
    };

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

    const callbacks = {
        onView: onView,
    };

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
                callbacks={callbacks}
            />
        </div>
    );
}

export default AthleteList;
