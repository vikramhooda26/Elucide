import { Building, Dumbbell, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import AthleteRecentList from '../athlete/component/AthleteRecentList';
import BrandRecentList from '../brand/component/BrandRecentList';
import LeagueRecentList from '../league/component/LeagueRecentList';
import TeamRecentList from '../team/component/TeamRecentList';
import BrandDashboard from '../brand/BrandDashboard';
import LeagueDashboard from '../league/LeagueDashboard';
import TeamDashboard from '../team/TeamDashboard';
import AthleteDashboard from '../athlete/AthleteDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

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
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Brand
                        </CardTitle>
                        <Building />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">450</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total League
                        </CardTitle>
                        <Trophy />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">350</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Team</CardTitle>
                        <Users />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">122</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Athlete
                        </CardTitle>
                        <Dumbbell />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p> */}
                    </CardContent>
                </Card>
            </div>
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
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <BrandRecentList />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <LeagueRecentList />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <TeamRecentList />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <AthleteRecentList />
            </div> */}
        </div>
    )
}

export default OverView;