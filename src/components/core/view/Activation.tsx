import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { NoActionTable } from "../../table/NoActionTable";
import NoDataText from "../../no-data/NoDataText";
import SelectBox from "../../ui/multi-select";
import { NAVIGATION_ROUTES } from "../../../lib/constants";

type Props = {
    data: any;
    partnerKey?: string;
};
function Activation({ data, partnerKey }: Props) {
    const [filterField, setFilterField] = useState<string>("name");

    const activationColumn = [
        {
            key: "name",
            name: "Name"
        },
        {
            key: "year",
            name: "Year"
        },
        {
            key: "brandName",
            name: "Brand"
        },
    ];

    if (partnerKey && partnerKey?.length > 0) {
        activationColumn?.push({
            key: partnerKey,
            name: "Partner Name"
        });
    }

    const activationSummary: Array<any> = [];

    if (data?.activationSummary?.length > 0) {
        data?.activationSummary?.forEach((d: any, i: number) => {
            const activation: any = Object.assign({}, d);

            activation.brandName = d?.brandName?.name;
            activation.athleteName = d?.athleteName?.name;
            activation.leagueName = d?.leagueName?.name;
            activation.teamName = d?.teamName?.name;
            activation.territory = d?.territory?.name;
            activation.partner = d?.partner?.name;

            activationSummary?.push(activation);
        });
    }

    const filterColumnOptions = [
        { label: "Name", value: "name" },
        { label: "Year", value: "year" },
        { label: "Brand", value: "brandName" },
        { label: "Partner", value: partnerKey || "" },
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
        <Card
            x-chunk="dashboard-07-chunk-0"
            className="grid grid-cols-1 overflow-hidden"
        >
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Activation Summary
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {activationSummary?.length > 0 ? (
                    <NoActionTable
                        data={activationSummary}
                        columns={activationColumn}
                        searchableKey={filterField}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.ACTIVATION_LIST}
                    />
                ) : (
                    <span className="text-muted-foreground">
                        No Activation Summaries
                    </span>
                )}
            </CardContent>
        </Card>
    );
}

export default Activation;
