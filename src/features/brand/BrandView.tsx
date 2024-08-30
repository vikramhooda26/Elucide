import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/button/BackButton";
import { socials } from "../../components/core/data/socials";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import Activation from "../../components/core/view/Activation";
import AudienceProfile from "../../components/core/view/AudienceProfile";
import BrandOverviewCard from "../../components/core/view/BrandOverviewCard";
import CategoriesCard from "../../components/core/view/CategoriesCard";
import ContactPerson from "../../components/core/view/ContactPerson";
import LinksCard from "../../components/core/view/LinksCard";
import MarketingOverviewCard from "../../components/core/view/MarketingOverviewCard";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import BrandService from "../../services/features/BrandService";
import { useAuth } from "../auth/auth-provider/AuthProvider";

function BrandView() {
    const { id } = useParams<string>();
    const [brand, setBrand] = useState<any>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchTeam = async (id: string) => {
        try {
            setLoading(true);
            const response = await BrandService.getOne(id ? id : "");
            if (response.status === HTTP_STATUS_CODES.OK) {
                const teamObj = response?.data;
                teamObj.createdBy = teamObj?.createdBy?.firstName || "";
                teamObj.modifiedBy = teamObj?.modifiedBy?.firstName || "";
                setBrand(teamObj);
            } else {
                toast.error(
                    "Looks like our servers are down. Please try again later!"
                );
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This brand does not exists");
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
        } else {
            navigate(-1);
        }
    }, [id]);

    return (
        <main className="my-8 flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Brand Profile
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {userRole === "SUPER_ADMIN" ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    navigate(
                                        `${NAVIGATION_ROUTES.EDIT_BRAND}/${id}`
                                    )
                                }
                            >
                                <Pencil className="h-4 w-4" />{" "}
                            </Button>
                        ) : null}
                    </div>
                </div>
                {isLoading ? (
                    <FormSkeleton />
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <BrandOverviewCard data={brand} />

                                <CategoriesCard data={brand} />

                                <MarketingOverviewCard data={brand} />

                                <LinksCard
                                    data={brand}
                                    metadatas={socials}
                                    title="Digital Presence"
                                />
                            </div>
                            <AudienceProfile data={brand} title={"Brand"} />
                        </div>
                        <div className="my-4 lg:my-8">
                            <div className="space-y-4 lg:space-y-8">
                                <SportsDealSummary
                                    data={brand}

                                />
                                <Activation data={brand} />
                            </div>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <ContactPerson data={brand} />
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default BrandView;
