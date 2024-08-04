import { Activity } from 'lucide-react';
import NoDataText from '../../no-data/NoDataText';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

type Props = {
    data: any;
}
function Endorsements({ data }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Endorsements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <ul className="grid gap-3">
                    {data?.endorsements?.length > 0 ? data?.endorsements?.map((tag: string, i: number) => (
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

export default Endorsements;