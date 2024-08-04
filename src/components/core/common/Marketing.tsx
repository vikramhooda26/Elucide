import { Dot } from 'lucide-react';
import NoDataText from '../../no-data/NoDataText';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';

type Props = {
    data: any;
}

function Marketing({ data }: Props) {
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle>Marketing</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6  ">
                    <div className="grid gap-3 grid-cols-2">
                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Primary Marketing Platform
                            </Label>
                            <ul className="grid gap-3">
                                {data?.primaryMarketingPlatforms?.length > 0 ?
                                    data?.primaryMarketingPlatforms?.map((market: string, i: number) => (
                                        <li className="flex items-center text-sm text-muted-foreground">
                                            <Dot />
                                            <span>{market || '-'}</span>
                                        </li>
                                    ))
                                    : <NoDataText />
                                }
                            </ul>
                        </div>

                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Secondary Marketing Platform
                            </Label>
                            <ul className="grid gap-3">
                                {data?.secondaryMarketingPlatforms?.length > 0  
                                    ? data?.secondaryMarketingPlatforms?.map((market: string, i: number) => (
                                        <li className="flex items-center text-sm text-muted-foreground">
                                            <Dot />
                                            <span>{market || '-'}</span>
                                        </li>
                                    ))
                                    : <NoDataText />
                                }
                            </ul>
                        </div>

                    </div>
                    <div className="grid gap-3 grid-cols-3">
                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Primary key Market
                            </Label>
                            <ul className="grid gap-3">
                                {data?.keyMarketPrimary?.map((market: string, i: number) => (
                                    <li className="flex items-center text-sm text-muted-foreground">
                                        <Dot />
                                        <span>{market || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Secondary key Market
                            </Label>
                            <ul className="grid gap-3">
                                {data?.keyMarketSecondary?.map((market: string, i: number) => (
                                    <li className="flex items-center text-sm text-muted-foreground">
                                        <Dot />
                                        <span>{market || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-3 border rounded-md p-4">
                            <Label>
                                Tertiary Market
                            </Label>
                            <ul className="grid gap-3">
                                {data?.keyMarketTertiary?.map((market: string, i: number) => (
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

export default Marketing