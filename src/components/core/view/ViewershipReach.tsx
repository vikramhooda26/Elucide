import { formatNumberWithCommas } from "../../../features/utils/helpers";
import { TableHeaderWrapper } from "../../table/table-header-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TableCell, TableRow } from "../../ui/table";

type Props = {
    data: any;
};

function ViewershipReach({ data }: Props) {
    const viewershipReachHeaders: { header: string; className?: string }[] = [
        { header: "name" },
        { header: "Year" },
        { header: "Viewership" },
        { header: "Reach" }
    ];

    const broadcastPartners = data?.broadcastPartnerMetrics;
    const ottPartners = data?.ottPartnerMetrics;

    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader className="pb-1">
                <CardTitle>Broadcast Partner</CardTitle>
            </CardHeader>
            <CardContent>
                <TableHeaderWrapper headersArray={viewershipReachHeaders}>
                    {broadcastPartners?.map(
                        (broadcastPartner: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {broadcastPartner?.broadcastPartner?.name ||
                                        "N/A"}
                                </TableCell>
                                <TableCell>
                                    {broadcastPartner?.year || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {formatNumberWithCommas(
                                        broadcastPartner?.viewership
                                    ) || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {formatNumberWithCommas(
                                        broadcastPartner?.reach
                                    ) || "N/A"}
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableHeaderWrapper>
            </CardContent>
            <CardHeader className="py-1">
                <CardTitle>OTT Partner</CardTitle>
            </CardHeader>
            <CardContent>
                <TableHeaderWrapper headersArray={viewershipReachHeaders}>
                    {ottPartners?.map((ottPartner: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                {ottPartner?.ottPartner.name || "N/A"}
                            </TableCell>
                            <TableCell>{ottPartner?.year || "N/A"}</TableCell>
                            <TableCell>
                                {formatNumberWithCommas(
                                    ottPartner?.viewership
                                ) || "N/A"}
                            </TableCell>
                            <TableCell>
                                {formatNumberWithCommas(ottPartner?.reach) ||
                                    "N/A"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableHeaderWrapper>
            </CardContent>
        </Card>
    );
}

export default ViewershipReach;
