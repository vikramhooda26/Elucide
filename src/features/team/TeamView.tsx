import { ChevronLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveCampaing from "../../components/core/common/ActiveCampaing";
import Association from "../../components/core/common/Association";
import Attributes from "../../components/core/common/Attributes";
import ContactPerson from "../../components/core/common/ContactPerson";
import Endorsements from "../../components/core/common/Endorsements";
import Marketing from "../../components/core/common/Marketing";
import Socials from "../../components/core/common/Socials";
import SportsDealSummary from "../../components/core/common/SportsDealSummary";
import StrategyOverview from "../../components/core/common/StrategyOverview";
import TagLines from "../../components/core/common/TagLines";
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
import Activation from "../../components/core/common/Activation";

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
        { header: "Franchise Fee (in cr)" },
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
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 my-8">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="flex items-center gap-4 mb-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Team View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {userRole === "SUPER_ADMIN" ?
                            <Button size="sm"
                                onClick={() => navigate(`${NAVIGATION_ROUTES.EDIT_TEAM}/${id}`)}
                            >
                                <Pencil className="w-4 h-4" />{" "}
                            </Button>
                            : null}
                    </div>
                </div>
                {isLoading ? (
                    <FormSkeleton />
                ) : (<>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <TableHeaderWrapper headersArray={teamInfoHeaders}>
                                    <TableRow>
                                        <TableCell>{team?.name || "-"}</TableCell>
                                        <TableCell>
                                            {team?.yearOfInception || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {team?.franchiseFee > 0 ? formatNumberWithCommas(team?.franchiseFee) : "-"}
                                        </TableCell>
                                    </TableRow>
                                </TableHeaderWrapper>
                            </Card>

                            <StrategyOverview strategy={team?.strategyOverview} />

                            <TagLines data={team} />

                            <Marketing data={team} />

                            <Activation data={team} />

                            <Socials data={team} />

                            <ActiveCampaing data={team} />

                            <Endorsements data={team} />

                            <Association data={team} />

                            <ContactPerson data={team} />
                        </div>
                        <Attributes
                            data={team}
                            title={"Team"}
                        />
                    </div>
                    <div className="my-8">
                        <SportsDealSummary data={team} />
                    </div>
                </>)}
            </div>
        </main>
    );
}

export default TeamView;
