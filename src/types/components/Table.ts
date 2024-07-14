import { ColumnDef, Row, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue,> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    toolbarAttri: ToolbarAttri;
}

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    toolbarAttri: ToolbarAttri;
}


export interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    labels: Labels[];
    schema: any;
}

// { label: string; 
//     value: string; 
//     icon?: ComponentType<{ className?: string | undefined; }> | undefined; 
// }[]

export interface Labels {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }> | undefined;
}
export interface Statuses {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }> | undefined;
}
export interface Priorities {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }> | undefined;
}

export interface ToolbarAttri {
    statuses: Statuses[];
    priorities: Priorities[];
}