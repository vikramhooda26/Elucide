import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { DataTableColumnHeader } from "../../data-table/data-table-column-header";
import { DataTableRowActions } from "../../data-table/data-table-row-actions";
import { TRoles } from "../../../lib/constants";
import { createSchema } from "../schema/schema";
import z from "zod";

export interface TColumnProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    userRole: TRoles;
    viewRoute?: string;
    title: string;
    searchQuerykey: string;
    canEdit?: boolean;
}

export const getColumns = ({
    onEdit,
    onDelete,
    userRole,
    viewRoute,
    searchQuerykey,
    title,
    canEdit = false
}: TColumnProps) => {
    const schema = createSchema({ name: searchQuerykey });
    type TSchemaType = z.infer<typeof schema>;
    const column: ColumnDef<TSchemaType>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) =>
        //                 table.toggleAllPageRowsSelected(!!value)
        //             }
        //             aria-label="Select all"
        //             className="translate-y-[2px]"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //             className="translate-y-[2px]"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false
        // },
        {
            accessorKey: searchQuerykey,
            header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
            cell: ({ row }) => {
                const id = (row.original as { id: string }).id;
                if (id && viewRoute && viewRoute?.length > 0) {
                    return (
                        <Link to={`${viewRoute}/${id}`} className="cursor-pointer hover:text-blue-600 hover:underline">
                            <div className="w-[120px]">{row.getValue(searchQuerykey)}</div>
                        </Link>
                    );
                } else {
                    return <div className="w-[120px]">{row.getValue(searchQuerykey)}</div>;
                }
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "createdDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("createdDate")
                                ? format(row.getValue("createdDate"), "dd-MM-yyyy, hh:mm aaaaaa")
                                : ""}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "createdBy",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("createdBy")}</div>,
            enableSorting: true,
            enableHiding: false
        },
        {
            accessorKey: "modifiedDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Modified At" />,
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("modifiedDate")
                                ? format(row.getValue("modifiedDate"), "dd-MM-yyyy, hh:mm aaaaaa")
                                : ""}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "modifiedBy",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Modified By" />,
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("modifiedBy")}</div>,
            enableSorting: false,
            enableHiding: false
        }
    ];

    if (userRole === "SUPER_ADMIN" || canEdit) {
        column.push({
            id: "actions",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
            cell: ({ row }) => (
                <DataTableRowActions row={row} onDelete={onDelete} onEdit={onEdit} schema={schema} canEdit={canEdit} />
            )
        });
    }

    return column;
};
