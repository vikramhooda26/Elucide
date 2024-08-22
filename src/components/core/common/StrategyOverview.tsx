import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

type Props = {
    strategy: string | undefined;
};
function StrategyOverview({ strategy }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Strategy Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <span className="text-muted-foreground">{strategy || "-"}</span>
            </CardContent>
        </Card>
    );
}

export default StrategyOverview;
