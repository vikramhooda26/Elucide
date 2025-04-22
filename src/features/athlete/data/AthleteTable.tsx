import { getColumns } from "@/components/core/view/common-columns";
import DataTable from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/auth-provider/AuthProvider";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import { printLogs } from "@/lib/logs";
import ErrorService from "@/services/error/ErrorService";
import MetadataService from "@/services/features/MetadataService";
import OptionalColumns from "@/services/filter/OptionalColumns";
import { listLoadingAtom } from "@/store/atoms/global";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface Props {
  athletes: any[];
  setAthletes: React.Dispatch<React.SetStateAction<any[]>>;
  filters?: Record<
    string,
    {
      type: string;
      value: any;
      isMandatory: boolean;
    }
  >;
  isFilterApplied: boolean;
  setIsFilterApplied: React.Dispatch<React.SetStateAction<boolean>>;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  };
  onPageChange?: (page: number, pageSize: number) => void;
  isPaginationEnabled?: boolean;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

function AthleteTable({
  athletes,
  setAthletes,
  filters,
  isFilterApplied,
  setIsFilterApplied,
  pagination,
  onPageChange,
  isPaginationEnabled = false,
  sorting = [],
  onSortingChange
}: Props) {
  const userRole = useUser()?.role;
  const navigate = useNavigate();
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const { logout } = useAuth();
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [localSorting, setLocalSorting] = useState<SortingState>([]);

  if (!userRole) {
    return null;
  }

  useEffect(() => {
    if (isFilterApplied || (filters && Object.keys(filters)?.length <= 0)) {
      setOptionalColumns();
    }
  }, [filters, isFilterApplied]);

  const onEdit = useCallback((id: string) => {
    navigate(`${NAVIGATION_ROUTES.EDIT_ATHLETE}/${id}`);
  }, []);

  const viewRoute = NAVIGATION_ROUTES.ATHLETE;

  const canEdit = userRole !== "USER" && userRole !== "STAFF";

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await MetadataService.deleteData(id, "/api/admin/athlete/delete/");

      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Deleted successfully");
        setAthletes((prevDataList) => prevDataList.filter((data) => data.id !== id));
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

      if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
        setAthletes((prevDataList) => prevDataList.filter((data) => data.id !== id));
      } else {
        toast.error("Could not delete this data");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        onDelete,
        onEdit,
        userRole,
        viewRoute,
        searchQuerykey: "name",
        title: "Athlete name",
        canEdit
      }),
    [filters, isFilterApplied]
  );

  const [allowedColumns, setAllowedColumns] = useState(columns);

  const setOptionalColumns = () => {
    if (filters) {
      const optionalColumns = OptionalColumns.getOptionalColumns(filters, "athleteList");
      const updateColumns = [...columns];
      //@ts-ignore
      updateColumns?.splice(1, 0, ...optionalColumns);

      setAllowedColumns(updateColumns);

      // Commented out to avoid using server-side sorting when filters are applied. If this breaks something, uncomment this and look at other method to make server-side soring work.
      // setIsFilterApplied(false);
    }
  };

  const table = useReactTable({
    data: athletes,
    columns: allowedColumns,
    manualPagination: isPaginationEnabled && !isFilterApplied,
    manualSorting: isPaginationEnabled && !isFilterApplied,
    pageCount:
      isPaginationEnabled && !isFilterApplied
        ? Math.ceil((pagination?.totalCount || 0) / (pagination?.pageSize || 10))
        : undefined,
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting: onSortingChange ? sorting : localSorting,
      pagination: {
        pageIndex: pagination?.pageIndex || 0,
        pageSize: pagination?.pageSize || 10
      }
    },
    onPaginationChange: (updater) => {
      if (isPaginationEnabled && onPageChange) {
        const currentPagination = {
          pageIndex: pagination?.pageIndex || 0,
          pageSize: pagination?.pageSize || 10
        };

        const newPagination = typeof updater === "function" ? updater(currentPagination) : updater;

        onPageChange(newPagination.pageIndex, newPagination.pageSize);
      }
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(onSortingChange ? sorting : localSorting) : updater;

      if (onSortingChange) {
        onSortingChange(newSorting);
      } else {
        setLocalSorting(newSorting);
      }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: !isPaginationEnabled || isFilterApplied ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const downloadAsExcel = () => {
    try {
      const visibleColumns = table.getAllColumns().filter((column) => column.getIsVisible() && column.id !== "actions");

      const headers = visibleColumns.map((column) => {
        if (column.id === "name") return "Athlete name";
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
      XLSX.utils.book_append_sheet(wb, ws, "Athletes");

      XLSX.writeFile(wb, "athletes_list.xlsx");

      toast.success("Excel file downloaded successfully");
    } catch (error) {
      printLogs("Error downloading Brand Excel:", error);
      toast.error("Failed to download Excel file");
    }
  };

  const toolbarAttributes = [
    <Input
      placeholder="Filter athletes..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />,
    <Button variant="outline" size="sm" onClick={downloadAsExcel} className="ml-2">
      <DownloadIcon className="mr-2 h-4 w-4" />
      Export Excel
    </Button>
    // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
    // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
  ];

  return (
    <>
      <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
    </>
  );
}

export default AthleteTable;
