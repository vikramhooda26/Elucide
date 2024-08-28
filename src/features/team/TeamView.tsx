import { ChevronLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveCampaing from "../../components/core/view/ActiveCampaing";
import Association from "../../components/core/view/Association";
import Attributes from "../../components/core/view/Attributes";
import ContactPerson from "../../components/core/view/ContactPerson";
import Endorsements from "../../components/core/view/Endorsements";
import Marketing from "../../components/core/view/Marketing";
import LinksCard from "../../components/core/view/LinksCard";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import StrategyOverview from "../../components/core/view/StrategyOverview";
import TagLines from "../../components/core/view/TagLines";
import { TableHeaderWrapper } from "../../components/table/table-header-wrapper";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { TableCell, TableRow } from "../../components/ui/table";
import TeamService from "../../services/features/TeamService";
import { formatNumberWithCommas } from "../utils/helpers";
import BackButton from "../../components/button/BackButton";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import { useUser } from "../../hooks/useUser";
import Activation from "../../components/core/view/Activation";
import Owners from "../../components/core/view/Owners";
import { Separator } from "../../components/ui/separator";
import ViewershipReach from "../../components/core/view/ViewershipReach";
import { socials } from "../../components/core/data/socials";

function TeamView() {
    const { id } = useParams<string>();
    const [team, setTeam] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const teamInfoHeaders: { header: string; className?: string }[] = [
        { header: "Name" },
        { header: "Year of Inception" },
        { header: "Franchise Fee (in cr)" }
    ];

    const fetchTeam = async () => {
        try {
            setIsLoading(true);
            if (!id) {
                setIsLoading(false);
                return;
            }
            const resp = await TeamService.getOne(id ? id : "");
            if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
                throw new Error("");
            }
            const teamObj = resp?.data;

            teamObj.createdBy = teamObj?.createdBy?.firstName || "";
            teamObj.modifiedBy = teamObj?.modifiedBy?.firstName || "";

            setTeam(teamObj);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <main className="my-8 flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="mb-4 flex items-center gap-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Team View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {userRole === "SUPER_ADMIN" ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    navigate(
                                        `${NAVIGATION_ROUTES.EDIT_TEAM}/${id}`
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
                                    <TableHeaderWrapper
                                        headersArray={teamInfoHeaders}
                                    >
                                        <TableRow>
                                            <TableCell>
                                                {team?.name || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {team?.yearOfInception || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {team?.franchiseFee > 0
                                                    ? formatNumberWithCommas(
                                                          team?.franchiseFee
                                                      )
                                                    : "-"}
                                            </TableCell>
                                        </TableRow>
                                    </TableHeaderWrapper>
                                </Card>

                                <Card x-chunk="dashboard-07-chunk-0">
                                    <div className="m-3">
                                        <ul className="grid gap-3">
                                            <li>
                                                <div className="flex">
                                                    <span className="w-1/2">
                                                        Team Owners
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        <Owners
                                                            data={team}
                                                            title={"Team"}
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
                                                    {team?.sport?.name || "-"}
                                                </span>
                                            </li>

                                            <li className="flex">
                                                <span className="w-1/2">
                                                    City
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {team?.city?.name || "-"}
                                                </span>
                                            </li>

                                            <li className="flex">
                                                <span className="w-1/2">
                                                    State
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {team?.state?.name || "-"}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </Card>

                                <ViewershipReach data={team} />

                                <StrategyOverview
                                    strategy={team?.strategyOverview}
                                />

                                <LinksCard
                                    data={team}
                                    metadatas={socials}
                                    title="Socials"
                                />

                                <Marketing data={team} />

                                <TagLines data={team} />

                                <Endorsements data={team} />

                                <ActiveCampaing data={team} />

                                <Association data={team} />
                            </div>
                            <Attributes data={team} title={"Team"} />
                        </div>
                        <div className="my-8">
                            <div className="space-y-4">
                                <Activation data={team} />
                                <SportsDealSummary data={team} />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <ContactPerson data={team} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default TeamView;
