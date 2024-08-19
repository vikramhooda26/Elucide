import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import ListCard from './ListCard';

type Props = {
    title: string;
    list: Array<any>;
    operation: string;
    nameKey: string;
    dateKey: string;
    operationKey: string;
}

function RecentList({ title, list, operation, nameKey, dateKey, operationKey }: Props) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recently <span className='ms-1'>{title || ''}</span></CardTitle>
                <CardDescription>
                    List of recently added<span className='ms-1'>{title?.toLowerCase() || ''}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ListCard list={list} operation={operation} nameKey={nameKey} dateKey={dateKey} operationKey={operationKey} />
            </CardContent>
        </Card>
    )
}

export default RecentList;