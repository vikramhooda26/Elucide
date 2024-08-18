import { Button } from "../../../components/ui/button";
import useNavigator from "../../../hooks/useNavigator";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { CalendarDateRangePicker } from "../components/date-range-picker";
import AthleteDashboard from "./AthleteDashboard";

function AthleteDashboardLayout() {

    const navigator = useNavigator();

    const onViewList = () => {
        navigator(NAVIGATION_ROUTES.ATHLETE_LIST)
    }

    return (
        <div className=" flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Athlete Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button onClick={onViewList}>View List</Button>
                    </div>
                </div>
                <AthleteDashboard />
            </div>
        </div>
    );
}

export default AthleteDashboardLayout;