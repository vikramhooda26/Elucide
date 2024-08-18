import { Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Overview } from "../components/overview";
import AthleteRecentList from "./component/AthleteRecentList";

function AthleteDashboard() {


    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Athletes
                        </CardTitle>
                        <Dumbbell />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
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
                <AthleteRecentList />
            </div>
        </div>
    );
}

export default AthleteDashboard;