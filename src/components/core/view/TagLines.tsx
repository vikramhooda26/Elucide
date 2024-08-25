import { Activity } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { nameAndId } from "../../../types/metadata/Metadata";

type Props = {
    data: any;
};
function TagLines({ data }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Taglines</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <ul className="grid gap-3">
                    {data?.taglines?.length > 0 ? (
                        data?.taglines?.map((tag: nameAndId, i: number) => (
                            <li
                                key={i}
                                className="flex items-center gap-2"
                            >
                                <span className="text-muted-foreground">
                                    <Activity className="w-4 h-4" />
                                </span>
                                <span>{tag?.name}</span>
                            </li>
                        ))
                    ) : (
                        <NoDataText />
                    )}
                </ul>
            </CardContent>
        </Card>
    );
}

export default TagLines;
