import {
    Diamond,
    MoveHorizontal,
    PersonStanding,
    SquareStack,
    Unlink2
} from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import NoDataText from "../../no-data/NoDataText";
import { nameAndId } from "../../../types/metadata/Metadata";
import { TEditLeagueFormSchema } from "../../../features/league/constants.ts/metadata";

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
                <>
                    <ul className="grid gap-3">
                        {data?.owners?.map((owner: nameAndId, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="text-muted-foreground">
                                    <Diamond className="h-4 w-4" />
                                </span>
                                <span>{owner?.name}</span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    );
}

export default Owners;
