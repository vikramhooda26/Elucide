import { flexRender } from "@tanstack/react-table";
import { useRecoilValue } from "recoil";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { listLoadingAtom } from "../../store/atoms/global";
import { DataTableProps } from "../../types/components/Table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

function DataTable<TData, TValue>({ table, columns, toolbarAttributes }: DataTableProps<TData, TValue>) {
    const isLoading = useRecoilValue(listLoadingAtom);

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} toolbarAttributes={toolbarAttributes} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <>
                                {Array.from({ length: 10 }).map((_row, index) => (
                                    <TableRow className="max-h-dvh animate-pulse overflow-hidden" key={index}>
                                        {Array.from({
                                            length: columns.length
                                        }).map((_column, index) => (
                                            <TableCell key={index}>
                                                <div className="h-6 w-[69%] rounded-3xl bg-gray-500" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    // onClick={() => {
                                    //     console.log(row);
                                    //     callbacks?.onView(row?.original?.id);
                                    // }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <div className="line-clamp-2 text-ellipsis">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

export default DataTable;
