import { Diamond, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/button/BackButton";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import NoDataText from "../../components/no-data/NoDataText";
import { TableHeaderWrapper } from "../../components/table/table-header-wrapper";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { TableCell, TableRow } from "../../components/ui/table";
import { HTTP_STATUS_CODES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import MetadataService from "../../services/features/MetadataService";
import { activation } from "../../types/metadata/Metadata";
import { useAuth } from "../auth/auth-provider/AuthProvider";

function ActivationView() {
    const { id } = useParams<string>();
    const [viewData, setViewData] = useState<activation>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const fetchTeam = async (id: string) => {
        try {
            setLoading(true);
            const response = await MetadataService.getOneActivation(id);
            if (response.status === HTTP_STATUS_CODES.OK) {
                setViewData(response.data);
            } else {
                toast.error(
                    "Looks like our servers are busy! Please try again later!"
                );
                navigate(-1);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This activation does not exists");
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
        if (id) {
            fetchTeam(id);
        }
    }, []);

    const infoHeaders: { header: string; className?: string }[] = [
        { header: "Name" },
        { header: "Year" }
    ];

    return (
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Activation View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button size="sm">
                            <Pencil className="h-4 w-4" />{" "}
                        </Button>
                    </div>
                </div>
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <TableHeaderWrapper headersArray={infoHeaders}>
                                    <TableRow>
                                        <TableCell>
                                            {viewData?.name || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {viewData?.year || "N/A"}
                                        </TableCell>
                                    </TableRow>
                                </TableHeaderWrapper>
                            </Card>

                            <div className="grid gap-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="grid gap-3 rounded-md border p-4">
                                        <div>Brand Name</div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>
                                                    {viewData?.brand?.name ||
                                                        "N/A"}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid gap-3 rounded-md border p-4">
                                        <div>Partner Name</div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>
                                                    {viewData.athlete?.name ||
                                                        viewData.league?.name ||
                                                        viewData.team?.name ||
                                                        "N/A"}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="grid gap-3 rounded-md border p-4">
                                        <div>
                                            <div>Assets</div>
                                            <ul className="mt-2 grid gap-3">
                                                {viewData?.asset &&
                                                viewData?.asset?.length > 0 ? (
                                                    viewData?.asset?.map(
                                                        (asset, i: number) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <span className="text-muted-foreground">
                                                                    <Diamond className="h-4 w-4" />
                                                                </span>
                                                                <span>
                                                                    {asset.name}
                                                                </span>
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <NoDataText />
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid gap-3 rounded-md border p-4">
                                        <div>
                                            <div>Types</div>
                                            <ul className="mt-2 grid gap-3">
                                                {viewData?.type &&
                                                viewData?.type?.length > 0 ? (
                                                    viewData?.type?.map(
                                                        (type, i: number) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <span className="text-muted-foreground">
                                                                    <Diamond className="h-4 w-4" />
                                                                </span>
                                                                <span>
                                                                    {type.name}
                                                                </span>
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <NoDataText />
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid gap-3 rounded-md border p-4">
                                        <div>
                                            <div>Markets</div>
                                            <ul className="mt-2 grid gap-3">
                                                {viewData?.marketIds &&
                                                viewData?.marketIds?.length >
                                                    0 ? (
                                                    viewData?.marketIds?.map(
                                                        (market, i: number) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <span className="text-muted-foreground">
                                                                    <Diamond className="h-4 w-4" />
                                                                </span>
                                                                <span>
                                                                    {
                                                                        market.name
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <NoDataText />
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ActivationView;
