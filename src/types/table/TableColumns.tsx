import { CellContext } from "@tanstack/react-table";
import { z } from "zod";

export interface ColumnConfig<T> {
    key: keyof T & string;
    title: string;
    sortable?: boolean;
    hideable?: boolean;
    customRender?: (row: CellContext<T, unknown>) => JSX.Element;
    route?: string;
}

export interface TableConfig<T> {
    schema: z.ZodObject<any>;
    routes: any;
    columns: ColumnConfig<T>[];
    showCheckbox?: boolean;
}
