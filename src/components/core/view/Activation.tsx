import { useState } from "react";
import { NAVIGATION_ROUTES } from "../../../lib/constants";
import { NoActionTable } from "../../table/NoActionTable";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SelectBox from "../../ui/multi-select";
import { useUser } from "../../../hooks/useUser";
import { ConditionalButton } from "../../button/ConditionalButton";
import { useNavigate } from "react-router-dom";
import useNavigator from "../../../hooks/useNavigator";

type Props = {
    data: any;
    partnerKey?: "brand" | "athlete" | "team" | "league";
};

function Activation({ data, partnerKey }: Props) {
    const [filterField, setFilterField] = useState<string>("");
    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const navigator = useNavigator();

    const activationColumn = [
        {
            key: "name",
            name: "Name",
            navigate: true,
        },
        {
            key: "brand",
            name: "Brand name"
        },
        {
            key: "year",
            name: "Year"
        }
    ];

    if (partnerKey && partnerKey?.length > 0) {
        activationColumn?.splice(2, 0, {
            key: partnerKey,
            name: "Partner name"
        });
    } else {
        activationColumn?.splice(2, 0, {
            key: "partner",
            name: "Partner name"
        });
    }

    const activations: Array<any> = [];

    if (data?.activations?.length > 0) {
        data?.activations?.forEach((d: any, i: number) => {
            const activation: any = Object.assign({}, d);

            activation.brand = d?.brand?.name;
            activation.athlete = d?.athlete?.name;
            activation.league = d?.league?.name;
            activation.team = d?.team?.name;
            activation.territory = d?.territory?.name;
            if (!partnerKey || partnerKey?.length <= 0) {
                activation.partner =
                    d?.athlete?.name || d?.league?.name || d?.team?.name;
            }
            activations?.push(activation);
        });
    }

    const filterColumnOptions = [
        { label: "Name", value: "name" },
        { label: "Brand", value: "brand" },
        { label: "Partner", value: partnerKey || "partner" }
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
            onClick={() => navigator(NAVIGATION_ROUTES.ACTIVATION_CREATE)}
            accessLevel="all_staff"
        >
            Create Activation
        </ConditionalButton>
    );

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
                        searchableKey={filterField || "name"}
                        toolbarAttributes={toolbarAttributes}
                        viewRoute={NAVIGATION_ROUTES?.ACTIVATION}
                        action={{ create: createButton }}
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
