/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
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
import { ConditionalButton } from "../../components/button/ConditionalButton";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import MetadataService from "../../services/features/MetadataService";
import { listLoadingAtom } from "../../store/atoms/global";
import { team } from "../../types/team/TeamListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { priorities, statuses } from "./data/data";
import { getColumns } from "../../components/core/view/activation-columns";
import SelectBox from "../../components/ui/multi-select";

function ActivationList() {
    const navigator = useNavigator();
    const [dataList, setDataList] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const [filterField, setFilterField] = useState<string>("");

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchList = async () => {
        try {
            setIsLoading(true);
            const response = await MetadataService.getAllActivation({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const activations = response.data;
                activations.forEach((activation: team, i: number) => {
                    activations[i].createdBy = activation?.createdBy?.email || "N/A";
                    activations[i].modifiedBy = activation?.modifiedBy?.email || "N/A";
                });
                setDataList(activations);
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
            const response = await MetadataService.deleteData(id, "/api/admin/activation/delete/");

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
        navigate(`${NAVIGATION_ROUTES.ACTIVATION_EDIT}/${id}`);
    }, []);

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const viewRoute = NAVIGATION_ROUTES?.ACTIVATION;

    const filterColumnOptions = [
        { label: "Activation Name", value: "name" },
        { label: "Brand", value: "brand" },
        { label: "Partner", value: "partner" }
    ];

    // Just pass onView to make the name clickable
    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                viewRoute,
                nameSearchQueryKey: "name",
                name: "Activation name",
                brandSearchQueryKey: "brand",
                brandTitle: "Brand name",
                partnerSearchQueryKey: "partner",
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

    const toolbarAttributes = [
        <Input
            placeholder="Filter tasks..."
            value={(table.getColumn(filterField || "name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterField || "name")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />,
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
                    <h2 className="text-2xl font-bold tracking-tight">Activation List</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of activatios.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.ACTIVATION_CREATE)}
                        accessLevel="all_staff"
                    >
                        Create Activation
                    </ConditionalButton>
                </div>
            </div>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
        </div>
    );
}

export default ActivationList;
