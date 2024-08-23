import { Dot } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { nameAndId } from "../../../types/metadata/Metadata";
import { printLogs } from "../../../lib/logs";

type Props = {
    data: any;
};

function Activation({ data }: Props) {
    printLogs("Marketing data:", data?.activations);
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            {data?.activations?.map((activationData: any, i: number) => (

                <>
                    <CardHeader>
                        <CardTitle>{i + 1} .Activation Summary </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className=" m-3">
                            <ul className="grid gap-3">
                                <li className="flex items-center ">
                                    <span className="w-1/2">Name</span>
                                    <span className="text-muted-foreground">
                                        {activationData?.name || '-'}
                                    </span>
                                </li>
                                <li className="flex items-center ">
                                    <span className="w-1/2">Brand Name</span>
                                    <span className="text-muted-foreground">
                                        {activationData?.brandName?.name || '-'}
                                    </span>
                                </li>
                                {activationData?.athleteName?.name ?
                                    <li className="flex items-center ">
                                        <span className="w-1/2">Athlete Name</span>
                                        <span className="text-muted-foreground">
                                            {activationData?.athleteName?.name || '-'}
                                        </span>
                                    </li>
                                    : null}
                                {activationData?.leagueName?.name ?
                                    <li className="flex items-center ">
                                        <span className="w-1/2">League Name</span>
                                        <span className="text-muted-foreground">
                                            {activationData?.leagueName?.name || '-'}
                                        </span>
                                    </li>
                                    : null}
                                {activationData?.teamName?.name ?
                                    <li className="flex items-center ">
                                        <span className="w-1/2">Team Name</span>
                                        <span className="text-muted-foreground">
                                            {activationData?.teamName?.name || '-'}
                                        </span>
                                    </li>
                                    : null}

                                <li className="flex items-center ">
                                    <span className="w-1/2"> Activation Year</span>
                                    <span className="text-muted-foreground">
                                        {activationData?.year || '-'}
                                    </span>
                                </li>

                            </ul>
                        </div>

                        <div className="grid gap-6">

                            <div className="grid grid-cols-3 gap-3">
                                <div className="grid gap-3 rounded-md border p-4">
                                    <Label>Assets</Label>
                                    <ul className="grid gap-3">
                                        {activationData?.asset?.map(
                                            (asset: nameAndId, i: number) => (
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <Dot />
                                                    <span>{asset?.name || "-"}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <div className="grid gap-3 rounded-md border p-4">
                                    <Label>Market</Label>
                                    <ul className="grid gap-3">
                                        {activationData?.market?.map(
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
                                    <Label>Type</Label>
                                    <ul className="grid gap-3">
                                        {activationData?.type?.map(
                                            (type: nameAndId, i: number) => (
                                                <li className="flex items-center text-sm text-muted-foreground">
                                                    <Dot />
                                                    <span>{type?.name || "-"}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </>
            ))}

        </Card>
    );
}

export default Activation;