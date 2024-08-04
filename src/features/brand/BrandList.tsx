import { useEffect, useState } from "react";
// import { DataTable } from "../../components/table/data-table";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import DataTable from "../../components/data-table/data-table";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useNavigator from "../../hooks/useNavigator";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import BrandService from "../../services/features/BrandService";
import { brand } from "../../types/brand/BrandListTypes";
import { columns } from "./data/columns";
import { priorities, statuses } from "./data/data";
import TableSkeleton from "../../components/skeleton/TableSkeleton";

function BrandList() {
  const navigator = useNavigator();
  const [brandList, setBrandList] = useState<Array<any>>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const resp = await BrandService.getAll({});
      if (resp?.status !== 200 || resp?.data?.length <= 0) {
        throw new Error('');
      }
      const brands = resp.data;
      brands.forEach((brand: brand, i: number) => {
        brands[i].createdBy = brand?.createdBy?.email || '';
        brands[i].modifiedBy = brand?.modifiedBy?.email || '';
      });
      setBrandList(brands);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const onView = (id: string) => {
    navigator(NAVIGATION_ROUTES.BRAND, [id]);
  };

  const table = useReactTable({
    data: brandList,
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
  });

  const callbacks = {
    onView: onView,
  };

  const toolbarAttributes = [
    <Input
      placeholder="Filter tasks..."
      value={(table.getColumn("athleteName")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("brandName")?.setFilterValue(event.target.value)
      }
      className="h-8 w-[150px] lg:w-[250px]"
    />,
    <DataTableFacetedFilter
      column={table.getColumn("createdDate")}
      title="Created At"
      options={statuses}
    />
    ,
    <DataTableFacetedFilter
      column={table.getColumn("modifiedDate")}
      title="Modiefied At"
      options={priorities}
    />,
  ]

  return (
    <div className=" h-full flex-1 flex-col space-y-8  md:flex">
      {loading ? <TableSkeleton /> : null}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Brand List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of brands.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigator(NAVIGATION_ROUTES.CREATE_TEAM)}
          >
            Create
          </Button>
        </div>
      </div>
      <DataTable
        table={table}
        columns={columns}
        toolbarAttributes={toolbarAttributes}
        callbacks={callbacks}
      />
    </div>
  );
}

export default BrandList;