import { ConditionalButton } from "@/components/button/ConditionalButton";
import { getColumns } from "@/components/core/view/summary-columns";
import DataTable from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/ui/multi-select";
import useNavigator from "@/hooks/useNavigator";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import { printLogs } from "@/lib/logs";
import ErrorService from "@/services/error/ErrorService";
import MetadataService from "@/services/features/MetadataService";
import { listLoadingAtom } from "@/store/atoms/global";
import { team } from "@/types/team/TeamListTypes";
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
import { DownloadIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useAuth } from "../auth/auth-provider/AuthProvider";

function SportsDealSummaryList() {
    const navigator = useNavigator();
    const [dataList, setDataList] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
            const response = await MetadataService.deleteData(id, "/api/admin/sports-deal-summary/delete/");

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Deleted successfully");
                setDataList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                setDataList((prevDataList) => prevDataList.filter((data) => data.id !== id));
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
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
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

    const downloadAsExcel = () => {
        try {
            const visibleColumns = table
                .getAllColumns()
                .filter((column) => column.getIsVisible() && column.id !== "actions");

            const headers = visibleColumns.map((column) => {
                if (column.id === "brand") return "Brand name";
                if (column.id === "partner") return "Partner name";
                if (column.id === "createdDate") return "Created At";
                if (column.id === "modifiedDate") return "Modified At";
                if (column.id === "createdBy") return "Created By";
                if (column.id === "modifiedBy") return "Modified By";

                return (
                    column.id.charAt(0).toUpperCase() +
                    column.id
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                );
            });

            const data = table.getFilteredRowModel().rows.map((row) => {
                return visibleColumns.map((column) => {
                    const cellValue = row.getValue(column.id);

                    if (column.id === "createdDate" || column.id === "modifiedDate") {
                        return cellValue ? new Date(cellValue as string).toLocaleString() : "";
                    }

                    return cellValue !== null && cellValue !== undefined ? cellValue : "";
                });
            });

            const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sports Deal Summary");

            XLSX.writeFile(wb, "sports-deal-summary_list.xlsx");

            toast.success("Excel file downloaded successfully");
        } catch (error) {
            printLogs("Error downloading Brand Excel:", error);
            toast.error("Failed to download Excel file");
        }
    };

    const toolbarAttributes = [
        <Input
            placeholder="Filter tasks..."
            value={(table.getColumn(filterField || "brand")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterField || "brand")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modified At" options={priorities} />,
        <SelectBox
            options={filterColumnOptions}
            onChange={(value) => setFilterField(value as string)}
            value={filterField}
            placeholder="Select filter key"
            inputPlaceholder="Search for a key..."
            emptyPlaceholder="Not found"
            className="w-fit"
        />,
        <Button variant="outline" size="sm" onClick={downloadAsExcel} className="ml-2">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Excel
        </Button>
    ];

    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Sports Deal Summary List</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of sport deal summaries.</p>
                </div>
                {userRole !== "USER" && (
                    <div className="flex items-center space-x-2">
                        <ConditionalButton
                            onClick={() => navigator(NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY)}
                            accessLevel="all_staff"
                        >
                            Create Deal
                        </ConditionalButton>
                    </div>
                )}
            </div>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} callbacks={callbacks} />
        </div>
    );
}

export default SportsDealSummaryList;
