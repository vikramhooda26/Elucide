import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getColumns } from "../../../components/core/view/common-columns";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { listLoadingAtom } from "../../../store/atoms/global";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
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
import MetadataService from "../../../services/features/MetadataService";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import { toast } from "sonner";
import ErrorService from "../../../services/error/ErrorService";
import { Input } from "../../../components/ui/input";
import { DataTableFacetedFilter } from "../../../components/data-table/data-table-faceted-filter";
import { priorities, statuses } from "./data";
import DataTable from "../../../components/data-table/data-table";
import OptionalColumns from "@/services/filter/OptionalColumns";

type Props = {
    teamList: Array<any>;
    setTeamList: (value: React.SetStateAction<any[]>) => void;
    filters?: Record<
        string,
        {
            type: string;
            value: any;
            isMandatory: boolean;
        }>;
    isFilterApplied: boolean;
    setIsFilterApplied: (b: boolean) => void;
};

function TeamTable({ teamList, setTeamList, filters, isFilterApplied, setIsFilterApplied }: Props) {
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
            const response = await MetadataService.deleteData(id, "/api/admin/team/delete/");

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Deleted successfully");
                setTeamList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                setTeamList((prevDataList) => prevDataList.filter((data) => data.id !== id));
            } else {
                toast.error("Could not delete this data");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onEdit = useCallback((id: string) => {
        navigate(`${NAVIGATION_ROUTES.EDIT_TEAM}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.TEAM;

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                searchQuerykey: "name",
                title: "Team name",
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
        data: teamList,
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
            placeholder="Filter teams..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
    ];

    return (
        <>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
        </>
    );
}

export default TeamTable;
