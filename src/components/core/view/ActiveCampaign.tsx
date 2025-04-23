import { Activity } from "lucide-react";
import { nameAndId } from "../../../types/metadata/Metadata";
import NoDataText from "../../no-data/NoDataText";

type Props = {
  data: any;
};

function ActiveCampaign({ data }: Props) {
  if (data?.activeCampaigns)
    return (
      <div className="p-6 text-sm">
        <ul className="flex flex-col gap-3">
          <li className="text-lg">
            <span>Active Campaigns</span>
          </li>
          <ul className="grid gap-3">
            {data?.activeCampaigns?.length > 0 ? (
              data?.activeCampaigns?.map((campaign: nameAndId, i: number) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span>
                    <Activity className="h-4 w-4" />
                  </span>
                  <span>{campaign?.name || "N/A"}</span>
                </li>
              ))
            ) : (
              <NoDataText />
            )}
          </ul>
        </ul>
      </div>
    );
}

export default ActiveCampaign;
