import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { DataTableToolbarProps } from "../../types/components/Table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import React from "react";

export function DataTableToolbar<TData>({ table, toolbarAttributes }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {toolbarAttributes?.length > 0 &&
                    toolbarAttributes?.map((jsxAttributes, index) => (
                        <React.Fragment key={index}>{jsxAttributes}</React.Fragment>
                    ))}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
