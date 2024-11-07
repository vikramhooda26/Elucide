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
import DataTable from "../../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../../components/data-table/data-table-faceted-filter";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useNavigator from "../../../hooks/useNavigator";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { listLoadingAtom } from "../../../store/atoms/global";
import { team } from "../../../types/team/TeamListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { priorities, statuses } from "./data/data";
import { useUser } from "../../../hooks/useUser";
import { ConditionalButton } from "../../../components/button/ConditionalButton";
import { getColumns } from "./data/columns";

function SubCategoryList() {
    const navigator = useNavigator();
    const [dataList, setDataList] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchList = async () => {
        try {
            setIsLoading(true);
            const response = await MetadataService.getAllSubCategory({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const subCategories = response.data;
                subCategories.forEach((subCategory: team, i: number) => {
                    subCategories[i].createdBy = subCategory?.createdBy?.email || "N/A";
                    subCategories[i].modifiedBy = subCategory?.modifiedBy?.email || "N/A";
                });
                setDataList(subCategories);
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

    const onDelete = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.deleteData(id, "/api/admin/subcategory/delete/");

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
        navigate(`${NAVIGATION_ROUTES.SUB_CATEGORY_EDIT}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.SUB_CATEGORY;
    const mainCatViewRoute = NAVIGATION_ROUTES.MAIN_CATEGORY;

    const canEdit = userRole === "SUPER_ADMIN";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                searchQuerykey: "subcategoryName",
                title: "Sub Category",
                canEdit,
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

    const toolbarAttributes = [
        <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("subcategoryName")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("subcategoryName")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
    ];

    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Sub Category List</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of sub categories.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.SUB_CATEGORY_CREATE)}
                        accessLevel="super_admin"
                    >
                        Create Sub Category
                    </ConditionalButton>
                </div>
            </div>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
        </div>
    );
}

export default SubCategoryList;
