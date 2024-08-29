import { Diamond } from "lucide-react";
import { nameAndId } from "../../../types/metadata/Metadata";
import NoDataText from "../../no-data/NoDataText";

const targetAudience = ["Team", "League", "Brand", "Athlete"];
const league = ["Team"];
const city = ["Team", "Brand", "Athlete"];
const sports = ["Team", "League", "Athlete"];

type Props = {
    data: any;
    title: string;
};

function Owners({ data, title = "" }: Props) {
    return (
        <div>
            {data?.owners?.length > 0 ? (
                <ul className="flex flex-wrap items-center gap-3">
                    {data?.owners?.map((owner: nameAndId, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                                <Diamond className="size-4" />
                            </span>
                            <span>{owner?.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <NoDataText />
            )}
        </div>
    );
}

export default Owners;
