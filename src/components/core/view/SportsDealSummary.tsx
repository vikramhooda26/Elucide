import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { NoActionTable } from "../../table/NoActionTable";
import NoDataText from "../../no-data/NoDataText";
import SelectBox from "../../ui/multi-select";
import { NAVIGATION_ROUTES } from "../../../lib/constants";

type Props = {
    data: any;
};
function SportsDealSummary({ data }: Props) {
    const [filterField, setFilterField] = useState<string>("brandName");

    const sportsDealColumn = [
        {
            key: "brandName",
            name: "Brand",
        },
        {
            key: "teamName",
            name: "Team",
        },
        {
            key: "leagueName",
            name: "League",
        },
        {
            key: "athleteName",
            name: "Athlete",
        },
        {
            key: "partner",
            name: "Partner",
        },
        {
            key: "level",
            name: "Level",
        },
        {
            key: "type",
            name: "Type",
        },
        {
            key: "territory",
            name: "Territory",
        },
        {
            key: "annualValue",
            name: "Annual Value",
        },
        {
            key: "totalValue",
            name: "Total Value",
        },
        {
            key: "commencementDate",
            name: "Commencement",
        },
        {
            key: "expirationDate",
            name: "Expiration",
        },
        {
            key: "status",
            name: "Status",
        },

    ];

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
        })
    }

    const filterColumnOptions = [
        { label: "Brand", value: "brandName" },
        { label: "Team", value: "teamName" },
        { label: "League", value: "leagueName" },
        { label: "Athlete", value: "athleteName" },
        { label: "Partner", value: "partnerName" },
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


    return (
        <Card className="grid grid-cols-1">
            <CardHeader>
                <CardTitle>Sports Deal Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {sportsDealSummary?.length > 0 ? (
                    <NoActionTable
                        data={sportsDealSummary}
                        columns={sportsDealColumn}
                        searchableKey={filterField}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.SPORTS_DEAL_SUMMARY_LIST}
                    />
                ) : (
                    <NoDataText />
                )}
            </CardContent>
        </Card>
    );
}

export default SportsDealSummary;
