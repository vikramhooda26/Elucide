import { ConditionalButton } from "@/components/button/ConditionalButton";
import FilterModal, { FilterContent } from "@/components/core/filter/FilterModal";
import useNavigator from "@/hooks/useNavigator";
import { useUser } from "@/hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import BrandService from "@/services/features/BrandService";
import { fetchFilters, TPageKey } from "@/services/filter/FilterConfigs";
import FilterService from "@/services/filter/FilterService";
import { filterState } from "@/store/atoms/filterAtom";
import { listLoadingAtom } from "@/store/atoms/global";
import { brand } from "@/types/brand/BrandListTypes";
import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import BrandTable from "./data/BrandTable";

function BrandList() {
  const navigator = useNavigator();
  const [brandList, setBrandList] = useState<any[]>([]);
  // const [rowSelection, setRowSelection] = useState({});
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const pageKey: TPageKey = "brandList";
  const filterValues = useRecoilValue(filterState);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return null;
  }

  useEffect(() => {
    if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
      handleApplyFilters();
    } else {
      fetchBrands();
    }
  }, []);

  const fetchBrands = async (page = pagination.pageIndex, pageSize = pagination.pageSize, sortingState = sorting) => {
    try {
      setIsLoading(true);
      const response = await BrandService.getPaginated(
        page,
        pageSize,
        sortingState.length > 0 ? sortingState : undefined
      );
      if (response.status === HTTP_STATUS_CODES.OK) {
        const brands = response.data.items || [];
        brands.forEach((brand: brand, idx: number) => {
          brands[idx].createdBy = brand?.createdBy?.email || "N/A";
          brands[idx].modifiedBy = brand?.modifiedBy?.email || "N/A";
        });
        setBrandList(brands);
        setPagination((prev) => ({
          ...prev,
          pageIndex: page,
          pageSize: pageSize,
          totalCount: response.data.totalCount || 0
        }));
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);

    if (!isFilterApplied) {
      fetchBrands(pagination.pageIndex, pagination.pageSize, newSorting);
    }
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    if (isFilterApplied) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: newPage,
        pageSize: newPageSize
      }));
      return;
    }

    const currentlyShowingAllData =
      pagination.pageIndex === 0 &&
      pagination.totalCount <= pagination.pageSize &&
      newPageSize >= pagination.totalCount;

    if (currentlyShowingAllData) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
        pageSize: newPageSize
      }));
    } else {
      let adjustedPage = newPage;

      if (pagination.pageSize !== newPageSize) {
        const currentStartRecord = pagination.pageIndex * pagination.pageSize;
        adjustedPage = Math.floor(currentStartRecord / newPageSize);
      }

      fetchBrands(adjustedPage, newPageSize, sorting);
    }
  };

  const filterConfig: FilterContent[] = fetchFilters(pageKey);

  const handleApplyFilters = async () => {
    try {
      if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
        setIsFilterApplied(false);
        fetchBrands();
        return;
      }
      setIsLoading(true);
      const processedData = FilterService.processFilterData(filterValues[pageKey]);
      if (processedData?.brandIds) {
        processedData.ids = processedData?.brandIds;
      }
      delete processedData?.brandIds;

      const response = await BrandService.getFilteredBrands(processedData);

      if (response.status === HTTP_STATUS_CODES.OK) {
        let brandList = response.data;
        brandList.forEach((brand: brand, i: number) => {
          brandList[i].createdBy = brand?.createdBy?.email || "N/A";
          brandList[i].modifiedBy = brand?.modifiedBy?.email || "N/A";
        });

        brandList = FilterService.validateMatching(brandList, filterValues[pageKey], "brandList");

        setIsFilterApplied(true);
        setBrandList(brandList);

        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: brandList.length
        });
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
        toast.error("An unknown error occurred");
      } else {
        setBrandList([]);
        setPagination({
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Brand List</h2>
          <p className="text-muted-foreground">Here&apos;s a list of brands.</p>
        </div>
        <div className="flex items-center space-x-2">
          <FilterModal
            isOpen={isFilterModalOpen}
            filters={filterConfig}
            onClose={() => setIsFilterModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            onDiscardFilters={() => {
              setIsFilterApplied(false);
              fetchBrands(pagination.pageIndex, pagination.pageSize, sorting);
            }}
            pageKey={pageKey}
          />
          <ConditionalButton onClick={() => navigator(NAVIGATION_ROUTES.CREATE_BRAND)} accessLevel="all_staff">
            Create Brand
          </ConditionalButton>
        </div>
      </div>
      <BrandTable
        brandList={brandList}
        setBrandList={setBrandList}
        filters={filterValues[pageKey]}
        isFilterApplied={isFilterApplied}
        setIsFilterApplied={setIsFilterApplied}
        pagination={pagination}
        onPageChange={handlePageChange}
        isPaginationEnabled={true}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />
    </div>
  );
}

export default BrandList;
