import { formatNumberWithCommas } from "../../../features/utils/helpers";
import { TableHeaderWrapper } from "../../table/table-header-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TableCell, TableRow } from "../../ui/table";

type Props = {
    data: any;
};

function Association({ data }: Props) {
    const associationHeaders: { header: string; className?: string }[] = [
        { header: "Association Level" },
        { header: "Cost Of Association" }
    ];

    return (
        <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Cost Of Association
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="overflow-hidden"
                >
                    <TableHeaderWrapper headersArray={associationHeaders}>
                        {data?.association?.length ? (
                            data?.association?.map((d: any, i: number) => (
                                <TableRow
                                    key={i}
                                    className="text-muted-foreground"
                                >
                                    <TableCell>
                                        {d?.associationLevel?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        ₹{" "}
                                        {d?.costOfAssociation > 0
                                            ? formatNumberWithCommas(
                                                  d?.costOfAssociation
                                              )
                                            : "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="text-center" colSpan={4}>
                                    <span className="text-muted-foreground">
                                        No cost of association data found
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableHeaderWrapper>
                </Card>
            </CardContent>
        </Card>
    );
}

export default Association;
