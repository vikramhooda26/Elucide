import { Diamond, Globe, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import NoDataText from "../../components/no-data/NoDataText";
import { TableHeaderWrapper } from "../../components/table/table-header-wrapper";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { TableCell, TableRow } from "../../components/ui/table";
import MetadataService from "../../services/features/MetadataService";
import { sportsDealSummary } from "../../types/metadata/Metadata";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { toast } from "sonner";
import { formatNumberWithCommas } from "../utils/helpers";
import LinksCard from "../../components/core/view/LinksCard";
import { socials } from "../../components/core/data/socials";

function SportsDealSummaryView() {
    const { id } = useParams<string>();
    const [viewData, setViewData] = useState<sportsDealSummary>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchSportsDealSummary = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await MetadataService.getOneSportsDealSummary(id);
            if (response.status === HTTP_STATUS_CODES.OK) {
                setViewData(response.data);
            } else {
                toast.error(
                    "Looks like our servers are busy. Please try again later!"
                );
                navigate(-1);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This sports deal summary does not exists");
                navigate(NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST, {
                    replace: true
                });
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSportsDealSummary(id);
        }
    }, []);

    const infoHeaders: { header: string; className?: string }[] = [
        { header: "Brand Name" },
        { header: "Territory" },
        { header: "Partner Name" },
        { header: "Level" },
        { header: "Type" },
        { header: "Status" }
    ];

    return (
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Sports Deal Summary View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button size="sm">
                            <Pencil className="h-4 w-4" />{" "}
                        </Button>
                    </div>
                </div>
                {isLoading ? (
                    <FormSkeleton />
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <TableHeaderWrapper
                                        headersArray={infoHeaders}
                                    >
                                        <TableRow>
                                            <TableCell>
                                                {viewData?.brand?.name || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {viewData?.territory?.name ||
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {viewData.athlete?.name ||
                                                    viewData.team?.name ||
                                                    viewData.league?.name ||
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {viewData?.level?.name || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {viewData?.type || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {viewData?.status || "-"}
                                            </TableCell>
                                        </TableRow>
                                    </TableHeaderWrapper>
                                </Card>

                                <div className="grid gap-6">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Commencement Date</div>
                                            <ul className="grid gap-3">
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <span>
                                                        {viewData?.commencementDate ||
                                                            "-"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Expiration Date</div>
                                            <ul className="grid gap-3">
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <span>
                                                        {viewData?.expirationDate ||
                                                            "-"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Duration</div>
                                            <ul className="grid gap-3">
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <span>
                                                        {viewData?.duration ||
                                                            "-"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Annual Value</div>
                                            <ul className="grid gap-3">
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <span>
                                                        {viewData?.annualValue
                                                            ? `₹ ${formatNumberWithCommas(
                                                                  Number(
                                                                      viewData.annualValue
                                                                  )
                                                              )}`
                                                            : "N/A"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Total Value</div>
                                            <ul className="grid gap-3">
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <span>
                                                        {viewData?.totalValue
                                                            ? `₹ ${formatNumberWithCommas(
                                                                  Number(
                                                                      viewData.totalValue
                                                                  )
                                                              )}`
                                                            : "N/A"}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <LinksCard
                                    data={viewData}
                                    metadatas={[
                                        {
                                            key: "mediaLink",
                                            name: "Media Link",
                                            icon: <Globe />
                                        }
                                    ]}
                                    title="Media Link"
                                />

                                <div className="grid gap-6">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="grid gap-3 rounded-md border p-4">
                                            <div>Assets</div>
                                            <ul className="grid gap-3">
                                                {viewData?.assets &&
                                                viewData?.assets?.length > 0 ? (
                                                    viewData?.assets?.map(
                                                        (asset, i) => (
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
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default SportsDealSummaryView;
