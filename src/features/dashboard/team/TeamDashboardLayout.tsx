import { Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import useNavigator from "../../../hooks/useNavigator";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { CalendarDateRangePicker } from "../components/date-range-picker";
import TeamDashboard from "./TeamDashboard";

function TeamDashboardLayout() {

    const navigator = useNavigator();

    const onViewList = () => {
        navigator(NAVIGATION_ROUTES.TEAM_LIST)
    }

    return (
        <div className=" flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Team Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button onClick={onViewList}>View List</Button>
                    </div>
                </div>

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
                    <TeamDashboard />
                </div>
            </div>
        </div>
    );
}

export default TeamDashboardLayout;