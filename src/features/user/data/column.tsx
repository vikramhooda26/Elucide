import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import z from "zod";
import { createSchema } from "../../../components/core/schema/schema";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { TRoles } from "../../../lib/constants";
import { userSchema } from "../constants/schema";

interface TColumnProps {
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
    const schema = userSchema;
    type TSchemaType = z.infer<typeof schema>;
    const column: ColumnDef<TSchemaType>[] = [
        {
            accessorKey: searchQuerykey,
            header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
            cell: ({ row }) => {
                const id = (row.original as { id: string }).id;
                if (id && viewRoute && viewRoute?.length > 0) {
                    return (
                        <Link to={`${viewRoute}/${id}`} className="cursor-pointer hover:text-blue-600 hover:underline">
                            <div className="w-[120px]">{row.getValue(searchQuerykey) || "N/A"}</div>
                        </Link>
                    );
                } else {
                    return <div className="w-[120px]">{row.getValue(searchQuerykey) || "N/A"}</div>;
                }
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "email",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">{row.getValue("email") || "N/A"}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: "first_name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("first_name") || "N/A"}</div>,
            enableSorting: true,
            enableHiding: false
        },
        {
            accessorKey: "date_joined",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Joined on" />,
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("date_joined")
                                ? format(row.getValue("date_joined"), "dd-MM-yyyy, hh:mm aaaaaa")
                                : "N/A"}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "role",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("role") || "N/A"}</div>,
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
