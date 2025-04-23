import { Activity } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";

type Props = {
  data: any;
};

function Endorsements({ data }: Props) {
  if (data?.endorsements)
    return (
      <div className="p-6 text-sm">
        <ul className="flex flex-col gap-3">
          <li className="text-lg">
            <span>Endorsements</span>
          </li>
          <ul className="grid gap-3">
            {data?.endorsements?.length > 0 ? (
              data?.endorsements?.map((endorsement: any, i: number) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span>
                    <Activity className="h-4 w-4" />
                  </span>
                  <span>{endorsement?.name || "N/A"} -</span>
                  <span className={endorsement?.active ? "text-green-500" : "text-red-500"}>
                    {endorsement?.active ? "Active" : "Inactive"}
                  </span>
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

export default Endorsements;
