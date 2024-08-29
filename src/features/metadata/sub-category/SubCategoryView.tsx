import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/button/BackButton";
import NameIdList from "../../../components/core/view/NameIdList";
import { TableHeaderWrapper } from "../../../components/table/table-header-wrapper";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { TableCell, TableRow } from "../../../components/ui/table";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import MetadataService from "../../../services/features/MetadataService";
import { subCategory } from "../../../types/metadata/Metadata";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import ErrorService from "../../../services/error/ErrorService";
import { toast } from "sonner";

function SubCategoryView() {
    const { id } = useParams<string>();
    const [viewData, setViewData] = useState<subCategory>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const fetchTeam = async () => {
        try {
            setLoading(true);
            if (!id) {
                setLoading(false);
                return;
            }
            const resp = await MetadataService.getOneSubCategory(id ? id : "");
            if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
                throw new Error("");
            }

            const viewObj = resp?.data;

            setViewData(viewObj);
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This sub category does not exists");
                navigate(-1);
            } else {
                toast.error("An unknown error occurred");
                navigate(-1);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const infoHeaders: { header: string; className?: string }[] = [
        { header: "Name" }
    ];

    return (
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Sub Category View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button size="sm">
                            <Pencil className="h-4 w-4" />{" "}
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <TableHeaderWrapper headersArray={infoHeaders}>
                                <TableRow>
                                    <TableCell>
                                        {viewData?.subcategoryName || "-"}
                                    </TableCell>
                                </TableRow>
                            </TableHeaderWrapper>
                        </Card>
                        <NameIdList
                            data={[viewData?.category]}
                            navLink={NAVIGATION_ROUTES.MAIN_CATEGORY}
                            title={"Main Category"}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SubCategoryView;
