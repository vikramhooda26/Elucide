import DataTable from "@/components/data-table/data-table";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { priorities, statuses } from "./data";
import { useAuth } from "@/features/auth/auth-provider/AuthProvider";
import { useUser } from "@/hooks/useUser";
import { listLoadingAtom } from "@/store/atoms/global";
import MetadataService from "@/services/features/MetadataService";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { getColumns } from "@/components/core/view/common-columns";
import OptionalColumns from "@/services/filter/OptionalColumns";

type Props = {
    brandList: Array<any>;
    setBrandList: (value: React.SetStateAction<any[]>) => void;
    filters?: Record<
        string,
        {
            type: string;
            value: any;
            isMandatory: boolean;
        }
    >;
    isFilterApplied: boolean;
    setIsFilterApplied: (b: boolean) => void;
};

function BrandTable({ brandList, setBrandList, filters, isFilterApplied, setIsFilterApplied }: Props) {
    const userRole = useUser()?.role;
    const navigate = useNavigate();
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    if (!userRole) {
        return;
    }

    useEffect(() => {
        if (isFilterApplied || filters && Object.keys(filters)?.length <= 0) {
            setOptionalColumns();
        }
    }, [filters, isFilterApplied]);

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(id, "/api/admin/brand/delete/");

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Deleted successfully");
                setBrandList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                setBrandList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            } else {
                toast.error("Could not delete this data");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onEdit = useCallback((id: string) => {
        navigate(`${NAVIGATION_ROUTES.EDIT_BRAND}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.BRAND;

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                searchQuerykey: "name",
                title: "Brand name",
                canEdit
            }),
        []
    );

    const [allowedColumns, setAllowedColumns] = useState(columns);

    const setOptionalColumns = () => {
        if (filters) {
            const optionalColumns = OptionalColumns.getOptionalColumns(filters);
            const updateColumns = [...columns];
            //@ts-ignore
            updateColumns?.splice(1, 0, ...optionalColumns);

            setAllowedColumns(updateColumns);

            setIsFilterApplied(false);
        }
    };

    const table = useReactTable({
        data: brandList,
        columns: allowedColumns,
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
            placeholder="Filter brands..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
    ];

    return (
        <>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
        </>
    );
}

export default BrandTable;
