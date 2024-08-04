import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import { Dot } from 'lucide-react';

type Props = {
    data: any;
}
function Association({ data }: Props) {
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle>Association</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6  ">
                    <div className="grid gap-3 grid-cols-2">
                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Association Level
                            </Label>
                            <ul className="grid gap-3">
                                {data?.primaryMarketingPlatforms?.map((market: string, i: number) => (
                                    <li className="flex items-center text-sm text-muted-foreground">
                                        <Dot />
                                        <span>{market || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Association Cost
                            </Label>
                            <ul className="grid gap-3">
                                {data?.secondaryMarketingPlatforms?.map((market: string, i: number) => (
                                    <li className="flex items-center text-sm text-muted-foreground">
                                        <Dot />
                                        <span>{market || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default Association;