import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import NoDataText from '../../no-data/NoDataText';
import { contactPersons } from '../../../types/metadata/Metadata';

type Props = {
    data: any;
}
function ContactPerson({ data }: Props) {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Contact Persons</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {data?.contactPersons?.length > 0 ? data?.contactPersons?.map((person: contactPersons, i: number) => (
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid ">
                            <p className="text-base mb-1 font-medium leading-none">
                                {person?.contactName || ""}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {person?.contactDesignation || ""}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {person?.contactEmail || ''}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {person?.contactLinkedin || ""}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">{person?.contactNumber || ''}</div>
                    </div>
                ))
                    : <NoDataText />
                }

            </CardContent>
        </Card>
    )
}

export default ContactPerson;