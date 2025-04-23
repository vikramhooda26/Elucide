import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { matched, notMatched } from "@/types/metadata/Metadata";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isMandatory: boolean;
}

export function OptionalColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isMandatory
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const setMatched = (matched: string) => {
    if (matched?.length > 0) {
      column?.setFilterValue(matched);
    } else {
      column?.setFilterValue("");
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <div className="flex items-center gap-2">
              {isMandatory ? (
                <Checkbox
                  className="peer block h-4 w-4 rounded-sm bg-green-100 text-sm font-medium ring-offset-2 focus:ring-green-500 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-500"
                  checked={isMandatory}
                />
              ) : null}
              <label className="block text-sm font-medium">{title || ""} </label>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              setMatched(matched);
            }}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Matched
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMatched(notMatched);
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Not Matched
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMatched("");
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            ALL
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default OptionalColumnHeader;
