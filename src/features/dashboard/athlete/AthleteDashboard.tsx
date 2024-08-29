import { Dumbbell } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "../../../components/ui/card";
import { Overview } from "../components/overview";
import AthleteRecentList from "./component/AthleteRecentList";

function AthleteDashboard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
                {/* </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8"> */}
                <AthleteRecentList />
            </div>
        </>
    );
}

export default AthleteDashboard;
