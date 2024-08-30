import { useState } from "react";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { NoActionTable } from "../../table/NoActionTable";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SelectBox from "../../ui/multi-select";

type Props = {
    data: any;
    partnerKey?: "brand" | "athlete" | "team" | "league";
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
            key: "brand",
            name: "Brand"
        },
        {
            key: "team",
            name: "Team"
        },
        {
            key: "league",
            name: "League"
        },
        {
            key: "athlete",
            name: "Athlete"
        }
    ];

    const activations: Array<any> = [];

    if (data?.activations?.length > 0) {
        data?.activations?.forEach((d: any, i: number) => {
            const activation: any = Object.assign({}, d);

            activation.brand = d?.brand?.name;
            activation.athlete = d?.athlete?.name;
            activation.league = d?.league?.name;
            activation.team = d?.team?.name;
            activation.territory = d?.territory?.name;
            activation.partner = d?.partner?.name;

            activations?.push(activation);
        });
    }

    const filterColumnOptions = [
        { label: "Name", value: "name" },
        { label: "Year", value: "year" },
        { label: "Brand", value: "brand" },
        { label: "Team", value: "team" },
        { label: "League", value: "league" },
        { label: "Athlete", value: "athlete" }
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
                {activations?.length > 0 ? (
                    <NoActionTable
                        data={activations}
                        columns={activationColumn}
                        searchableKey={filterField}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.ACTIVATION}
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
