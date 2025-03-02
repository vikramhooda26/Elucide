import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { ConditionalButton } from "../../components/button/ConditionalButton";
import FilterModal, { FilterContent } from "../../components/core/filter/FilterModal";
import useNavigator from "../../hooks/useNavigator";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import BrandService from "../../services/features/BrandService";
import { fetchFilters, TPageKey } from "../../services/filter/FilterConfigs";
import FilterService from "../../services/filter/FilterService";
import { filterState } from "../../store/atoms/filterAtom";
import { listLoadingAtom } from "../../store/atoms/global";
import { brand } from "../../types/brand/BrandListTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import BrandTable from "./data/BrandTable";

function BrandList() {
    const navigator = useNavigator();
    const [brandList, setBrandList] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const pageKey: TPageKey = "brandList";
    const filterValues = useRecoilValue(filterState);

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchBrands = async () => {
        try {
            setIsLoading(true);
            const response = await BrandService.getAll({});
            if (response.status === HTTP_STATUS_CODES.OK) {
                const brands = response.data;
                brands.forEach((brand: brand, i: number) => {
                    brands[i].createdBy = brand?.createdBy?.email || "N/A";
                    brands[i].modifiedBy = brand?.modifiedBy?.email || "N/A";
                });
                setBrandList(brands);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length > 0) {
            handleApplyFilters();
        } else {
            fetchBrands();
        }
    }, []);

    const filterConfig: FilterContent[] = fetchFilters(pageKey);

    const handleApplyFilters = async () => {
        try {
            if (!filterValues[pageKey] || (filterValues[pageKey] && Object.keys(filterValues[pageKey])?.length <= 0)) {
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

                brandList = FilterService.validateMatching(brandList, filterValues[pageKey]);

                setIsFilterApplied(true);

                setBrandList(brandList);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
            } else {
                setBrandList([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
            {/* <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Applied Filters:</h2>
                <ul className="list-disc pl-5">
                    {Object.entries(filterValues[pageKey] || {}).map(([key, filter]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {JSON.stringify(filter.value)}
                        </li>
                    ))}
                </ul>
            </div> */}

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
                        onDiscardFilters={fetchBrands}
                        pageKey={pageKey}
                    />
                    <ConditionalButton
                        onClick={() => navigator(NAVIGATION_ROUTES.CREATE_BRAND)}
                        accessLevel="all_staff"
                    >
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
            />
        </div>
    );
}

export default BrandList;
