import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { NavigateFunction } from "react-router-dom";

export interface DataTableProps<TData, TValue> {
    table: Table<any>;
    columns: ColumnDef<TData, TValue>[];
    toolbarAttributes: JSX.Element[];
    callbacks?: {
        onView: (id: string) => void;
    };
}

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    toolbarAttributes: JSX.Element[];
}

export interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
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
