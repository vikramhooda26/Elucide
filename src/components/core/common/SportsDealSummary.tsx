import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { NoActionTable } from '../../table/NoActionTable'
import NoDataText from '../../no-data/NoDataText'

type Props = {
    data: any
}
function SportsDealSummary({ data }: Props) {
    const sportsDealColumn = [
        {
            key: 'level',
            name: 'Level',
        },
        {
            key: 'type',
            name: 'Type',
        },
        {
            key: 'annualValue',
            name: 'Annual Value',
        },
        {
            key: 'totalValue',
            name: 'Total Value',
        },
        {
            key: 'commencementDate',
            name: 'Commencement',
        },
        {
            key: 'expirationDate',
            name: 'Expiration',
        },
        {
            key: 'partner',
            name: 'Partner',
        },

    ];
    return (
        <Card x-chunk="dashboard-06-chunk-0" >
            <CardHeader>
                <CardTitle>Sports Deal Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {data?.sportsDealSummary?.length > 0 ?
                    <NoActionTable data={data?.sportsDealSummary} columns={sportsDealColumn} searchableKey={'level'} />
                    :
                    <NoDataText />
                }
            </CardContent>

        </Card>
    )
}

export default SportsDealSummary