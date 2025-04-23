import { formatNumberWithCommas } from "../../../features/utils/helpers";
import NoDataText from "../../no-data/NoDataText";
import { TableHeaderWrapper } from "../../table/table-header-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TableCell, TableRow } from "../../ui/table";

type Props = {
  data: any;
};

function ViewershipReach({ data }: Props) {
  const viewershipReachHeaders: { header: string; className?: string }[] = [
    { header: "Name" },
    { header: "Year" },
    { header: "Viewership" },
    { header: "Reach" }
  ];

  const broadcastPartners = data?.broadcastPartnerMetrics;
  const ottPartners = data?.ottPartnerMetrics;

  return (
    <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">Viewership & Reach</CardTitle>
        </div>
      </CardHeader>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle className="text-lg font-normal">Broadcast Partner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Card x-chunk="dashboard-07-chunk-0 bg-white">
            <TableHeaderWrapper headersArray={viewershipReachHeaders}>
              {broadcastPartners?.length ? (
                broadcastPartners
                  ?.sort((a: any, b: any) => Number(b?.year) - Number(a?.year))
                  ?.map((broadcastPartner: any, index: number) => (
                    <TableRow key={index} className="text-muted-foreground">
                      <TableCell>{broadcastPartner?.broadcastPartner?.name || "N/A"}</TableCell>
                      <TableCell>{broadcastPartner?.year || "N/A"}</TableCell>
                      <TableCell>{formatNumberWithCommas(broadcastPartner?.viewership) || "N/A"}</TableCell>
                      <TableCell>{formatNumberWithCommas(broadcastPartner?.reach) || "N/A"}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={4}>
                    <span className="text-muted-foreground">No broadcast partner data found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableHeaderWrapper>
          </Card>
        </CardContent>
        <CardHeader>
          <CardTitle className="text-lg font-normal">OTT Partner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Card x-chunk="dashboard-07-chunk-0">
            <TableHeaderWrapper headersArray={viewershipReachHeaders}>
              {ottPartners?.length ? (
                ottPartners
                  ?.sort((a: any, b: any) => Number(b?.year) - Number(a?.year))
                  ?.map((ottPartner: any, index: number) => (
                    <TableRow key={index} className="text-muted-foreground">
                      <TableCell>{ottPartner?.ottPartner.name || "N/A"}</TableCell>
                      <TableCell>{ottPartner?.year || "N/A"}</TableCell>
                      <TableCell>{formatNumberWithCommas(ottPartner?.viewership) || "N/A"}</TableCell>
                      <TableCell>{formatNumberWithCommas(ottPartner?.reach) || "N/A"}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={4}>
                    <span className="text-muted-foreground">No ott partner data found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableHeaderWrapper>
          </Card>
        </CardContent>
      </Card>
    </Card>
  );
}

export default ViewershipReach;
