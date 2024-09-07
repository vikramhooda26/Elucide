import { format } from "date-fns";
import {
    Dot,
    MoveHorizontal,
    PersonStanding,
    SquareStack,
    Unlink2
} from "lucide-react";
import { customRound } from "../../../features/utils/helpers";
import { nameAndId } from "../../../types/metadata/Metadata";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";

const targetAudience = ["Team", "League", "Brand", "Athlete"];
const league = ["Team"];
const city = ["Team", "Brand", "Athlete"];
const sports = ["Team", "League", "Athlete"];

type Props = {
    data: any;
    title: string;
};

interface Personality extends nameAndId {
    subPersonalityTraits: nameAndId[];
}

function AudienceProfile({ data, title = "" }: Props) {
    const totalSubpersonalityTraits = data?.mainPersonalityTraits?.reduce(
        (total: any, personality: any) => {
            return total + (personality.subPersonalityTraits?.length ?? 0);
        },
        0
    );

    const calculatePersonalityTraitPercentage = (
        subPersonalityTraitCount: number
    ) => {
        if (totalSubpersonalityTraits) {
            return customRound(
                (subPersonalityTraitCount / totalSubpersonalityTraits) * 100
            );
        }

        return 0;
    };

    let totalPercentage = 0;

    const calculatePercentages = (traits: any, isLastIndex: boolean) => {
        const count = traits.subPersonalityTraits?.length ?? 0;
        const percentage = calculatePersonalityTraitPercentage(count);

        if (isLastIndex) {
            return 100 - totalPercentage;
        }

        totalPercentage += percentage;
        return percentage;
    };

    const sortedAgeRange = data?.age
        ? Array.from(data?.age as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    const sortedNccsClass = data?.nccs
        ? Array.from(data?.nccs as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    const sortedTiers = data?.tiers
        ? Array.from(data?.tiers as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    const sortedPrimaryKeyMarket = data?.primaryKeyMarket
        ? Array.from(data?.primaryKeyMarket as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    const sortedSecondaryKeyMarket = data?.secondaryKeyMarket
        ? Array.from(data?.secondaryKeyMarket as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    const sortedTertiaryKeyMarket = data?.tertiary
        ? Array.from(data?.tertiary as any[]).sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
          )
        : null;

    console.log(sortedAgeRange);

    return (
        <div className="space-y-6">
            {targetAudience?.some((formName) => formName === title) ? (
                <Card className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Audience Profile
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle className="text-lg font-normal">
                                Target Audience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 text-sm">
                                <div className="grid gap-4 rounded-md border p-6">
                                    <Label>Age Range</Label>
                                    <dl className="grid gap-3">
                                        {typeof sortedAgeRange === "object" ? (
                                            sortedAgeRange?.length ? (
                                                sortedAgeRange?.map(
                                                    (
                                                        age: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <>
                                                            {age ? (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                                >
                                                                    <dt>
                                                                        <MoveHorizontal className="h-4 w-4" />
                                                                    </dt>
                                                                    <dd>
                                                                        {age?.name ||
                                                                            "N/A"}
                                                                    </dd>
                                                                </div>
                                                            ) : (
                                                                <NoDataText />
                                                            )}
                                                        </>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <dt className="">
                                                    <MoveHorizontal className="h-4 w-4" />
                                                </dt>
                                                <dd>
                                                    {data?.age?.name || "N/A"}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid gap-4 rounded-md border p-6">
                                        <Label>NCCS</Label>
                                        <ul className="grid gap-3">
                                            {sortedNccsClass?.length ? (
                                                sortedNccsClass?.map(
                                                    (
                                                        nccs: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                                        >
                                                            <span>
                                                                <Unlink2 className="h-4 w-4" />
                                                            </span>
                                                            <span>
                                                                {nccs?.name}
                                                            </span>
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </ul>
                                    </div>

                                    <div className="grid gap-4 rounded-md border p-6">
                                        <Label>Tiers</Label>
                                        <dl className="grid gap-3">
                                            {sortedTiers?.length ? (
                                                sortedTiers?.map(
                                                    (
                                                        tier: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <>
                                                            {tier ? (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                                >
                                                                    <dt>
                                                                        <SquareStack className="h-4 w-4" />
                                                                    </dt>
                                                                    <dd>
                                                                        {tier?.name ||
                                                                            "N/A"}
                                                                    </dd>
                                                                </div>
                                                            ) : (
                                                                <NoDataText />
                                                            )}
                                                        </>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </dl>
                                    </div>

                                    <div className="grid gap-4 rounded-md border p-6">
                                        <Label>Gender</Label>
                                        <dl className="grid gap-3">
                                            {data?.gender?.length ? (
                                                data?.gender?.map(
                                                    (
                                                        gender: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <>
                                                            {gender ? (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                                >
                                                                    <dt>
                                                                        <PersonStanding className="h-4 w-4" />
                                                                    </dt>
                                                                    <dd>
                                                                        {gender?.name ||
                                                                            "N/A"}
                                                                    </dd>
                                                                </div>
                                                            ) : (
                                                                <NoDataText />
                                                            )}
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
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle className="text-lg font-normal">
                                Key Markets
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid gap-3 rounded-md border p-6">
                                    <div className="grid gap-4">
                                        <Label>Primary key Market</Label>
                                        <ul className="grid gap-2">
                                            {sortedPrimaryKeyMarket?.length ? (
                                                sortedPrimaryKeyMarket?.map(
                                                    (
                                                        market: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <li
                                                            className="flex items-center text-sm text-muted-foreground"
                                                            key={i}
                                                        >
                                                            <Dot />
                                                            <span>
                                                                {market?.name ||
                                                                    "N/A"}
                                                            </span>
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="grid gap-3 rounded-md border p-6">
                                    <div className="grid gap-4">
                                        <Label>Secondary key Market</Label>
                                        <ul className="grid gap-2">
                                            {sortedSecondaryKeyMarket?.length ? (
                                                sortedSecondaryKeyMarket?.map(
                                                    (
                                                        market: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <li
                                                            className="flex items-center text-sm text-muted-foreground"
                                                            key={i}
                                                        >
                                                            <Dot />
                                                            <span>
                                                                {market?.name ||
                                                                    "-"}
                                                            </span>
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="grid gap-3 rounded-md border p-6">
                                    <div className="grid gap-4">
                                        <Label>Tertiary Market</Label>
                                        <ul className="grid gap-2">
                                            {sortedTertiaryKeyMarket?.length ? (
                                                sortedTertiaryKeyMarket?.map(
                                                    (
                                                        market: nameAndId,
                                                        i: number
                                                    ) => (
                                                        <li
                                                            className="flex items-center text-sm text-muted-foreground"
                                                            key={i}
                                                        >
                                                            <Dot />
                                                            <span>
                                                                {market?.name ||
                                                                    "N/A"}
                                                            </span>
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Card>
            ) : null}

            <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {title || ""} Characteristics
                        </CardTitle>
                    </div>
                </CardHeader>
                {/* //= ==================================== Personality Traits starts================================= = */}
                <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="overflow-hidden"
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-normal">
                            Personality Traits
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <div className="grid gap-6 rounded-md border p-6">
                            <div className="my-4 grid grid-cols-2 gap-6">
                                <div className="grid gap-3">
                                    <div className="font-semibold">
                                        Main Traits
                                    </div>
                                </div>
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">
                                        Sub Traits
                                    </div>
                                </div>

                                {data?.mainPersonalityTraits &&
                                data?.mainPersonalityTraits?.length > 0 ? (
                                    data?.mainPersonalityTraits?.map(
                                        (trait: any, i: number) => (
                                            <>
                                                <div className="grid">
                                                    <div
                                                        key={i}
                                                        className="grid"
                                                    >
                                                        <div className="flex flex-col text-muted-foreground">
                                                            <span>
                                                                {" "}
                                                                {trait?.name}
                                                            </span>
                                                            <span>
                                                                {calculatePercentages(
                                                                    trait,
                                                                    i ===
                                                                        data
                                                                            ?.mainPersonalityTraits
                                                                            ?.length -
                                                                            1
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid gap-1">
                                                    {trait?.subPersonalityTraits
                                                        ?.length ? (
                                                        trait?.subPersonalityTraits?.map(
                                                            (
                                                                trait: any,
                                                                i: number
                                                            ) => (
                                                                <div
                                                                    key={i}
                                                                    className="grid gap-3"
                                                                >
                                                                    <div className="text-muted-foreground">
                                                                        {
                                                                            trait?.name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <NoDataText />
                                                    )}
                                                </div>
                                            </>
                                        )
                                    )
                                ) : (
                                    <NoDataText />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* //= =========================================Personality Traits ends============================ = */}
            </Card>

            <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Record Details
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <div className="font-semibold">Created By</div>
                            <ul className="grid gap-1 text-muted-foreground">
                                <span>{data?.createdBy?.name || "N/A"}</span>
                                <span className="">
                                    {data?.createdDate
                                        ? format(
                                              data?.createdDate,
                                              "MMMM dd yyyy, hh:mm aaa"
                                          )
                                        : "N/A"}
                                </span>
                            </ul>
                        </div>
                        <div className="grid gap-3">
                            <div className="font-semibold">Updated By</div>
                            <ul className="grid gap-1 text-muted-foreground">
                                <span>{data?.modifiedBy?.name || "N/A"}</span>
                                <span className="">
                                    {data?.modifiedDate
                                        ? format(
                                              data?.modifiedDate,
                                              "MMMM dd yyyy, hh:mm aaa"
                                          )
                                        : "N/A"}
                                </span>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AudienceProfile;
