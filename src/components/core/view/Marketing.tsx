import { Dot } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { nameAndId } from "../../../types/metadata/Metadata";
import { printLogs } from "../../../lib/logs";

type Props = {
    data: any;
};

function Marketing({ data }: Props) {
    printLogs("Marketing data:", data);
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle>Marketing</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Primary Marketing Platform</Label>
                            <ul className="grid gap-3">
                                {data?.primaryMarketingPlatform?.length > 0 ? (
                                    data?.primaryMarketingPlatform?.map(
                                        (market: any, i: number) => (
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <Dot />
                                                <span>
                                                    {market?.name || "-"}
                                                </span>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <NoDataText />
                                )}
                            </ul>
                        </div>

                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Secondary Marketing Platform</Label>
                            <ul className="grid gap-3">
                                {data?.secondaryMarketingPlatform?.length >
                                0 ? (
                                    data?.secondaryMarketingPlatform?.map(
                                        (market: nameAndId, i: number) => (
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <Dot />
                                                <span>
                                                    {market?.name || "-"}
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
                    <div className="grid grid-cols-3 gap-3">
                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Primary key Market</Label>
                            <ul className="grid gap-3">
                                {data?.primaryKeyMarket?.map(
                                    (market: nameAndId, i: number) => (
                                        <li className="flex items-center text-sm text-muted-foreground">
                                            <Dot />
                                            <span>{market?.name || "-"}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Secondary key Market</Label>
                            <ul className="grid gap-3">
                                {data?.secondaryKeyMarket?.map(
                                    (market: nameAndId, i: number) => (
                                        <li className="flex items-center text-sm text-muted-foreground">
                                            <Dot />
                                            <span>{market?.name || "-"}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Tertiary Market</Label>
                            <ul className="grid gap-3">
                                {data?.tertiary?.map(
                                    (market: nameAndId, i: number) => (
                                        <li className="flex items-center text-sm text-muted-foreground">
                                            <Dot />
                                            <span>{market?.name || "-"}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Marketing;
