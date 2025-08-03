import { AllColumns, matched, notMatched } from "@/types/metadata/Metadata";
import { ColumnDef } from "@tanstack/react-table";
import OptionalColumnHeader from "./OptionalColumnHeader";
import Association from "@/components/core/view/Association";
import ModalWrapper from "@/components/modal/ModalWrapper";
import { TAssociation } from "@/features/league/constants.ts/metadata";
import Tooltip from "@/components/modal/Tooltip";
import AssociationLevel from "@/components/core/view/AssociationLevel";
import { TPageKey } from "./FilterConfigs";

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
    >,
    pageKey: TPageKey
  ) {
    const matchedLabel = "Matched";
    const notMatchedLabel = "Not Matched";

    type TSchemaType = AllColumns & { associationValues: TAssociation[] };

    const MatchedCell = ({ value }: { value: string }) => (
      <div className="flex space-x-2">
        <span className="max-w-[400px] truncate font-medium">
          {value === matched
            ? matchedLabel
            : value === notMatched || typeof value !== "string"
              ? notMatchedLabel
              : value}
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
                triggerText={
                  value === matched
                    ? matchedLabel
                    : value === notMatched || typeof value !== "string"
                      ? notMatchedLabel
                      : value
                }
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
      title: string,
      isMandatory: boolean
    ): CustomColumnDef<TData> => ({
      accessorKey: accessorKey as string,
      filterKey,
      header: ({ column }) => <OptionalColumnHeader column={column} title={title} isMandatory={isMandatory} />,
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
      { accessorKey: "activeCampaigns", filterKey: "activeCampaignIds", title: "Active Campaign" },
      // { accessorKey: "team", filterKey: "teamIds", title: "Team" },
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
      {
        accessorKey: "subPersonalityTraits",
        filterKey: "subPersonalityTraitIds",
        title: "Sub Personality Trait"
      },

      { accessorKey: "yearOfInception", filterKey: "yearOfInception", title: "Year Of Inception" },
      { accessorKey: "franchiseFee", filterKey: "franchiseFee", title: "Franchise Fee" },
      { accessorKey: "leagueOwners", filterKey: "leagueOwnerIds", title: "Owners" },
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
      // { accessorKey: "linkedin", filterKey: "linkedin", title: "LinkedIn" },
      { accessorKey: "youtube", filterKey: "youtube", title: "YouTube" },
      { accessorKey: "website", filterKey: "website", title: "Website" },

      { accessorKey: "contactName", filterKey: "contactName", title: "Contact Name" },
      { accessorKey: "contactEmail", filterKey: "contactEmail", title: "Contact Email" },
      { accessorKey: "contactDesignation", filterKey: "contactDesignation", title: "Contact Designation" },
      { accessorKey: "contactNumber", filterKey: "contactNumber", title: "Contact Number" },
      // { accessorKey: "contactLinkedin", filterKey: "contactLinkedin", title: "Contact LinkedIn" },
      { accessorKey: "format", filterKey: "formatIds", title: "Format" }
    ];

    if (pageKey != "leagueList") {
      columnConfigs.unshift({ accessorKey: "league", filterKey: "leagueIds", title: "League" });
    }

    const optionalFilterKeys: string[] = [];

    Object.keys(filters)?.forEach((d) => {
      // if (!filters[d]?.isMandatory) {
      optionalFilterKeys.push(d);
      // }
    });

    const columnConfigsMapFilter: Array<{
      accessorKey: keyof TSchemaType;
      filterKey: string;
      title: string;
      isMandatory: boolean;
    }> = columnConfigs
      ?.filter((d) => d?.filterKey && optionalFilterKeys.includes(d?.filterKey))
      ?.map((config) => {
        const newObj = { ...config, isMandatory: filters[config?.filterKey]?.isMandatory };
        return newObj;
      });

    const columns: CustomColumnDef<TSchemaType>[] = columnConfigsMapFilter.map((config) =>
      createDynamicColumn<TSchemaType>(
        config.accessorKey as keyof TSchemaType,
        config.filterKey,
        config.title,
        config?.isMandatory
      )
    );

    const optionalColumns: ColumnDef<TSchemaType>[] = columns
      ?.filter((d) => d?.filterKey && optionalFilterKeys.includes(d?.filterKey) && !filters[d?.filterKey]?.isMandatory)
      .map((d) => {
        delete d.filterKey;
        return d;
      });

    const mandatoryColumns: ColumnDef<TSchemaType>[] = columns
      ?.filter((d) => d?.filterKey && optionalFilterKeys.includes(d?.filterKey) && filters[d?.filterKey]?.isMandatory)
      .map((d) => {
        delete d.filterKey;
        return d;
      });

    if (mandatoryColumns?.length) {
      optionalColumns?.unshift(...mandatoryColumns);
    }

    if (filters?.costOfAssociation) {
      let associationValues: TAssociation;
      const associationValueColumn: CustomColumnDef<TSchemaType> = createDynamicColumn<TSchemaType>(
        "associationValues" as keyof TSchemaType,
        "costOfAssociation",
        "Cost Of Association",
        filters["costOfAssociation"]?.isMandatory || false
      );
      (associationValueColumn.header = ({ column }) => <></>),
        (associationValueColumn.cell = ({ row }) => <></>),
        optionalColumns?.unshift(associationValueColumn);

      const costOfAssocitionColumn: CustomColumnDef<TSchemaType> = createDynamicColumn<TSchemaType>(
        "association" as keyof TSchemaType,
        "costOfAssociation",
        "Cost Of Association",
        filters["costOfAssociation"]?.isMandatory || false
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
