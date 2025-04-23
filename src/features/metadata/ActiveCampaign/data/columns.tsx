import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../../components/data-table/data-table-row-actions";
import { Checkbox } from "../../../../components/ui/checkbox";
import { schema, schemaType } from "./schema";
import { TRoles } from "../../../../lib/constants";
import { Link } from "react-router-dom";

interface TColumnProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  userRole: TRoles;
  viewRoute?: string;
}

export const getColumns = ({ onEdit, onDelete, userRole, viewRoute }: TColumnProps): ColumnDef<schemaType>[] => {
  const column: ColumnDef<schemaType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      enableHiding: false
    },
    {
      accessorKey: "activeCampaignName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active Campaign" />,
      cell: ({ row }) => {
        const id = (row.original as { id: string }).id;
        if (id && viewRoute && viewRoute?.length > 0) {
          return (
            <Link to={`${viewRoute}/${id}`} className="cursor-pointer hover:text-blue-800">
              <div className="w-[80px]">{row.getValue("activeCampaignName")}</div>
            </Link>
          );
        } else {
          return <div className="w-[80px]">{row.getValue("activeCampaignName")}</div>;
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
              {row.getValue("createdDate") ? format(row.getValue("createdDate"), "dd-MM-yyyy, hh:mm aaaaaa") : ""}
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
              {row.getValue("modifiedDate") ? format(row.getValue("modifiedDate"), "dd-MM-yyyy, HH:mm") : ""}
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

  if (userRole === "SUPER_ADMIN") {
    column.push({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} onDelete={onDelete} onEdit={onEdit} schema={schema} />
    });
  }

  return column;
};
