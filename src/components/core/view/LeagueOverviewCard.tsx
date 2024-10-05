import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import Owners from "./Owners";

type TOverviewCardProps = {
    data: any;
};

const LeagueOverviewCard = ({ data }: TOverviewCardProps) => {
    return (
        <Card x-chunk="dashboard-07-chunk-" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">Overview</CardTitle>
                </div>
            </CardHeader>
            <div className="text-sm">
                <ul className="grid gap-3 p-6">
                    <li className="flex">
                        <span className="w-1/2">Name</span>
                        <span className="text-muted-foreground">{data?.name || "N/A"}</span>
                    </li>
                    <li className="flex">
                        <span className="w-1/2">Sport</span>
                        <span className="text-muted-foreground">{data?.sport?.name || "N/A"}</span>
                    </li>

                    <li className="flex items-center">
                        <span className="w-1/2">Year Of Inception</span>
                        <span className="text-muted-foreground">{data?.yearOfInception || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Format</span>
                        <span className="text-muted-foreground">{data?.format?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Broadcast Partner</span>
                        <span className="text-muted-foreground">{data?.broadcastPartner?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">OTT Partner</span>
                        <span className="text-muted-foreground">{data?.ottPartner?.name || "N/A"}</span>
                    </li>
                </ul>
                <Separator />
                <div className="grid gap-3 p-6">
                    <span className="w-1/2 text-lg">League Owners</span>
                    <span className="text-muted-foreground">
                        <Owners data={data} title={"League"} />
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default LeagueOverviewCard;
