import { ChevronLeft, Pencil } from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import LeagueService from "../../services/features/LeagueService";
import BackButton from "../../components/button/BackButton";

function LeagueView() {
    const { id } = useParams<string>();
    const [league, setLeague] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLeague = async () => {
        try {
            setLoading(true);
            if (!id) {
                setLoading(false);
                return;
            }
            const resp = await LeagueService.getOne(id ? id : "");
            if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
                throw new Error("");
            }
            const teamObj = resp?.data;

            teamObj.createdBy = teamObj?.createdBy?.firstName || "";
            teamObj.modifiedBy = teamObj?.modifiedBy?.firstName || "";

            setLeague(teamObj);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeague();
    }, []);

    return (
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="flex items-center gap-4 mb-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        League View
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button size="sm">
                            <Pencil className="w-4 h-4" />{" "}
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <div className=" m-3">
                                <ul className="grid gap-3">
                                    <li className="flex items-center ">
                                        <span className="w-1/2">Name</span>
                                        <span className="text-muted-foreground">
                                            {league?.name || "-"}
                                        </span>
                                    </li>
                                    <li className="flex items-center ">
                                        <span className="w-1/2">
                                            Year Of Inception
                                        </span>
                                        <span className="text-muted-foreground">
                                            {league?.yearOfInception || "-"}
                                        </span>
                                    </li>
                                    <li className="flex items-center ">
                                        <span className="w-1/2">Format</span>
                                        <span className="text-muted-foreground">
                                            {league?.format || "-"}
                                        </span>
                                    </li>
                                    <li className="flex items-center ">
                                        <span className="w-1/2">
                                            Broadcast Partner
                                        </span>
                                        <span className="text-muted-foreground">
                                            {league?.broadcastPartner || "-"}
                                        </span>
                                    </li>
                                    <li className="flex items-center ">
                                        <span className="w-1/2">
                                            OTT Partner
                                        </span>
                                        <span className="text-muted-foreground">
                                            {league?.ottPartner || "-"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Card>

                        <StrategyOverview strategy={league?.strategyOverview} />

                        <TagLines data={league} />

                        <Marketing data={league} />

                        <Socials data={league} />

                        <ActiveCampaing data={league} />

                        <Endorsements data={league} />

                        <Association data={league} />

                        <ContactPerson data={league} />
                    </div>
                    <Attributes
                        data={league}
                        title={"League"}
                    />
                </div>
                <div className="my-8">
                    <SportsDealSummary data={league} />
                </div>
            </div>
        </main>
    );
}

export default LeagueView;
