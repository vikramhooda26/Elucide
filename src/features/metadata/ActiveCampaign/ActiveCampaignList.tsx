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
import { getColumns } from "../../../components/core/view/common-columns";
import { ConditionalButton } from "../../../components/button/ConditionalButton";

function ActiveCampaignList() {
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

    const fetchList = async () => {
        try {
            setIsLoading(true);
            const response = await MetadataService.getAllActiveCampaign({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const teams = response.data;
                teams.forEach((team: team, i: number) => {
                    teams[i].createdBy = team?.createdBy?.email || "N/A";
                    teams[i].modifiedBy = team?.modifiedBy?.email || "N/A";
                });
                setDataList(teams);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError) {
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
            const response = await MetadataService.deleteData(id, "/api/admin/active-campaign/delete/");

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
        navigate(`${NAVIGATION_ROUTES.CAMPAIGN_EDIT}/${id}`);
    }, []);

    const viewRoute = NAVIGATION_ROUTES.CAMPAIGN;

    const canEdit = userRole !== "USER" && userRole !== "STAFF";

    const columns = useMemo(
        () =>
            getColumns({
                onDelete,
                onEdit,
                userRole,
                viewRoute,
                searchQuerykey: "activeCampaignName",
                title: "Active campaign",
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
            value={(table.getColumn("activeCampaignName")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("activeCampaignName")?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
        />,
        // <DataTableFacetedFilter column={table.getColumn("createdDate")} title="Created At" options={statuses} />,
        // <DataTableFacetedFilter column={table.getColumn("modifiedDate")} title="Modiefied At" options={priorities} />
    ];

    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Active Campaign List</h2>
                    <p className="text-muted-foreground">Here&apos;s a list of active campaigns</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.CAMPAIGN_CREATE)}
                        accessLevel="all_staff"
                    >
                        Create Campaign
                    </ConditionalButton>
                </div>
            </div>
            <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
        </div>
    );
}

export default ActiveCampaignList;
