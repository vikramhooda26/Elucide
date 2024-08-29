import { useState } from "react";
import useNavigator from "../../../hooks/useNavigator";
import { useUser } from "../../../hooks/useUser";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { ConditionalButton } from "../../button/ConditionalButton";
import { NoActionTable } from "../../table/NoActionTable";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SelectBox from "../../ui/multi-select";

type Props = {
    data: any;
    partnerKey?: string;
};
function SportsDealSummary({ data, partnerKey }: Props) {
    const [filterField, setFilterField] = useState<string>("brandName");
    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }
    const navigator = useNavigator();

    const sportsDealColumn = [
        {
            key: "brandName",
            name: "Brand"
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
            key: "status",
            name: "Status"
        }
    ];

    if (partnerKey && partnerKey?.length > 0) {
        sportsDealColumn?.splice(1, 0, {
            key: partnerKey,
            name: "Partner Name"
        });
    }

    const sportsDealSummary: Array<any> = [];

    if (data?.sportsDealSummary?.length > 0) {
        data?.sportsDealSummary?.forEach((d: any, i: number) => {
            const sportsDeal: any = Object.assign({}, d);
            sportsDeal.level = d?.level?.name;
            sportsDeal.brandName = d?.brandName?.name;
            sportsDeal.athleteName = d?.athleteName?.name;
            sportsDeal.leagueName = d?.leagueName?.name;
            sportsDeal.teamName = d?.teamName?.name;
            sportsDeal.territory = d?.territory?.name;
            sportsDeal.partner = d?.partner?.name;

            sportsDealSummary?.push(sportsDeal);
        });
    }

    const filterColumnOptions = [
        { label: "Brand", value: "brandName" },
        { label: "Partner", value: partnerKey || "" },
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

    const createButton =
        userRole !== "USER" ? (
            <div className="mx-2 flex items-center space-x-2">
                <ConditionalButton
                    onClick={() =>
                        navigator(NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY)
                    }
                    accessLevel="all_staff"
                >
                    Create
                </ConditionalButton>
            </div>
        ) : null;

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
                        searchableKey={filterField}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.SPORTS_DEAL_SUMMARY_LIST}
                        action={{ create: createButton }}
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
