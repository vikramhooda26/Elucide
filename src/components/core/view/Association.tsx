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
function Association({ data }: Props) {
    const associationHeaders: { header: string; className?: string }[] = [
        { header: "Association Level" },
        { header: "Cost Of Association (in cr)" },
    ];

    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle>Association</CardTitle>
            </CardHeader>
            <CardContent>
                <TableHeaderWrapper headersArray={associationHeaders}>
                    {data?.association?.map((d: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{d?.associationLevel?.name || "-"}</TableCell>
                            <TableCell>
                                {d?.costOfAssociation > 0 ? formatNumberWithCommas(d?.costOfAssociation) : "-"}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableHeaderWrapper>
            </CardContent>
        </Card>
    )
}

export default Association;