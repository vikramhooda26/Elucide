import { Activity } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { nameAndId } from "../../../types/metadata/Metadata";

type Props = {
    data: any;
};
function Endorsements({ data }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Endorsements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <ul className="grid gap-3">
                    {data?.endorsements?.length > 0 ? (
                        data?.endorsements?.map(
                            (endorsement: nameAndId, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        <Activity className="h-4 w-4" />
                                    </span>
                                    <span>{endorsement?.name}</span>
                                </li>
                            )
                        )
                    ) : (
                        <NoDataText />
                    )}
                </ul>
            </CardContent>
        </Card>
    );
}

export default Endorsements;
