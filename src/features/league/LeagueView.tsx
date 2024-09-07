import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/button/BackButton";
import { socials } from "../../components/core/data/socials";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import Activation from "../../components/core/view/Activation";
import Association from "../../components/core/view/Association";
import AudienceProfile from "../../components/core/view/AudienceProfile";
import ContactPerson from "../../components/core/view/ContactPerson";
import LeagueOverviewCard from "../../components/core/view/LeagueOverviewCard";
import LinksCard from "../../components/core/view/LinksCard";
import MarketingOverviewCard from "../../components/core/view/MarketingOverviewCard";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import ViewershipReach from "../../components/core/view/ViewershipReach";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { printLogs } from "../../lib/logs";
import ErrorService from "../../services/error/ErrorService";
import LeagueService from "../../services/features/LeagueService";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { TEditLeagueFormSchema } from "./constants.ts/metadata";

function LeagueView() {
    const { id } = useParams();
    const [league, setLeague] = useState<TEditLeagueFormSchema>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const userRole = useUser()?.role;

    if (!userRole) {
        return;
    }

    const fetchLeague = async (id: string) => {
        try {
            setLoading(true);
            const response = await LeagueService.getOne(id);
            if (response.status === HTTP_STATUS_CODES.OK) {
                setLeague(response.data);
                printLogs("League details:", response.data);
            } else {
                toast.error("Internal server error");
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("This league does not exists");
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
            fetchLeague(id);
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
                        League Profile
                    </h1>
                    <div className="hidden items-center gap-2 sm:ml-auto sm:flex">
                        {userRole === "SUPER_ADMIN" || userRole === "ADMIN" ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    navigate(
                                        `${NAVIGATION_ROUTES.EDIT_LEAGUE}/${id}`,
                                        { state: league }
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
                                <LeagueOverviewCard data={league} />
                                <MarketingOverviewCard data={league} />
                                <LinksCard
                                    data={league}
                                    metadatas={socials}
                                    title="Digital Presence"
                                />
                                <ViewershipReach data={league} />
                                <Association data={league} />
                            </div>
                            <AudienceProfile data={league} title={"League"} />
                        </div>
                        <div className="my-4 lg:my-8">
                            <div className="space-y-4 lg:space-y-8">
                                <SportsDealSummary
                                    data={league}
                                    partnerKey={"league"}
                                />
                                <Activation
                                    data={league}
                                    partnerKey={"league"}
                                />
                            </div>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <ContactPerson data={league} />
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default LeagueView;
