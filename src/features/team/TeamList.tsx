import { useEffect, useState } from "react";
// import { DataTable } from "../../components/table/data-table";
import { getTaskList } from "../templates/examples/tasks/data/tasksList";
import { columns } from "./data/columns";
import { priorities, statuses } from "./data/data";
import { ColumnFiltersState, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import DataTable from "../../components/table/data-table";
import { Button } from "../../components/ui/button";

function TeamList() {
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchTasks = async () => { const resp = getTaskList; setTasks(resp) }

  useEffect(() => {
    fetchTasks();
  }, [])

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className=" h-full flex-1 flex-col space-y-8  md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team List</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of teams.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Create</Button>
        </div>
      </div>
      <DataTable table={table} columns={columns} toolbarAttri={{ statuses, priorities }} />
    </div>
  )
}

export default TeamList;