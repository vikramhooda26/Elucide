import { differenceInYears, format } from "date-fns";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/button/BackButton";
import { socials } from "../../components/core/data/socials";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import Activation from "../../components/core/view/Activation";
import Association from "../../components/core/view/Association";
import AthleteOverviewCard from "../../components/core/view/AthleteOverviewCard";
import AudienceProfile from "../../components/core/view/AudienceProfile";
import ContactPerson from "../../components/core/view/ContactPerson";
import LinksCard from "../../components/core/view/LinksCard";
import Marketing from "../../components/core/view/Marketing";
import MarketingOverviewCard from "../../components/core/view/MarketingOverviewCard";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import AthleteService from "../../services/features/AthleteService";
import { useAuth } from "../auth/auth-provider/AuthProvider";

function AthleteView() {
    const { id } = useParams<string>();
    const [athlete, setAthlete] = useState<any>({});
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
            const response = await AthleteService.getOne(id);
            if (response.status === HTTP_STATUS_CODES.OK) {
                const athleteObj = response?.data;

                athleteObj.createdBy = athleteObj?.createdBy?.firstName || "";
                athleteObj.modifiedBy = athleteObj?.modifiedBy?.firstName || "";

                if (athleteObj?.athleteAge) {
                    athleteObj.dob = format(
                        athleteObj?.athleteAge,
                        "dd-MM-yyyy"
                    );
                    athleteObj.athleteAge = differenceInYears(
                        new Date(),
                        athleteObj?.athleteAge
                    );
                }
                setAthlete(athleteObj);
            } else {
                toast.error("An unknown error occurred");
                navigate(-1);
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This athlete does not exists");
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
        <div className="my-8 flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Athlete Profile
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {(userRole === "SUPER_ADMIN" ||
                            userRole === "ADMIN") && (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        navigate(
                                            `${NAVIGATION_ROUTES.EDIT_ATHLETE}/${id}`
                                        )
                                    }
                                >
                                    <Pencil className="h-4 w-4" />{" "}
                                </Button>
                            )}
                    </div>
                </div>
                {isLoading ? (
                    <FormSkeleton />
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <AthleteOverviewCard athlete={athlete} />
                                <MarketingOverviewCard data={athlete} />
                                <LinksCard
                                    data={athlete}
                                    metadatas={socials}
                                    title="Digital Presence"
                                />
                                <Association data={athlete} />
                            </div>
                            <AudienceProfile data={athlete} title={"Athlete"} />
                        </div>
                        <div className="my-4 lg:my-8">
                            <div className="space-y-4 lg:space-y-8">
                                <SportsDealSummary
                                    data={athlete}
                                    partnerKey={"athlete"}
                                />
                                <Activation
                                    data={athlete}
                                    partnerKey={"athlete"}
                                />
                            </div>
                        </div>

                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <ContactPerson data={athlete} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AthleteView;
