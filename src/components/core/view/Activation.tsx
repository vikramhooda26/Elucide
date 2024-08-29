import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { NoActionTable } from "../../table/NoActionTable";
import NoDataText from "../../no-data/NoDataText";
import SelectBox from "../../ui/multi-select";
import { NAVIGATION_ROUTES } from "../../../lib/constants";

type Props = {
    data: any;
};
function Activation({ data }: Props) {
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
        {
            key: "teamName",
            name: "Team"
        },
        {
            key: "leagueName",
            name: "League"
        },
        {
            key: "athleteName",
            name: "Athlete"
        }
    ];

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
        { label: "Team", value: "teamName" },
        { label: "League", value: "leagueName" },
        { label: "Athlete", value: "athleteName" }
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
                <CardTitle>Activation Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {activationSummary?.length > 0 ? (
                    <NoActionTable
                        data={activationSummary}
                        columns={activationColumn}
                        searchableKey={filterField}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.ACTIVATION_LIST}
                    />
                ) : (
                    <NoDataText />
                )}
            </CardContent>
        </Card>
    );
}

export default Activation;
