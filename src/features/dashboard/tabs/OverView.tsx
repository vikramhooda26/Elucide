import { Building, Dumbbell, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import AthleteDashboard from '../athlete/AthleteDashboard';
import BrandDashboard from '../brand/BrandDashboard';
import LeagueDashboard from '../league/LeagueDashboard';
import TeamDashboard from '../team/TeamDashboard';

function OverView() {

    const tabs = [
        {
            value: 'brand', name: 'Brands', component: <BrandDashboard />,
        },
        {
            value: 'league', name: 'Leagues', component: <LeagueDashboard />,
        },
        {
            value: 'team', name: 'Teams', component: <TeamDashboard />,
        },
        {
            value: 'athlete', name: 'Athletes', component: <AthleteDashboard />,
        },
    ];



    return (
        <Tabs defaultValue="brand" className="space-y-4">
            <TabsList>
                {tabs?.map((tab, i) => (
                    <TabsTrigger value={tab?.value} key={i}>{tab?.name}</TabsTrigger>
                ))}
            </TabsList>
            {tabs?.map((content) => (
                <TabsContent value={content?.value} className="space-y-4">
                    {content?.component}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default OverView;