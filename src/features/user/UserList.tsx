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
import BrandService from "../../services/features/BrandService";
import MetadataService from "../../services/features/MetadataService";
import { listLoadingAtom } from "../../store/atoms/global";
import { brand } from "../../types/brand/BrandListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { priorities, statuses } from "./data/data";
import UserService from "../../services/features/UserService";
import { printLogs } from "../../lib/logs";
import { getColumns } from "./data/column";

type TUserList = {};

const UserList: React.FC<TUserList> = () => {
  const navigator = useNavigator();
  const [userList, setUserList] = useState<any[]>([]);
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

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getAllUsers();
      if (response.status === HTTP_STATUS_CODES.OK) {
        const users = response.data?.users;
        printLogs("users list:", users);
        setUserList(users);
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
    fetchUsers();
  }, []);

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await UserService.deleteUser(id);

      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Deleted successfully");
        setUserList((prevDataList) => prevDataList.filter((data) => data.id !== id));
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);

      if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
        setUserList((prevDataList) => prevDataList.filter((data) => data.id !== id));
      } else {
        toast.error("Could not delete this user");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onEdit = useCallback((id: string) => {
    navigate(`${NAVIGATION_ROUTES.EDIT_USER}/${id}`);
  }, []);

  const canEdit = userRole === "SUPER_ADMIN";

  const columns = useMemo(
    () =>
      getColumns({
        onDelete,
        onEdit,
        userRole,
        searchQuerykey: "username",
        title: "Username",
        canEdit
      }),
    []
  );
  const table = useReactTable({
    data: userList,
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
      value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn("username")?.setFilterValue(event.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />
  ];

  return (
    <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">Here&apos;s a list of users.</p>
        </div>
        <div className="flex items-center space-x-2">
          <ConditionalButton onClick={() => navigator(NAVIGATION_ROUTES.CREATE_USER)} accessLevel="super_admin">
            Create User
          </ConditionalButton>
        </div>
      </div>
      <DataTable table={table} columns={columns} toolbarAttributes={toolbarAttributes} />
    </div>
  );
};

export default UserList;
