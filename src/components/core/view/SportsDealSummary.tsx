import { useCallback, useState } from "react";
import useNavigator from "../../../hooks/useNavigator";
import { useUser } from "../../../hooks/useUser";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { ConditionalButton } from "../../button/ConditionalButton";
import { NoActionTable } from "../../table/NoActionTable";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SelectBox from "../../ui/multi-select";
import { useNavigate } from "react-router-dom";

type Props = {
    data: any;
    partnerKey?: "brand" | "athlete" | "team" | "league";
};

function SportsDealSummary({ data, partnerKey }: Props) {
    const [filterField, setFilterField] = useState<string>("");
    const navigate = useNavigate();
    const userRole = useUser()?.role;

    if (!userRole) {
        return;
    }

    const navigator = useNavigator();

    const sportsDealColumn = [
        {
            key: "brand",
            name: "Brand",
            navigate: true
        },
        {
            key: "level",
            name: "Level"
        },
        {
            key: "type",
            name: "Type"
        },
        {
            key: "territory",
            name: "Territory"
        },
        {
            key: "annualValue",
            name: "Annual Value"
        },
        {
            key: "totalValue",
            name: "Total Value"
        },
        {
            key: "commencementDate",
            name: "Commencement"
        },
        {
            key: "expirationDate",
            name: "Expiration"
        },
        {
            key: "duration",
            name: "Duration"
        },
        {
            key: "status",
            name: "Status"
        }
    ];

    if (partnerKey && partnerKey?.length > 0) {
        sportsDealColumn?.splice(1, 0, {
            key: partnerKey,
            name: "Partner Name",
            navigate: true
        });
    } else {
        sportsDealColumn?.splice(1, 0, {
            key: "partner",
            name: "Partner Name",
            navigate: true
        });
    }

    const sportsDealSummary: Array<any> = [];

    if (data?.sportsDealSummary?.length > 0) {
        data?.sportsDealSummary?.forEach((d: any, i: number) => {
            const sportsDeal: any = Object.assign({}, d);
            sportsDeal.level = d?.level?.name;
            sportsDeal.brand = d?.brand?.name;
            sportsDeal.athlete = d?.athlete?.name;
            sportsDeal.league = d?.league?.name;
            sportsDeal.team = d?.team?.name;
            sportsDeal.territory = d?.territory?.name;

            if (!partnerKey || partnerKey?.length <= 0) {
                sportsDeal.partner =
                    d?.athlete?.name || d?.league?.name || d?.team?.name;
            }
            console.log("sportsDeal.partner -=- ", sportsDeal);

            sportsDealSummary?.push(sportsDeal);
        });
    }

    const filterColumnOptions = [
        { label: "Brand", value: "brand" },
        { label: "Partner", value: partnerKey || "partner" },
        { label: "Level", value: "level" },
        { label: "Status", value: "status" }
    ];

    const toolbarAttributes = [
        <SelectBox
            options={filterColumnOptions}
            onChange={(value) => setFilterField(value as string)}
            value={filterField}
            placeholder="Select filter key"
            inputPlaceholder="Search for a key..."
            emptyPlaceholder="Not found"
            className="w-fit"
        />
    ];

    const createButton = (
        <ConditionalButton
            onClick={() =>
                navigator(NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY)
            }
            accessLevel="all_staff"
        >
            Create Deal
        </ConditionalButton>
    );

    const onEdit = useCallback((id: string) => {
        navigate(`${NAVIGATION_ROUTES.EDIT_SPORTS_DEAL_SUMMARY}/${id}`);
    }, []);

    return (
        <Card
            x-chunk="dashboard-07-chunk-0"
            className="grid grid-cols-1 overflow-hidden"
        >
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Sports Deal Summary
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {sportsDealSummary?.length > 0 ? (
                    <NoActionTable
                        data={sportsDealSummary}
                        columns={sportsDealColumn}
                        searchableKey={filterField || "brand"}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY}
                        action={{ create: createButton }}
                        onEdit={userRole === "SUPER_ADMIN" ? onEdit : () => {}}
                    />
                ) : (
                    <span className="text-muted-foreground">
                        No Sports Deal Summaries
                    </span>
                )}
            </CardContent>
        </Card>
    );
}

export default SportsDealSummary;
