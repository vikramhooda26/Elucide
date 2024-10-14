import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { z } from 'zod';
import OptionalColumnHeader from "./OptionalColumnHeader";

export const createSchema = () =>
    z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        nationality: z.object({
            id: z.string(),
            name: z.string(),
        }).optional(),
        sport: z.object({
            id: z.string(),
            name: z.string(),
        }).optional(),
        agency: z.object({
            id: z.string(),
            name: z.string(),
        }).optional(),
        age: z.array(z.object({
            id: z.string().optional(),
            name: z.string().optional(),
        })).optional(),
        athleteGender: z.object({
            id: z.string().optional(),
            name: z.string().optional(),
        }).optional(),
        gender: z.array(z.object({
            id: z.string().optional(),
            name: z.string().optional(),
        })).optional(),
        createdDate: z.string().optional(),
        modifiedDate: z.string().optional(),
        mainPersonalityTraits: z.array(z.object({
            id: z.string().optional(),
            name: z.string().optional(),
            subPersonalityTraits: z.array(z.object({
                id: z.string().optional(),
                name: z.string().optional(),
            })).optional()
        })).optional(),
    });

type CustomColumnDef<TData> = ColumnDef<TData> & {
    filterKey?: string;
};

class OptionalColumns {

    static getOptionalColumns(filters: Record<string, {
        type: string;
        value: any;
        isMandatory: boolean;
    }>) {
        const schema = createSchema();
        type TSchemaType = z.infer<typeof schema>;
        const columns: CustomColumnDef<TSchemaType>[] = [
            {
                accessorKey: "age",
                filterKey: 'ageIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Age" />,
                cell: ({ row }) => {
                    const ageValues = row.getValue("age");
                    const filterValues = filters?.ageIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {Array.isArray(ageValues) && Array.isArray(filterValues) && ageValues.some((age: any) => filterValues.includes(age.id))
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "athleteGender",
                filterKey: 'athleteGenderIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Athlete Gender" />,
                cell: ({ row }) => {
                    const athleteGender: { id: string } = row.getValue("athleteGender");
                    const filterValues = filters?.athleteGenderIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {athleteGender?.id && Array.isArray(filterValues) && filterValues.includes(athleteGender.id)
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "gender",
                filterKey: 'genderIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Gender" />,
                cell: ({ row }) => {
                    const genderValues = row.getValue("gender");
                    const filterValues = filters?.genderIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {Array.isArray(genderValues) && Array.isArray(filterValues) && genderValues.some((gender: any) => filterValues.includes(gender.id))
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "nationality",
                filterKey: 'nationalityIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Nationality" />,
                cell: ({ row }) => {
                    const nationality: { id: string } = row.getValue("nationality");
                    const filterValues = filters?.nationalityIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {nationality?.id && Array.isArray(filterValues) && filterValues.includes(nationality.id)
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "sport",
                filterKey: 'sportIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Sport" />,
                cell: ({ row }) => {
                    const sport: { id: string } = row.getValue("sport");
                    const filterValues = filters?.sportIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {sport?.id && Array.isArray(filterValues) && filterValues.includes(sport.id)
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "agency",
                filterKey: 'agencyIds',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Agency" />,
                cell: ({ row }) => {
                    const agency: { id: string } = row.getValue("agency");
                    const filterValues = filters?.agencyIds?.value;

                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[400px] truncate font-medium">
                                {agency?.id && Array.isArray(filterValues) && filterValues.includes(agency.id)
                                    ? "Matched"
                                    : "Not Matched"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
            },
            {
                accessorKey: "createdDate",
                filterKey: 'dateRange',
                header: ({ column }) => <OptionalColumnHeader column={column} title="Created At" />,
                cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <span className="max-w-[400px] truncate font-medium">
                            {row.getValue("createdDate")
                                ? format(new Date(row.getValue("createdDate")), "dd-MM-yyyy, hh:mm aaaaaa")
                                : ""}
                        </span>
                    </div>
                ),
                enableSorting: true,
                enableHiding: true,
            },
        ];

        const optionalFilterKeys: string[] = [];

        Object.keys(filters)?.forEach((d) => {
            if (!filters[d]?.isMandatory) {
                optionalFilterKeys.push(d);
            }
        });

        const optionalColumns: ColumnDef<TSchemaType>[] = columns?.filter((d) => d?.filterKey && optionalFilterKeys.includes(d?.filterKey)).map((d) => {
            delete d.filterKey;
            return d;
        })

        return optionalColumns;
    }
}
export default OptionalColumns;

// export const filterkeys = {
//         id: z.string(),
//         createdDate: z.string(),
//         modifiedDate: z.string(),
//         createdBy: z.string(),
//         modifiedBy: z.string(),
//         brandIds: z.array(z.string()).optional(),
//         teamIds: z.array(z.string()).optional(),
//         leagueIds: z.array(z.string()).optional(),
//         athleteIds: z.array(z.string()).optional(),
//         statusIds: z.array(z.string()).optional(),
//         athleteAge: z.object({
//             value: z.array(z.number()),
//             operationType: z.string(),
//         }).optional(),
//         athleteGenderIds: z.array(z.string()).optional(), // done
//         costOfAssociation: z.object({
//             value1: z.array(z.number()),
//             value2: z.array(z.number()),
//             operationType: z.string(),
//         }).optional(),
//         ageIds: z.array(z.string()).optional(), // done
//         genderIds: z.array(z.string()).optional(), // done
//         cityIds: z.array(z.string()).optional(),
//         stateIds: z.array(z.string()).optional(),
//         activeCampaignIds: z.array(z.string()).optional(),
//         agencyIds: z.array(z.string()).optional(),
//         assetIds: z.array(z.string()).optional(),
//         broadcastPartnerIds: z.array(z.string()).optional(),
//         maincategoryIds: z.array(z.string()).optional(),
//         subCategoryIds: z.array(z.string()).optional(),
//         formatIds: z.array(z.string()).optional(),
//         primaryMarketIds: z.array(z.string()).optional(),
//         secondaryMarketIds: z.array(z.string()).optional(),
//         tertiaryIds: z.array(z.string()).optional(),
//         primaryMarketingPlatformIds: z.array(z.string()).optional(),
//         secondaryMarketingPlatformIds: z.array(z.string()).optional(),
//         primarySocialMediaPlatformIds: z.array(z.string()).optional(),
//         secondarySocialMediaPlatformIds: z.array(z.string()).optional(),
//         yearOfInception: z.string().optional(),
//         franchiseFee: z.string().optional(),
//         leagueOwnerIds: z.array(z.string()).optional(),
//         nccsIds: z.array(z.string()).optional(),
//         ottPartnerIds: z.array(z.string()).optional(),
//         parentOrgIds: z.array(z.string()).optional(),
//         mainpersonalityIds: z.array(z.string()).optional(),
//         subPersonalityTraitIds: z.array(z.string()).optional(),
//         sportsDealSummaryLevelIds: z.array(z.string()).optional(),
//         sportsDealSummaryStatusIds: z.array(z.string()).optional(),
//         sportsDealSummaryTerritoryIds: z.array(z.string()).optional(),
//         sportsDealSummaryTypeIds: z.array(z.string()).optional(),
//         taglineIds: z.array(z.string()).optional(),
//         teamOwnerIds: z.array(z.string()).optional(),
//         sportIds: z.array(z.string()).optional(),
//         tierIds: z.array(z.string()).optional(),
//         associationLevelIds: z.array(z.string()).optional(),
//         nationalityIds: z.array(z.string()).optional(),
//         socialMediaIds: z.array(z.string()).optional(),
//         athleteStatusIds: z.array(z.string()).optional(),
//         strategyOverview: z.string().optional(),
//         facebook: z.string().optional(),
//         instagram: z.string().optional(),
//         twitter: z.string().optional(),
//         linkedin: z.string().optional(),
//         youtube: z.string().optional(),
//         website: z.string().optional(),
//         contactName: z.string().optional(),
//         contactDesignation: z.string().optional(),
//         contactEmail: z.string().optional(),
//         contactNumber: z.string().optional(),
//         contactLinkedin: z.string().optional(),
//         reachMetrics: z.object({
//             value1: z.array(z.number()),
//             value2: z.array(z.number()),
//             operationType: z.string(),
//             checkType: z.string(),
//         }).optional(),
//         viewershipMetrics: z.object({
//             value1: z.array(z.number()),
//             value2: z.array(z.number()),
//             operationType: z.string(),
//             checkType: z.string(),
//         }).optional(),
//         yearMetrics: z.object({
//             value1: z.array(z.number()),
//             value2: z.array(z.number()),
//             operationType: z.string(),
//             checkType: z.string(),
//         }).optional(),
//         partnerIdMetrics: z.object({
//             value: z.array(z.string()),
//             checkType: z.string(),
//         }).optional(),
//         endorsement: z.string().optional(),
//     };


// Applied Filters:
// athleteIds: ["14","11"]
// statusIds: ["3","2"]
// athleteAge: [27,69]
// athleteGenderIds: ["2","1"]
// costOfAssociation: {"value1":[53000],"value2":[500000],"operationType":"gt"}
// ageIds: ["1","3","5"]
// genderIds: ["2","1"]
// stateIds: ["12","5","7"]
// agencyIds: ["8","5","3"]
// primaryMarketIds: ["3","8"]
// secondaryMarketIds: ["6","8"]
// tertiaryIds: ["12","5","1"]
// primarySocialMediaPlatformIds: ["2","5"]
// secondarySocialMediaPlatformIds: ["1","3"]
// nccsIds: ["1","3"]
// subPersonalityTraitIds: ["55","53","52"]
// sportIds: ["16","17"]
// tierIds: ["1","4"]
// associationLevelIds: ["6","4","3"]
// nationalityIds: ["5","6"]
// socialMediaIds: ["1","3"]
// athleteStatusIds: ["1","3"]
// strategyOverview: "Strategies "
// facebook: "Facebook"
// instagram: "Instagram"
// twitter: "Twitter"
// linkedin: "LinkedIn"
// youtube: "Youtube"
// website: "Website"
// contactName: "Contact Name"
// contactDesignation: "Contact Designation"
// contactEmail: "Contact Email"
// contactNumber: "Contact Number"
// contactLinkedin: "Contact LinkedIn"