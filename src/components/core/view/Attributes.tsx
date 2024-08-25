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
import { format } from "date-fns";

const targetAudience = ["Team", "League", "Brand", "Athlete"];
const league = ["Team",];
const city = ["Team", "Brand", "Athlete"];
const sports = ["Team", "League", "Athlete"];

type Props = {
    data: any;
    title: string;
};

function Attributes({ data, title = "" }: Props) {
    return (
        <div>

            {targetAudience?.some((formName) => formName === title) ? (
                <Card className=" overflow-hidden">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Target Audience
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="grid gap-3">
                                <div className="font-semibold">Age</div>
                                <dl className="grid gap-3">
                                    {typeof data?.age === "object" ? (
                                        data?.age?.length ? (
                                            data?.age?.map(
                                                (age: nameAndId, i: number) => (
                                                    <>
                                                        {age ? (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <dt className="">
                                                                    <MoveHorizontal className="h-4 w-4" />
                                                                </dt>
                                                                <dd>
                                                                    {age?.name ||
                                                                        "-"}
                                                                </dd>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <NoDataText />
                                        )
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <dt className="">
                                                <MoveHorizontal className="h-4 w-4" />
                                            </dt>
                                            <dd>{data?.age?.name || "-"}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Gender</div>
                                <dl className="grid gap-3">
                                    {data?.gender?.length ? (
                                        data?.gender?.map(
                                            (gender: nameAndId, i: number) => (
                                                <>
                                                    {gender ? (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <dt className="">
                                                                <PersonStanding className="h-4 w-4" />
                                                            </dt>
                                                            <dd>
                                                                {gender?.name ||
                                                                    "-"}
                                                            </dd>
                                                        </div>
                                                    ) : null}
                                                </>
                                            )
                                        )
                                    ) : (
                                        <NoDataText />
                                    )}
                                </dl>
                                <Separator className="my-4" />
                                <div className="font-semibold">NCCS</div>
                                <ul className="grid gap-3">
                                    {data?.nccs?.length > 0 ? (
                                        data?.nccs?.map(
                                            (nccs: nameAndId, i: number) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-muted-foreground">
                                                        <Unlink2 className="h-4 w-4" />
                                                    </span>
                                                    <span>{nccs?.name}</span>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <NoDataText />
                                    )}
                                </ul>

                                <Separator className="my-4" />
                                <div className="grid gap-3">
                                    <div className="font-semibold">Tiers</div>
                                    <dl className="grid gap-3">
                                        {data?.tiers?.length > 0 ? (
                                            data?.tiers?.map(
                                                (tier: nameAndId, i: number) => (
                                                    <>
                                                        {tier ? (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <dt className="">
                                                                    <SquareStack className="h-4 w-4" />
                                                                </dt>
                                                                <dd>{tier?.name || "-"}</dd>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <NoDataText />
                                        )}
                                    </dl>
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : null}

            <Card className="my-4 overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {title || ""} Attributes
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">

                    {league?.some((l) => l === title) ? (
                        <div className="grid gap-3">
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        League
                                    </span>
                                    <span>{data?.league?.name || "-"}</span>
                                </li>
                            </ul>
                            <Separator className="my-4" />
                        </div>
                    ) : null}

                    <div className="font-semibold">Personality Traits</div>
                    <div className="my-4 grid grid-cols-2 gap-2">
                        <div className="grid gap-3">
                            <div className="font-semibold text-xs">Main Traits</div>
                        </div>
                        <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold text-xs">Sub Traits</div>
                        </div>
                        <div className="grid gap-1">
                            {data?.mainPersonalityTraits?.length ? (
                                data?.mainPersonalityTraits?.map(
                                    (trait: any, i: number) => (
                                        <div key={i} className="grid gap-3">
                                            <div className="text-muted-foreground">
                                                {trait?.name}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <NoDataText />
                            )}
                        </div>
                        <div className="grid gap-1">
                            {data?.subPersonalityTraits?.length ? (
                                data?.subPersonalityTraits?.map(
                                    (trait: any, i: number) => (
                                        <div key={i} className="grid gap-3">
                                            <div className="text-muted-foreground">
                                                {trait?.name}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <NoDataText />
                            )}
                        </div>
                    </div>

                </CardContent>
            </Card>

            <Card className="my-4 overflow-hidden">
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Created On</div>
                        <ul className="grid gap-3">
                            {data?.createdDate ? data?.createdDate : '-'}
                        </ul>
                        <div className="font-semibold">Updated On</div>
                        <ul className="grid gap-3">
                            {data?.modifiedDate ? data?.modifiedDate : '-'}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Attributes;
