import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import { Activity, Dot } from 'lucide-react';
import NoDataText from '../../no-data/NoDataText';

type Props = {
    data: any;
}
function TagLines({ data }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Tag Lines</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <ul className="grid gap-3">
                    {data?.taglines?.length > 0 ? data?.taglines?.map((tag: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                                <Activity className="w-4 h-4" />
                            </span>
                            <span>{tag}</span>
                        </li>
                    ))
                        : <NoDataText />
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default TagLines;