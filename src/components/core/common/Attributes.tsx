import {
    Diamond,
    MoveHorizontal,
    PersonStanding,
    SquareStack,
    Unlink2,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import NoDataText from "../../no-data/NoDataText";

const targetAudience = ["Team"];
const league = ["Team", "Athlete"];

type Props = {
    data: any;
    title: string;
};

function Attributes({ data, title = "" }: Props) {
    return (
        <div>
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {title || ""} Attributes
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Sports
                                </span>
                                <span>{data?.sport || "-"}</span>
                            </li>
                            {league?.some((l) => l === title) ? (
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        League
                                    </span>
                                    <span>{data?.league || "-"}</span>
                                </li>
                            ) : null}
                        </ul>
                        {data?.owners?.length > 0 ? (
                            <>
                                <Separator className="my-2" />
                                <div className="font-semibold">Team Owners</div>
                                <ul className="grid gap-3">
                                    {data?.owners?.map(
                                        (owner: string, i: number) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-muted-foreground">
                                                    <Diamond className="w-4 h-4" />
                                                </span>
                                                <span>{owner}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </>
                        ) : null}
                        <Separator className="my-2" />
                        <div className="font-semibold">NCCS</div>
                        <ul className="grid gap-3">
                            {data?.nccs?.length > 0 ? (
                                data?.nccs?.map((nccs: string, i: number) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-muted-foreground">
                                            <Unlink2 className="w-4 h-4" />
                                        </span>
                                        <span>{nccs}</span>
                                    </li>
                                ))
                            ) : (
                                <NoDataText />
                            )}
                        </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="font-semibold">Personality Traits</div>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="grid gap-3">
                            <div className="font-semibold">Main Traits</div>
                        </div>
                        <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Sub Traits</div>
                        </div>

                        {data?.personalityTraits?.length ? (
                            data?.personalityTraits?.map(
                                (trait: any, i: number) => (
                                    <>
                                        <div
                                            key={i}
                                            className="grid gap-3"
                                        >
                                            <div className="text-muted-foreground">
                                                {trait?.mainPersonalityTrait}
                                            </div>
                                        </div>
                                        <div
                                            key={i + 100}
                                            className="grid auto-rows-max gap-3"
                                        >
                                            <div className="text-muted-foreground">
                                                {trait?.subPersonalityTraits}
                                            </div>
                                        </div>
                                    </>
                                )
                            )
                        ) : (
                            <NoDataText />
                        )}
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">City</dt>
                                <dd>{data?.hqCity || "-"}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">State</dt>
                                <dd>{data?.hqState || "-"}</dd>
                            </div>
                        </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Tiers</div>
                        <dl className="grid gap-3">
                            {data?.tiers?.length > 0 ? (
                                data?.tiers?.map((tier: string, i: number) => (
                                    <>
                                        {tier ? (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <dt className="">
                                                    <SquareStack className="h-4 w-4" />
                                                </dt>
                                                <dd>{tier || "-"}</dd>
                                            </div>
                                        ) : null}
                                    </>
                                ))
                            ) : (
                                <NoDataText />
                            )}
                        </dl>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        Updated{" "}
                        <time dateTime="2023-11-23">August 1, 2024</time>
                    </div>
                </CardFooter>
            </Card>
            {targetAudience?.some((formName) => formName === title) ? (
                <Card className="overflow-hidden my-4">
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
                                                (age: string, i: number) => (
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
                                                                    {age || "-"}
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
                                            <dd>{data?.age || "-"}</dd>
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
                                            (gender: string, i: number) => (
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
                                                                {gender || "-"}
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
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : null}
        </div>
    );
}

export default Attributes;
