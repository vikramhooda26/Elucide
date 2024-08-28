import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import ActiveCampaing from "../../components/core/view/ActiveCampaing";
import Association from "../../components/core/view/Association";
import Attributes from "../../components/core/view/Attributes";
import ContactPerson from "../../components/core/view/ContactPerson";
import Endorsements from "../../components/core/view/Endorsements";
import Marketing from "../../components/core/view/Marketing";
import Socials from "../../components/core/view/Socials";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import StrategyOverview from "../../components/core/view/StrategyOverview";
import TagLines from "../../components/core/view/TagLines";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import LeagueService from "../../services/features/LeagueService";
import ErrorService from "../../services/error/ErrorService";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { toast } from "sonner";
import { printLogs } from "../../lib/logs";
import { TEditLeagueFormSchema } from "./constants.ts/metadata";
import { useUser } from "../../hooks/useUser";
import Activation from "../../components/core/view/Activation";
import Owners from "../../components/core/view/Owners";
import { Separator } from "../../components/ui/separator";
import ViewershipReach from "../../components/core/view/ViewershipReach";

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
                        League View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {userRole === "SUPER_ADMIN" ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    navigate(
                                        `${NAVIGATION_ROUTES.EDIT_LEAGUE}/${id}`
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
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <div className="m-3">
                                        <ul className="grid gap-3">
                                            <li className="flex items-center">
                                                <span className="w-1/2">
                                                    Name
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.name || "-"}
                                                </span>
                                            </li>
                                            <li>
                                                <Separator className="my-2" />
                                                <div className="flex">
                                                    <span className="w-1/2">
                                                        League Owners
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        <Owners
                                                            data={league}
                                                            title={"League"}
                                                        />
                                                    </span>
                                                </div>
                                                <Separator className="my-2" />
                                            </li>
                                            <li className="flex">
                                                <span className="w-1/2">
                                                    Sports
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.sport?.name || "-"}
                                                </span>
                                            </li>

                                            <li className="flex items-center">
                                                <span className="w-1/2">
                                                    Year Of Inception
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.yearOfInception ||
                                                        "-"}
                                                </span>
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-1/2">
                                                    Format
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.format?.name ||
                                                        "-"}
                                                </span>
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-1/2">
                                                    Broadcast Partner
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.broadcastPartner
                                                        ?.name || "-"}
                                                </span>
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-1/2">
                                                    OTT Partner
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {league?.ottPartner?.name ||
                                                        "-"}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </Card>

                                <ViewershipReach data={league} />

                                <StrategyOverview
                                    strategy={league?.strategyOverview}
                                />

                                <Socials data={league} />

                                <Marketing data={league} />

                                <TagLines data={league} />

                                <Endorsements data={league} />

                                <ActiveCampaing data={league} />

                                <Association data={league} />
                            </div>
                            <Attributes data={league} title={"League"} />
                        </div>
                        <div className="my-8">
                            <div className="space-y-4 ">
                                <Activation data={league} />
                                <SportsDealSummary data={league} />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                                <ContactPerson data={league} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default LeagueView;
