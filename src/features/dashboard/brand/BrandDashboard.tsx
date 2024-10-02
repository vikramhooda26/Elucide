import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "../../../components/ui/card";
import { useUser } from "../../../hooks/useUser";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import DashboardService from "../../../services/features/DashboardService";
import { listLoadingAtom } from "../../../store/atoms/global";
import { brand } from "../../../types/brand/BrandListTypes";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { Overview } from "../components/overview";
import BrandRecentList from "./component/BrandRecentList";
import { PieChartComponent } from "../components/PieChart";
import SimpleTable, { ColumnDefinition } from "../../../components/table/SimpleTable";

type TDashBoardData = {
    brandsCount: number;
    categoriesCount: number;
    brandsPerCategory: Array<any>;
    recentlyAddedBrands: Array<any>;
    recentlyModifiedBrands: Array<any>;
}

type Props = {
    setCount?: (count: { brandCount: number; categoriesCount: number; }) => void;
}

function BrandDashboard({ setCount }: Props) {
    const [dashboardData, setDashboardData] = useState<TDashBoardData>();
    const setIsLoading = useSetRecoilState(listLoadingAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetch = async () => {
        try {
            setIsLoading(true);
            const resp = await DashboardService.brand();
            if (resp?.status === HTTP_STATUS_CODES.OK) {
                const data = resp?.data;

                const recentCreated = data.recentlyAddedBrands?.slice(0, 6);

                recentCreated.forEach((brand: brand, i: number) => {
                    recentCreated[i].createdBy = brand?.createdBy?.email || "";
                    recentCreated[i].modifiedBy = brand?.modifiedBy?.email || "";
                });

                data.recentlyAddedBrands = recentCreated;

                const recentModified = data?.recentlyModifiedBrands?.slice(0, 6);

                recentModified.forEach((brand: brand, i: number) => {
                    recentModified[i].createdBy = brand?.createdBy?.email || "";
                    recentModified[i].modifiedBy = brand?.modifiedBy?.email || "";
                });

                data.recentlyModifiedBrands = recentModified;

                data.brandsPerCategory = data.brandsPerCategory?.map((brand: any, i: number) => {
                    return { category: brand?.name, brandCount: brand?.brandCount, };
                });

                setCount?.({ brandCount: data?.brandsCount || 0, categoriesCount: data?.categoriesCount || 0 });
                setDashboardData(data);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const columnDefinitions: ColumnDefinition[] = [
        { key: "category", label: "Category Name" },
        { key: "brandCount", label: "Number of Brands" },
    ]


    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 ">
                        <div className="pl-4 pb-2">Category Brands Overview</div>
                        <div className=" h-96 overflow-y-scroll scrollbar ">
                            <SimpleTable
                                data={dashboardData?.brandsPerCategory}
                                columns={columnDefinitions}
                                caption="Category Brands Overview"
                            />
                        </div>

                    </CardContent>
                </Card>
                {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
                <BrandRecentList
                    recentlyCreated={dashboardData?.recentlyAddedBrands?.slice(0, 6) || []}
                    recentlyModified={dashboardData?.recentlyModifiedBrands?.slice(0, 6) || []}
                />
            </div>
        </>
    );
}

export default BrandDashboard;
