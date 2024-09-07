import {
    CaretSortIcon,
    ChevronDownIcon,
    Cross2Icon
} from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import * as React from "react";
import { Link } from "react-router-dom";
import { DataTablePagination } from "../data-table/data-table-pagination";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import { DataTableRowActions } from "../data-table/data-table-row-actions";
import { ActionButtons } from "./ActionButtons";

type Props = {
    data: Array<any>;
    columns: Array<{ name: string; key: string; navigate?: boolean }>;
    searchableKey: string;
    toolbarAttributes?: JSX.Element[];
    viewRoute?: string;
    onEdit?: (id: string) => void;
    action?: { create: JSX.Element | null };
};

export function NoActionTable({
    data,
    columns,
    searchableKey,
    toolbarAttributes,
    viewRoute,
    onEdit,
    action
}: Props) {
    const [tableColumns, setTableColumns] = React.useState<ColumnDef<any>[]>(
        []
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const setHeader = () => {
        const headers: ColumnDef<any>[] = [];
        columns?.forEach((header, i) => {
            headers.push({
                accessorKey: header?.key,
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                            className="flex items-center justify-start p-0 hover:bg-transparent active:brightness-50"
                        >
                            {header?.name || "N/A"}
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }) => {
                    const id = (row.original as { id: string }).id;
                    if (
                        id &&
                        viewRoute &&
                        viewRoute?.length > 0 &&
                        header?.navigate
                    ) {
                        return (
                            <Link
                                to={`${viewRoute}/${id}`}
                                className="cursor-pointer hover:text-blue-600 hover:underline"
                            >
                                <div className="line-clamp-2 text-ellipsis">
                                    {row.getValue(header?.key) || "N/A"}
                                </div>
                            </Link>
                        );
                    } else {
                        return <div>{row.getValue(header?.key) || "N/A"}</div>;
                    }
                }
            });
            if (i + 1 == columns?.length && onEdit) {
                headers.push({
                    accessorKey: header?.key,
                    header: () => {
                        return (
                            <Button
                                variant="ghost"
                                className="flex items-center justify-start p-0 hover:bg-transparent active:brightness-50"
                            >
                                Action

                            </Button>
                        );
                    },
                    cell: ({ row }) => {
                        return (
                            <ActionButtons
                                row={row}
                                onEdit={onEdit}
                                canEdit={true}
                            />
                        )
                    }
                });
            }
        });

        setTableColumns(headers);
    };

    React.useEffect(() => {
        setHeader();
    }, [columns]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    value={
                        (table
                            .getColumn(searchableKey)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchableKey)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="mx-2 flex flex-1 items-center space-x-2">
                    {toolbarAttributes &&
                        toolbarAttributes?.length > 0 &&
                        toolbarAttributes?.map((jsxAttributes, index) => (
                            <React.Fragment key={index}>
                                {jsxAttributes}
                            </React.Fragment>
                        ))}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns{" "}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {action?.create ? action?.create : null}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows &&
                            table.getRowModel().rows?.length ? (
                            table.getRowModel()?.rows?.map((row) => (
                                <TableRow
                                    key={row?.id}
                                    data-state={
                                        row?.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            ) || "N/A"}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} showSelectedCount={false} />
            </div>
        </div>
    );
}
