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
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import useNavigator from "../../hooks/useNavigator";
import { listLoadingAtom } from "../../store/atoms/global";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import MetadataService from "../../services/features/MetadataService";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { team } from "../../types/team/TeamListTypes";
import ErrorService from "../../services/error/ErrorService";
import { Input } from "../../components/ui/input";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import DataTable from "../../components/data-table/data-table";
import { priorities, statuses } from "./data/data";
import { useUser } from "../../hooks/useUser";
import { getColumns } from "../../components/core/view/summary-columns";
import SelectBox from "../../components/ui/multi-select";
import { printLogs } from "../../lib/logs";

function SportsDealSummaryList() {
    const navigator = useNavigator();
    const [dataList, setDataList] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const userRole = useUser()?.role;

    if (!userRole) {
        return;
    }

    const { logout } = useAuth();
    const navigate = useNavigate();

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(
                id,
                "/api/admin/sports-deal-summary/delete/"
            );

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Deleted successfully");
                setDataList((prevDataList) =>
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
                setDataList((prevDataList) =>
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
        navigate(`${NAVIGATION_ROUTES.EDIT_SPORTS_DEAL_SUMMARY}/${id}`);
    }, []);

    const fetchList = async () => {
        try {
            setIsLoading(true);
            const response = await MetadataService.getAllSportsDealSummary({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const deals = response.data;
                deals.forEach((deal: team, i: number) => {
                    deals[i].createdBy = deal?.createdBy?.email || "N/A";
                    deals[i].modifiedBy = deal?.modifiedBy?.email || "N/A";
                });
                setDataList(deals);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const onView = (id: string) => {
        navigator(NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY, [id]);
    };

    const filterColumnOptions = [
        { label: "Brand", value: "brand" },
        { label: "Partner", value: "partner" },
        { label: "Status", value: "status" }
    ];

    const [filterField, setFilterField] = useState<string>("");

    const viewRoute = NAVIGATION_ROUTES?.SPORTS_DEAL_SUMMARY;

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                viewRoute,
                brandSearchQuerykey: "brand",
                partnerSearchQueryKey: "partner",
                brandTitle: "Brand name",
                partnerTitle: "Partner name",
                canEdit
            }),
        []
    );

    const table = useReactTable({
        data: dataList,
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

    const callbacks = {
        onView: onView
    };

    const toolbarAttributes = [
        <Input
            placeholder="Filter tasks..."
            value={
                (table
                    .getColumn(filterField || "brand")
                    ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
                table
                    .getColumn(filterField || "brand")
                    ?.setFilterValue(event.target.value)
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
            title="Modified At"
            options={priorities}
        />,
        <SelectBox
            options={filterColumnOptions}
            onChange={(value) => setFilterField(value as string)}
            value={filterField}
            placeholder="Select filter key"
            inputPlaceholder="Search for a key..."
            emptyPlaceholder="Not found"
            className="w-fit"
        />
    ];

    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Sports Deal Summary List
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of sport deal summaries.
                    </p>
                </div>
                {userRole !== "USER" && (
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={() =>
                                navigator(
                                    NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY
                                )
                            }
                        >
                            Create Deal
                        </Button>
                    </div>
                )}
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

export default SportsDealSummaryList;
