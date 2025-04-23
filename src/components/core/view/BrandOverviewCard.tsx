import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import Owners from "./Owners";

type TOverviewCardProps = {
  data: any;
};

const BrandOverviewCard = ({ data }: TOverviewCardProps) => {
  return (
    <Card x-chunk="dashboard-07-chunk-" className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">Overview</CardTitle>
        </div>
      </CardHeader>
      <div className="text-sm">
        <ul className="grid gap-3 p-6">
          <li className="flex">
            <span className="w-1/2">Name</span>
            <span className="text-muted-foreground">{data?.name || "N/A"}</span>
          </li>
          <li className="flex">
            <span className="w-1/2">Parent Organization</span>
            <span className="text-muted-foreground">{data?.parentOrg?.name || "N/A"}</span>
          </li>

          <li className="flex items-center">
            <span className="w-1/2">Agency</span>
            <span className="text-muted-foreground">{data?.agency?.name || "N/A"}</span>
          </li>
          <li className="flex items-center">
            <span className="w-1/2">City</span>
            <span className="text-muted-foreground">{data?.city?.name || "N/A"}</span>
          </li>
          <li className="flex items-center">
            <span className="w-1/2">State</span>
            <span className="text-muted-foreground">{data?.state?.name || "N/A"}</span>
          </li>
        </ul>
        <Separator />
      </div>
    </Card>
  );
};

export default BrandOverviewCard;
