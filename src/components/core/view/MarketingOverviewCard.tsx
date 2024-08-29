import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import ActiveCampaign from "./ActiveCampaign";
import Endorsements from "./Endorsements";
import MarketingPlatformCard from "./MarketingPlatformCard";
import StrategyOverview from "./StrategyOverview";
import TagLines from "./TagLines";

type TMarketingOverviewCardProps = {
    data: any;
};

const MarketingOverviewCard = ({ data }: TMarketingOverviewCardProps) => {
    return (
        <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Marketing Overview
                    </CardTitle>
                </div>
            </CardHeader>
            <StrategyOverview strategy={data?.strategyOverview} />
            <Separator />
            <TagLines data={data} />
            <Separator />
            <Endorsements data={data} />
            <Separator />
            <ActiveCampaign data={data} />
            <Separator />
            <MarketingPlatformCard data={data} />
        </Card>
    );
};

export default MarketingOverviewCard;
