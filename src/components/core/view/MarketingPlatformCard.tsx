import { Dot } from "lucide-react";
import { nameAndId } from "../../../types/metadata/Metadata";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";

type TMarketingPlatformCardProps = {
    data: any;
};

const MarketingPlatformCard = ({ data }: TMarketingPlatformCardProps) => {
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle className="text-lg font-normal">
                    Marketing Platform
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    {data?.primaryMarketingPlatform && (
                        <div className="grid gap-3 rounded-md border p-4">
                            <div>
                                <Label>Primary Marketing Platform</Label>
                                <ul className="mt-2 grid gap-1">
                                    {data?.primaryMarketingPlatform?.length ? (
                                        data?.primaryMarketingPlatform?.map(
                                            (market: any, i: number) => (
                                                <li
                                                    className="flex items-center text-sm text-muted-foreground"
                                                    key={i}
                                                >
                                                    <Dot />
                                                    <span>
                                                        {market?.name || "N/A"}
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
                    )}
                    {data?.secondaryMarketingPlatform && (
                        <div className="grid gap-3 rounded-md border p-4">
                            <div>
                                <Label>Secondary Marketing Platform</Label>
                                <ul className="mt-2 grid gap-1">
                                    {data?.secondaryMarketingPlatform?.length >
                                    0 ? (
                                        data?.secondaryMarketingPlatform?.map(
                                            (market: nameAndId, i: number) => (
                                                <li
                                                    className="flex items-center text-sm text-muted-foreground"
                                                    key={i}
                                                >
                                                    <Dot />
                                                    <span>
                                                        {market?.name || "N/A"}
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
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MarketingPlatformCard;
