import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { Checkbox } from "../../../components/ui/checkbox";
import { routes } from "./data";
import { schema, schemaType } from "./schema";

export const columns: ColumnDef<schemaType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "activationName",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Activation Name"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("activationName")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Created At"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[400px] truncate font-medium">
                        {row.getValue("createdDate")
                            ? format(
                                  row.getValue("createdDate"),
                                  "dd-MM-yyyy, HH:mm"
                              )
                            : ""}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "createdBy",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Created By"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("createdBy")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "modifiedDate",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Modified At"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[400px] truncate font-medium">
                        {row.getValue("modifiedDate")
                            ? format(
                                  row.getValue("modifiedDate"),
                                  "dd-MM-yyyy, HH:mm"
                              )
                            : ""}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "modifiedBy",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Modified By"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("modifiedBy")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Actions"
            />
        ),
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                routes={routes}
                schema={schema}
            />
        ),
    },
];
