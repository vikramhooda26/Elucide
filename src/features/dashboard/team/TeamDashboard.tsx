import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Overview } from "../components/overview";
import TeamRecentList from "./component/TeamRecentList";

function TeamDashboard() {

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Teams
                        </CardTitle>
                        <Users />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">122</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                    </CardContent>
                </Card>

            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <TeamRecentList />
            </div>
        </div >
    );
}

export default TeamDashboard;