import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { z } from 'zod';
import OptionalColumnHeader from "./OptionalColumnHeader";
import { AllColumns } from "@/types/metadata/Metadata";

type CustomColumnDef<TData> = ColumnDef<TData> & {
    filterKey?: string;
};

class OptionalColumns {

    static getOptionalColumns(filters: Record<string, {
        type: string;
        value: any;
        isMandatory: boolean;
    }>) {

        type TSchemaType = AllColumns;
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
                                {row.getValue("age") || "Not Matched"}
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
                                {row.getValue("athleteGender") || "Not Matched"}
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
                                {row.getValue("gender") || "Not Matched"}
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
                                {row.getValue("nationality") || "Not Matched"}
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
                                {row.getValue("sport") || "Not Matched"}
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
                                {row.getValue("agency") || "Not Matched"}
                            </span>
                        </div>
                    );
                },
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

// view keys

// export type TEditEntityFormSchema = {
//     // Athlete-specific fields
//     athleteAge?: string;
//     sportsDealsummary?: {
//         id?: string;
//         annualValue?: string;
//         totalValue?: string;
//         assets?: {
//             id: string;
//             name: string;
//         }[];
//         commencementDate?: string;
//         expirationDate?: string;
//         duration?: string;
//         territory?: {
//             id?: string;
//             name?: string;
//         };
//         mediaLink?: string;
//         level?: {
//             id?: string;
//             name?: string;
//         };
//         status?: string;
//         type?: string;
//         brandName?: {
//             id?: string;
//             name?: string;
//         };
//         athleteName?: {
//             id?: string;
//             name?: string;
//         };
//         leagueName?: {
//             id?: string;
//             name?: string;
//         };
//         teamName?: {
//             id?: string;
//             name?: string;
//         };
//     }[];
//     association?: {
//         associationId?: string;
//         associationLevel?: {
//             id?: string;
//             name?: string;
//         };
//         costOfAssociation?: string;
//     }[];

//     // Brand-specific fields
//     parentOrg?: {
//         id?: string;
//         name?: string;
//     };
//     mainCategories?: {
//         id?: string;
//         name?: string;
//         subCategories?: {
//             id?: string;
//             name?: string;
//         }[];
//     }[];
//     sportsDealSummary?: {
//         id?: string;
//         annualValue?: string;
//         totalValue?: string;
//         assets?: {
//             id?: string;
//             name?: string;
//         }[];
//         commencementDate?: string;
//         expirationDate?: string;
//         duration?: string;
//         territory?: {
//             id?: string;
//             name?: string;
//         };
//         mediaLink?: string;
//         level?: {
//             id?: string;
//             name?: string;
//         };
//         status?: string;
//         type?: string;
//         brandName?: {
//             id?: string;
//             name?: string;
//         };
//         athleteName?: {
//             id?: string;
//             name?: string;
//         };
//         leagueName?: {
//             id?: string;
//             name?: string;
//         };
//         teamName?: {
//             id?: string;
//             name?: string;
//         };
//     }[];

//     // League-specific fields
//     owners?: {
//         id?: string;
//         name?: string;
//     }[];
//     yearOfInception: string;
//     ottPartnerMetrics?: {
//         id: string;
//         viewership: string;
//         reach: string;
//         year: string;
//         ottPartner: { id: string; name: string };
//     }[];
//     broadcastPartnerMetrics?: {
//         id: string;
//         reach: string;
//         viewership: string;
//         year: string;
//         broadcastPartner: { id: string; name: string };
//     }[];

//     // Team-specific fields
//     franchiseFee?: string;
//     activationSummary?: {
//         asset: {
//             id?: string;
//             name?: string;
//         }[];
//         market: {
//             id?: string;
//             name?: string;
//         }[];
//         name: string;
//         type: {
//             id?: string;
//             name?: string;
//         }[];
//         year: string;
//         athleteName?: {
//             id?: string;
//             name?: string;
//         };
//         leagueName?: {
//             id?: string;
//             name?: string;
//         };
//         teamName?: {
//             id?: string;
//             name?: string;
//         };
//         brandName?: {
//             id?: string;
//             name?: string;
//         };
//     }[];

//     // Common fields (moved to the bottom)
//     id?: string;
//     name?: string;
//     sport?: {
//         id?: string;
//         name?: string;
//     };
//     agency?: {
//         id?: string;
//         name?: string;
//     };
//     instagram?: string;
//     linkedin?: string;
//     youtube?: string;
//     website?: string;
//     twitter?: string;
//     facebook?: string;
//     strategyOverview?: string;
//     primaryKeyMarket?: {
//         id?: string;
//         name?: string;
//     }[];
//     secondaryKeyMarket?: {
//         id?: string;
//         name?: string;
//     }[];
//     tertiary?: {
//         id?: string;
//         name?: string;
//     }[];
//     primaryMarketingPlatform?: {
//         id?: string;
//         name?: string;
//     }[];
//     secondaryMarketingPlatform?: {
//         id?: string;
//         name?: string;
//     }[];
//     tiers?: {
//         id?: string;
//         name?: string;
//     }[];
//     age?: {
//         id?: string;
//         name?: string;
//     }[];
//     mainPersonalityTraits?: {
//         id?: string;
//         name?: string;
//         subPersonalityTraits?: {
//             id?: string;
//             name?: string;
//         }[];
//     }[];
//     contactPersons?: {
//         contactId: string;
//         contactName: string;
//         contactEmail?: string;
//         contactLinkedin?: string;
//         contactNumber?: string;
//         contactDesignation?: string;
//     }[];
//     gender?: {
//         id?: string;
//         name?: string;
//     }[];
//     nccs?: {
//         id?: string;
//         name?: string;
//     }[];
//     state?: {
//         id?: string;
//         name?: string;
//     };
//     createdBy?: {
//         id?: string;
//         name?: string;
//     };
//     modifiedBy?: {
//         id?: string;
//         name?: string;
//     };
//     createdDate?: Date;
//     modifiedDate?: Date;
// };

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