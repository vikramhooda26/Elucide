import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import NoDataText from "../../no-data/NoDataText";
import { contactPersons } from "../../../types/metadata/Metadata";

type Props = {
    data: any;
};
function ContactPerson({ data }: Props) {
    return (
        <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Contact Details
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {data?.contactPersons?.length > 0 ? (
                    data?.contactPersons?.map(
                        (person: contactPersons, i: number) => (
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>
                                        <User />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid">
                                    <p className="mb-1 text-base font-medium leading-none">
                                        {person?.contactName || ""}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {person?.contactDesignation || ""}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {person?.contactEmail || ""}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {person?.contactLinkedin || ""}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {person?.contactNumber || ""}
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <NoDataText />
                )}
            </CardContent>
        </Card>
    );
}

export default ContactPerson;
