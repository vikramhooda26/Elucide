import { Card, CardHeader, CardTitle } from "../../ui/card";

type TAthleteOverviewCardProps = {
    athlete: any;
};

const AthleteOverviewCard = ({ athlete }: TAthleteOverviewCardProps) => {
    return (
        <Card x-chunk="dashboard-07-chunk-" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">Overview</CardTitle>
                </div>
            </CardHeader>
            <div className="text-sm">
                <ul className="grid gap-3 p-6">
                    <li className="flex items-center">
                        <span className="w-1/2">Name</span>
                        <span className="text-muted-foreground">{athlete?.name || "N/A"}</span>
                    </li>
                    <li className="flex">
                        <span className="w-1/2">Sport</span>
                        <span className="text-muted-foreground">{athlete?.sport?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Nationality</span>
                        <span className="text-muted-foreground">{athlete?.nationality?.name || "N/A"}</span>
                    </li>
                    <li className="flex">
                        <span className="w-1/2">State</span>
                        <span className="text-muted-foreground">{athlete?.state?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Agency</span>
                        <span className="text-muted-foreground">{athlete?.agency?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Status</span>
                        <span className="text-muted-foreground">{athlete?.status?.name || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">DOB</span>
                        <span className="text-muted-foreground">{athlete?.dob || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Age</span>
                        <span className="text-muted-foreground">{athlete?.athleteAge || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-1/2">Gender</span>
                        <span className="text-muted-foreground">{athlete?.athleteGender?.name || "N/A"}</span>
                    </li>
                </ul>
            </div>
        </Card>
    );
};

export default AthleteOverviewCard;
