import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import z from "zod";
import { TRoles } from "../../../lib/constants";
import { DataTableColumnHeader } from "../../data-table/data-table-column-header";
import { DataTableRowActions } from "../../data-table/data-table-row-actions";
import { createSummarySchema } from "../schema/summary-schema";

interface TColumnProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    userRole: TRoles;
    viewRoute?: string;
    brandTitle: string;
    partnerTitle: string;
    brandSearchQuerykey: string;
    partnerSearchQueryKey: string;
}

export const getColumns = ({
    onEdit,
    onDelete,
    userRole,
    viewRoute,
    brandSearchQuerykey,
    partnerSearchQueryKey,
    brandTitle,
    partnerTitle
}: TColumnProps) => {
    const schema = createSummarySchema({
        brandName: brandSearchQuerykey,
        partnerName: partnerSearchQueryKey
    });
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
            accessorKey: brandSearchQuerykey,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={brandTitle} />
            ),
            cell: ({ row }) => {
                const id = (row.original as { id: string }).id;
                if (id && viewRoute && viewRoute?.length > 0) {
                    return (
                        <Link
                            to={`${viewRoute}/${id}`}
                            className="cursor-pointer hover:text-blue-600 hover:underline"
                        >
                            <div className="w-[120px]">
                                {row.getValue(brandSearchQuerykey)}
                            </div>
                        </Link>
                    );
                } else {
                    return (
                        <div className="w-[120px]">
                            {row.getValue(brandSearchQuerykey)}
                        </div>
                    );
                }
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: partnerSearchQueryKey,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={partnerTitle} />
            ),
            cell: ({ row }) => {
                const id = (row.original as { id: string }).id;
                if (id && viewRoute && viewRoute?.length > 0) {
                    return (
                        <Link
                            to={`${viewRoute}/${id}`}
                            className="cursor-pointer hover:text-blue-600 hover:underline"
                        >
                            <div className="w-[120px]">
                                {row.getValue(partnerSearchQueryKey)}
                            </div>
                        </Link>
                    );
                } else {
                    return (
                        <div className="w-[120px]">
                            {row.getValue(partnerSearchQueryKey)}
                        </div>
                    );
                }
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "createdDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("createdDate")
                                ? format(
                                      row.getValue("createdDate"),
                                      "dd-MM-yyyy, hh:mm aaaaaa"
                                  )
                                : ""}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "createdBy",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created By" />
            ),
            cell: ({ row }) => (
                <div className="w-[80px]">{row.getValue("createdBy")}</div>
            ),
            enableSorting: true,
            enableHiding: false
        },
        {
            accessorKey: "modifiedDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Modified At" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("modifiedDate")
                                ? format(
                                      row.getValue("modifiedDate"),
                                      "dd-MM-yyyy, hh:mm aaaaaa"
                                  )
                                : ""}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "modifiedBy",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Modified By" />
            ),
            cell: ({ row }) => (
                <div className="w-[80px]">{row.getValue("modifiedBy")}</div>
            ),
            enableSorting: false,
            enableHiding: false
        }
    ];

    if (userRole === "SUPER_ADMIN") {
        column.push({
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actions" />
            ),
            cell: ({ row }) => (
                <DataTableRowActions
                    row={row}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    schema={schema}
                />
            )
        });
    }

    return column;
};
