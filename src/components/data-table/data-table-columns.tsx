import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { TableConfig } from "../../types/table/TableColumns";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export function generateColumns<T extends object>(config: TableConfig<T>): ColumnDef<T>[] {
    const columns: ColumnDef<T>[] = [];

    if (config.showCheckbox) {
        columns.push({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }: CellContext<T, unknown>) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false
        });
    }

    columns.push(
        ...config.columns.map((columnConfig) => {
            const column: ColumnDef<T> = {
                accessorKey: columnConfig.key,
                header: ({ column }) => <DataTableColumnHeader column={column} title={columnConfig.title} />,
                cell: columnConfig.customRender
                    ? columnConfig.customRender
                    : ({ row }: CellContext<T, unknown>) => {
                          const value = row.getValue(columnConfig.key);

                          if (columnConfig.route && "id" in row.original) {
                              const id = (row.original as { id: string }).id;
                              return (
                                  <Link
                                      to={`${columnConfig.route}/${id}`}
                                      className="cursor-pointer hover:text-blue-500 hover:underline"
                                  >
                                      {String(value)}
                                  </Link>
                              );
                          }

                          return <div>{String(value)}</div>;
                      },
                enableSorting: columnConfig.sortable ?? true,
                enableHiding: columnConfig.hideable ?? true
            };

            return column;
        })
    );

    columns.push({
        id: "actions",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Actions"} />,
        cell: ({ row }: CellContext<T, unknown>) => (
            <DataTableRowActions
                row={row}
                //@ts-ignore
                routes={config.routes}
                schema={config.schema}
            />
        )
    });

    return columns;
}
