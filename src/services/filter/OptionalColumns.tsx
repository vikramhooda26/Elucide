import { AllColumns, matched } from "@/types/metadata/Metadata";
import { ColumnDef } from "@tanstack/react-table";
import OptionalColumnHeader from "./OptionalColumnHeader";
import Association from "@/components/core/view/Association";
import ModalWrapper from "@/components/modal/ModalWrapper";
import { TAssociation } from "@/features/league/constants.ts/metadata";
import Tooltip from "@/components/modal/Tooltip";
import AssociationLevel from "@/components/core/view/AssociationLevel";

type CustomColumnDef<TData> = ColumnDef<TData> & {
    filterKey?: string;
};
class OptionalColumns {
    static getOptionalColumns(
        filters: Record<
            string,
            {
                type: string;
                value: any;
                isMandatory: boolean;
            }
        >
    ) {
        const matchedLabel = "Matched";
        const notMatchedLabel = "Not Matched";

        type TSchemaType = AllColumns & { associationValues: TAssociation[] };

        const MatchedCell = ({ value }: { value: "Data Matched" | "Not Matched" }) => (
            <div className="flex space-x-2">
                <span className="max-w-[400px] truncate font-medium">
                    {value === matched ? matchedLabel : notMatchedLabel}
                </span>
            </div>
        );

        const CostOfAssociationCell = ({
            association,
            value
        }: {
            association: TAssociation[];
            value: "Data Matched" | "Not Matched";
        }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[400px] truncate font-medium">
                        {association?.length > 0 ? (
                            <Tooltip
                                triggerOnHover={true}
                                triggerText={value === matched ? matchedLabel : notMatchedLabel}
                                className={"w-full border-none p-0"}
                            >
                                <div className="scrollbar max-h-80 overflow-scroll">
                                    <AssociationLevel data={{ association }} />
                                </div>
                            </Tooltip>
                        ) : value === matched ? (
                            matchedLabel
                        ) : (
                            notMatchedLabel
                        )}
                    </span>
                </div>
            );
        };

        const createDynamicColumn = <TData,>(
            accessorKey: keyof TData,
            filterKey: string,
            title: string
        ): CustomColumnDef<TData> => ({
            accessorKey: accessorKey as string,
            filterKey,
            header: ({ column }) => <OptionalColumnHeader column={column} title={title} />,
            cell: ({ row }) => <MatchedCell value={row.getValue(accessorKey as string)} />,
            enableSorting: true,
            enableHiding: true
        });

        const columnConfigs: Array<{
            accessorKey: keyof TSchemaType;
            filterKey: string;
            title: string;
        }> = [
                { accessorKey: "athleteAge", filterKey: "athleteAge", title: "Athlete Age" },
                { accessorKey: "age", filterKey: "ageIds", title: "Target Age" },
                { accessorKey: "athleteGender", filterKey: "athleteGenderIds", title: "Athlete Gender" },
                { accessorKey: "gender", filterKey: "genderIds", title: "Target Gender" },
                { accessorKey: "nationality", filterKey: "nationalityIds", title: "Nationality" },
                { accessorKey: "sport", filterKey: "sportIds", title: "Sport" },
                { accessorKey: "agency", filterKey: "agencyIds", title: "Agency" },
                { accessorKey: "status", filterKey: "athleteStatusIds", title: "Status" },

                { accessorKey: "state", filterKey: "stateIds", title: "State" },
                { accessorKey: "city", filterKey: "cityIds", title: "City" },
                { accessorKey: "team", filterKey: "teamIds", title: "Team" },
                { accessorKey: "parentOrg", filterKey: "parentOrgIds", title: "Parent Org." },
                { accessorKey: "primaryKeyMarket", filterKey: "primaryMarketIds", title: "Primary Market" },
                { accessorKey: "secondaryKeyMarket", filterKey: "secondaryMarketIds", title: "Secondary Market" },
                { accessorKey: "tertiary", filterKey: "tertiaryIds", title: "Tertiary Market" },
                {
                    accessorKey: "primaryMarketingPlatform",
                    filterKey: "primaryMarketingPlatformIds",
                    title: "Primary Market Platform"
                },
                {
                    accessorKey: "secondaryMarketingPlatform",
                    filterKey: "secondaryMarketingPlatformIds",
                    title: "Secondary Market Platform"
                },

                { accessorKey: "mainCategories", filterKey: "maincategoryIds", title: "Main Category" },
                { accessorKey: "subCategories", filterKey: "subCategoryIds", title: "Sub Category" },

                { accessorKey: "mainPersonalityTraits", filterKey: "mainpersonalityIds", title: "Main Personality Trait" },
                { accessorKey: "subPersonalityTraits", filterKey: "subPersonalityTraitIds", title: "Sub Personality Trait" },

                { accessorKey: "yearOfInception", filterKey: "yearOfInception", title: "Year Of Inception" },
                { accessorKey: "franchiseFee", filterKey: "franchiseFee", title: "Franchise Fee" },
                { accessorKey: "owners", filterKey: "leagueOwnerIds", title: "Owners" },
                { accessorKey: "owners", filterKey: "teamOwnerIds", title: "Owners" },
                { accessorKey: "nccs", filterKey: "nccsIds", title: "NCCS" },
                { accessorKey: "ottPartner", filterKey: "ottPartnerIds", title: "OTT Partners" },
                { accessorKey: "parentOrg", filterKey: "parentOrgIds", title: "Parent Org" },
                { accessorKey: "taglines", filterKey: "taglineIds", title: "Taglines" },
                { accessorKey: "tiers", filterKey: "tierIds", title: "Tiers" },
                { accessorKey: "associationLevel", filterKey: "associationLevelIds", title: "Association Level" },

                { accessorKey: "reachMetrics", filterKey: "reachMetrics", title: "Reach" },
                { accessorKey: "viewershipMetrics", filterKey: "viewershipMetrics", title: "Viewership" },
                { accessorKey: "yearMetrics", filterKey: "yearMetrics", title: "Year" },
                { accessorKey: "partnerIdMetrics", filterKey: "partnerIdMetrics", title: "Partner" },

                { accessorKey: "endorsement", filterKey: "endorsement", title: "Endorsement" },

                { accessorKey: "strategyOverview", filterKey: "strategyOverview", title: "Strategy Overview" },
                
                { accessorKey: "contactDesignation", filterKey: "contactDesignation", title: "Contact Designation" },
                { accessorKey: "contactNumber", filterKey: "contactNumber", title: "Contact Number" },
                { accessorKey: "contactLinkedin", filterKey: "contactLinkedin", title: "Contact LinkedIn" },
                { accessorKey: "facebook", filterKey: "facebook", title: "Facebook" },
                { accessorKey: "instagram", filterKey: "instagram", title: "Instagram" },
                { accessorKey: "twitter", filterKey: "twitter", title: "Twitter" },
                { accessorKey: "linkedin", filterKey: "linkedin", title: "LinkedIn" },
                { accessorKey: "youtube", filterKey: "youtube", title: "YouTube" },
                { accessorKey: "website", filterKey: "website", title: "Website" },


                { accessorKey: "contactName", filterKey: "contactName", title: "Contact Name" },
                { accessorKey: "contactEmail", filterKey: "contactEmail", title: "Contact Email" },
                { accessorKey: "contactDesignation", filterKey: "contactDesignation", title: "Contact Designation" },
                { accessorKey: "contactNumber", filterKey: "contactNumber", title: "Contact Number" },
                { accessorKey: "contactLinkedin", filterKey: "contactLinkedin", title: "Contact LinkedIn" },
            ];

        const columns: CustomColumnDef<TSchemaType>[] = columnConfigs.map((config) =>
            createDynamicColumn<TSchemaType>(config.accessorKey as keyof TSchemaType, config.filterKey, config.title)
        );

        const optionalFilterKeys: string[] = [];

        Object.keys(filters)?.forEach((d) => {
            if (!filters[d]?.isMandatory) {
                optionalFilterKeys.push(d);
            }
        });

        const optionalColumns: ColumnDef<TSchemaType>[] = columns
            ?.filter((d) => d?.filterKey && optionalFilterKeys.includes(d?.filterKey))
            .map((d) => {
                delete d.filterKey;
                return d;
            });

        if (filters?.costOfAssociation) {
            let associationValues: TAssociation;
            const associationValueColumn: CustomColumnDef<TSchemaType> = createDynamicColumn<TSchemaType>(
                "associationValues" as keyof TSchemaType,
                "costOfAssociation",
                "Cost Of Association"
            );
            (associationValueColumn.header = ({ column }) => <></>),
                (associationValueColumn.cell = ({ row }) => <></>),
                optionalColumns?.unshift(associationValueColumn);

            const costOfAssocitionColumn: CustomColumnDef<TSchemaType> = createDynamicColumn<TSchemaType>(
                "association" as keyof TSchemaType,
                "costOfAssociation",
                "Cost Of Association"
            );
            (costOfAssocitionColumn.cell = ({ row }) => (
                <CostOfAssociationCell
                    association={row.getValue("associationValues")}
                    value={row.getValue("association" as string)}
                />
            )),
                optionalColumns?.unshift(costOfAssocitionColumn);
        }

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
