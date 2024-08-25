import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import { Dot } from 'lucide-react';
import { TableHeaderWrapper } from '../../table/table-header-wrapper';
import { TableCell, TableRow } from '../../ui/table';
import { formatNumberWithCommas } from '../../../features/utils/helpers';

type Props = {
    data: any;
}

function ViewershipReach({ data }: Props) {
    const viewershipReachHeaders: { header: string; className?: string }[] = [
        { header: "Year" },
        { header: "Viewership" },
        // { header: "Reach" },
    ];

    const broadcast = data?.viewershipMetrics?.filter((d: any) => d?.viewershipType === "BROADCAST");
    const ott = data?.viewershipMetrics?.filter((d: any) => d?.viewershipType === "OTT");

    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader className='pb-1'>
                <CardTitle>Broadcast Partner</CardTitle>
            </CardHeader>
            <CardContent>
                <TableHeaderWrapper headersArray={viewershipReachHeaders}>
                    {broadcast?.map((d: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{d?.year || "-"}</TableCell>
                            <TableCell>
                                {d?.viewership || "-"}
                            </TableCell>
                            {/* <TableCell>
                            {d?.reach || "-"}
                        </TableCell> */}
                        </TableRow>
                    ))}

                </TableHeaderWrapper>
            </CardContent>
            <CardHeader className='py-1'>
                <CardTitle>OTT Partner</CardTitle>
            </CardHeader>
            <CardContent>
                <TableHeaderWrapper headersArray={viewershipReachHeaders}>
                    {ott?.map((d: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{d?.year || "-"}</TableCell>
                            <TableCell>
                                {d?.viewership || "-"}
                            </TableCell>
                            {/* <TableCell>
                                {d?.reach || "-"}
                            </TableCell> */}
                        </TableRow>
                    ))}

                </TableHeaderWrapper>
            </CardContent>
        </Card>
    )
}

export default ViewershipReach;