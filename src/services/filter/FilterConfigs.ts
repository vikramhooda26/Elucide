import { useRecoilState, useRecoilValue } from "recoil";
import useMetadataStore from "../../hooks/useMetadataStore";
import { filterState } from "../../store/atoms/filterAtom";
import { FilterContent } from "../../components/core/filter/FilterModal";
import { getListOfYears } from "../../features/utils/helpers";

export const pageKeys = ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"];

export interface FilterConfig extends FilterContent {
    pageKeys: typeof pageKeys;
}

export type TPageKey = (typeof pageKeys)[number];

export function fetchFilters(pageKey: TPageKey) {
    const filterConfig: FilterConfig[] = getFilters(pageKey);

    const allowedFilters: FilterContent[] = filterConfig
        ?.filter((d) => d?.pageKeys?.some((d) => d === pageKey))
        ?.map(({ pageKeys, ...rest }) => rest);

    return allowedFilters;
}

function getFilters(pageKey: TPageKey) {
    const filterValues = useRecoilValue(filterState);
    const metadataStore: { [key: string]: any } | null = useMetadataStore();

    const filterConfig: FilterConfig[] = [
        //= ===================== Main stakes list filter starts here ======================== =//
        {
            displayName: "Brand",
            key: "brandIds",
            type: "select",
            value: filterValues?.[pageKey]?.brandIds?.value || "",
            options: metadataStore?.brand,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList"]
        },
        {
            displayName: "Team",
            key: "teamIds",
            type: "select",
            value: filterValues?.[pageKey]?.teamIds?.value || "",
            options: metadataStore?.team,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["teamList"]
        },
        {
            displayName: "League",
            key: "leagueIds",
            type: "select",
            value: filterValues?.[pageKey]?.leagueIds?.value || "",
            options: metadataStore?.league,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["leagueList", "teamList"]
        },
        {
            displayName: "Athlete",
            key: "athleteIds",
            type: "select",
            value: filterValues?.[pageKey]?.athleteIds?.value || "",
            options: metadataStore?.athlete,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },
        //= ===================== Main stakes list filter ends here ======================== =//

        {
            displayName: "Athlete Status",
            key: "athleteStatusIds",
            type: "select",
            value: filterValues?.[pageKey]?.athleteStatusIds?.value || "",
            options: metadataStore?.athleteStatus,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },

        {
            displayName: "Age",
            subTitle: { title1: "Age Range" },
            key: "athleteAge",
            type: "singleRange",
            value:
                Object.keys(filterValues[pageKey]?.athleteAge?.value || {})?.length > 0
                    ? filterValues[pageKey]?.athleteAge?.value
                    : { value: [0, 0], operationType: "in" },
            singleRange: { min: 0, max: 100 },
            isMandatory: false,
            step: 1,
            pageKeys: ["athleteList"]
        },

        {
            displayName: "Athlete Gender",
            key: "athleteGenderIds",
            type: "select",
            value: filterValues?.[pageKey]?.athleteGenderIds?.value || "",
            options: metadataStore?.gender,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },

        {
            displayName: "Cost Of Association",
            subTitle: { title1: "In Crore", title2: "In Lakhs" },
            key: "costOfAssociation",
            type: "doubleRange",
            value:
                Object.keys(filterValues[pageKey]?.costOfAssociation?.value || {})?.length > 0
                    ? filterValues[pageKey]?.costOfAssociation?.value
                    : { value1: [0, 0], value2: [0, 0], operationType: "in" },
            doubleRange: { min: { min1: 0, min2: 0 }, max: { max1: 100, max2: 90 } },
            isMandatory: false,
            steps: { step1: 1, step2: 10 },
            pageKeys: ["leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Target Age",
            key: "ageIds",
            type: "select",
            value: filterValues?.[pageKey]?.ageIds?.value || "",
            options: metadataStore?.age,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },

        {
            displayName: "Target Gender",
            key: "genderIds",
            type: "select",
            value: filterValues?.[pageKey]?.genderIds?.value || "",
            options: metadataStore?.gender,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },

        {
            displayName: "City",
            key: "cityIds",
            type: "select",
            value: filterValues?.[pageKey]?.cityIds?.value || "",
            options: metadataStore?.city,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "teamList"]
        },
        {
            displayName: "State",
            key: "stateIds",
            type: "select",
            value: filterValues?.[pageKey]?.stateIds?.value || "",
            options: metadataStore?.state,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList", "teamList", "brandList"]
        },
        {
            displayName: "Active Campaign",
            key: "activeCampaignIds",
            type: "select",
            value: filterValues?.[pageKey]?.activeCampaignIds?.value || "",
            options: metadataStore?.activeCampaign,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList"]
        },
        {
            displayName: "Agency",
            key: "agencyIds",
            type: "select",
            value: filterValues?.[pageKey]?.agencyIds?.value || "",
            options: metadataStore?.agency,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList", "teamList", "brandList"]
        },
        {
            displayName: "Asset",
            key: "assetIds",
            type: "select",
            value: filterValues?.[pageKey]?.assetIds?.value || "",
            options: metadataStore?.asset,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["teamList"]
        },
        {
            displayName: "Broadcast Partner",
            key: "broadcastPartnerIds",
            type: "select",
            value: filterValues?.[pageKey]?.broadcastPartnerIds?.value || "",
            options: metadataStore?.broadcastPartner,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["leagueList"]
        },

        {
            displayName: "Main Category",
            key: "maincategoryIds",
            type: "select",
            value: filterValues?.[pageKey]?.maincategoryIds?.value || "",
            options: metadataStore?.maincategory,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList"]
        },
        {
            displayName: "Sub Category",
            key: "subCategoryIds",
            type: "select",
            value: filterValues?.[pageKey]?.subCategoryIds?.value || "",
            options: metadataStore?.category,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList"]
        },

        {
            displayName: "Format",
            key: "formatIds",
            type: "select",
            value: filterValues?.[pageKey]?.formatIds?.value || "",
            options: metadataStore?.format,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["leagueList"]
        },

        //= ============== Marketing filters starts here ======================== =//
        {
            displayName: "Primary Market",
            key: "primaryMarketIds",
            type: "select",
            value: filterValues?.[pageKey]?.primaryMarketIds?.value || "",
            options: metadataStore?.keyMarket,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Secondary Market",
            key: "secondaryMarketIds",
            type: "select",
            value: filterValues?.[pageKey]?.secondaryMarketIds?.value || "",
            options: metadataStore?.keyMarket,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },

        {
            displayName: "Tertiary Market",
            key: "tertiaryIds",
            type: "select",
            value: filterValues?.[pageKey]?.tertiaryIds?.value || "",
            options: metadataStore?.state,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },

        //= ============== Marketing filters ends here ======================== =//

        //= ============== Marketing Platform filters Strats here ======================== =//
        {
            displayName: "Primary Marketing Platform",
            key: "primaryMarketingPlatformIds",
            type: "select",
            value: filterValues?.[pageKey]?.primaryMarketingPlatformIds?.value || "",
            options: metadataStore?.marketingPlatform,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList"]
        },
        {
            displayName: "Secodary Marketing Platform",
            key: "secondaryMarketingPlatformIds",
            type: "select",
            value: filterValues?.[pageKey]?.secondaryMarketingPlatformIds?.value || "",
            options: metadataStore?.marketingPlatform,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList"]
        },

        //= ============== Athlete Marketing Platform filters ends here ======================== =//
        {
            displayName: "Primary Marketing Platform",
            key: "primarySocialMediaPlatformIds",
            type: "select",
            value: filterValues?.[pageKey]?.primarySocialMediaPlatformIds?.value || "",
            options: metadataStore?.socialMedia,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },
        {
            displayName: "Secondary Marketing Platform",
            key: "secondarySocialMediaPlatformIds",
            type: "select",
            value: filterValues?.[pageKey]?.secondarySocialMediaPlatformIds?.value || "",
            options: metadataStore?.socialMedia,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },
        //= ============== Athlete Marketing Platform filters ends here ======================== =//
        //= ============== Marketing Platform filters ends here ======================== =//

        {
            displayName: "Year Of Inception",
            key: "yearOfInception",
            type: "select",
            value: filterValues?.[pageKey]?.yearOfInception?.value || "",
            options: getListOfYears(),
            isMultiple: false,
            isMandatory: false,
            pageKeys: ["teamList", "leagueList"]
        },
        {
            displayName: "Franchise Fee",
            key: "franchiseFee",
            type: "text",
            value: filterValues[pageKey]?.franchiseFee?.value || "",
            isMandatory: false,
            pageKeys: ["teamList"]
        },

        {
            displayName: "League Owner",
            key: "leagueOwnerIds",
            type: "select",
            value: filterValues?.[pageKey]?.leagueOwnerIds?.value || "",
            options: metadataStore?.leagueOwner,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["leagueList"]
        },

        {
            displayName: "NCCS Levels",
            key: "nccsIds",
            type: "select",
            value: filterValues?.[pageKey]?.nccsIds?.value || "",
            options: metadataStore?.nccs,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "OTT Partner",
            key: "ottPartnerIds",
            type: "select",
            value: filterValues?.[pageKey]?.ottPartnerIds?.value || "",
            options: metadataStore?.ottPartner,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["leagueList"]
        },
        {
            displayName: "Parent Organization",
            key: "parentOrgIds",
            type: "select",
            value: filterValues?.[pageKey]?.parentOrgIds?.value || "",
            options: metadataStore?.parentOrg,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList"]
        },

        {
            displayName: "Main Personality",
            key: "mainpersonalityIds",
            type: "select",
            value: filterValues?.[pageKey]?.mainpersonalityIds?.value || "",
            options: metadataStore?.mainpersonality,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList"]
        },
        {
            displayName: "Sub Personality Trait",
            key: "subPersonalityTraitIds",
            type: "select",
            value: filterValues?.[pageKey]?.subPersonalityTraitIds?.value || "",
            options: metadataStore?.personalityTrait,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },

        // {
        //     displayName: "Sports Deal Summary Level",
        //     key: "sportsDealSummaryLevelIds",
        //     type: "select",
        //     value: filterValues?.[pageKey]?.sportsDealSummaryLevelIds?.value || "",
        //     options: metadataStore?.sportsDealSummaryLevel,
        //     isMultiple: true,
        //     isMandatory: false,
        //     pageKeys: ["teamList"]
        // },
        // {
        //     displayName: "Sports Deal Summary Status",
        //     key: "sportsDealSummaryStatusIds",
        //     type: "select",
        //     value: filterValues?.[pageKey]?.sportsDealSummaryStatusIds?.value || "",
        //     options: metadataStore?.sportsDealSummaryStatus,
        //     isMultiple: true,
        //     isMandatory: false,
        //     pageKeys: ["teamList"]
        // },
        // {
        //     displayName: "Sports Deal Summary Territory",
        //     key: "sportsDealSummaryTerritoryIds",
        //     type: "select",
        //     value: filterValues?.[pageKey]?.sportsDealSummaryTerritoryIds?.value || "",
        //     options: metadataStore?.sportsDealSummaryTerritory,
        //     isMultiple: true,
        //     isMandatory: false,
        //     pageKeys: ["teamList"]
        // },
        // {
        //     displayName: "Sports Deal Summary Type",
        //     key: "sportsDealSummaryTypeIds",
        //     type: "select",
        //     value: filterValues?.[pageKey]?.sportsDealSummaryTypeIds?.value || "",
        //     options: metadataStore?.sportsDealSummaryType,
        //     isMultiple: true,
        //     isMandatory: false,
        //     pageKeys: ["teamList"]
        // },
        {
            displayName: "Tagline",
            key: "taglineIds",
            type: "select",
            value: filterValues?.[pageKey]?.taglineIds?.value || "",
            options: metadataStore?.tagline,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList"]
        },
        {
            displayName: "Team Owner",
            key: "teamOwnerIds",
            type: "select",
            value: filterValues?.[pageKey]?.teamOwnerIds?.value || "",
            options: metadataStore?.teamOwner,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["teamList"]
        },

        {
            displayName: "Sport",
            key: "sportIds",
            type: "select",
            value: filterValues?.[pageKey]?.sportIds?.value || "",
            options: metadataStore?.sport,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "athleteList", "teamList", "allStakeList"]
        },
        {
            displayName: "Tier",
            key: "tierIds",
            type: "select",
            value: filterValues?.[pageKey]?.tierIds?.value || "",
            options: metadataStore?.tier,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Association Level",
            key: "associationLevelIds",
            type: "select",
            value: filterValues?.[pageKey]?.associationLevelIds?.value || "",
            options: metadataStore?.associationLevel,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList", "teamList", "leagueList", "allStakeList"]
        },
        {
            displayName: "Nationality",
            key: "nationalityIds",
            type: "select",
            value: filterValues?.[pageKey]?.nationalityIds?.value || "",
            options: metadataStore?.nationality,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },
        {
            displayName: "Social Media",
            key: "socialMediaIds",
            type: "select",
            value: filterValues?.[pageKey]?.socialMediaIds?.value || "",
            options: metadataStore?.socialMedia,
            isMultiple: true,
            isMandatory: false,
            pageKeys: ["athleteList"]
        },

        //= ====================== Social Media Filters Starts ============================ =//
        {
            displayName: "Strategy Overview",
            key: "strategyOverview",
            type: "text",
            value: filterValues[pageKey]?.strategyOverview?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search Facebook",
            key: "facebook",
            type: "text",
            value: filterValues[pageKey]?.facebook?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search Instagram",
            key: "instagram",
            type: "text",
            value: filterValues[pageKey]?.instagram?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search Twitter",
            key: "twitter",
            type: "text",
            value: filterValues[pageKey]?.twitter?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search LinkedIn",
            key: "linkedin",
            type: "text",
            value: filterValues[pageKey]?.linkedin?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search Youtube",
            key: "youtube",
            type: "text",
            value: filterValues[pageKey]?.youtube?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Search Website",
            key: "website",
            type: "text",
            value: filterValues[pageKey]?.website?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        //= ====================== Social Media Filters Ends ============================ =//

        //= ====================== Contact Person Filters Starts ============================ =//
        {
            displayName: "Contact Name",
            key: "contactName",
            type: "text",
            value: filterValues[pageKey]?.contactName?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Contact Designation",
            key: "contactDesignation",
            type: "text",
            value: filterValues[pageKey]?.contactDesignation?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Contact Email",
            key: "contactEmail",
            type: "text",
            value: filterValues[pageKey]?.contactEmail?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Contact Number",
            key: "contactNumber",
            type: "text",
            value: filterValues[pageKey]?.contactNumber?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        {
            displayName: "Contact LinkedIn",
            key: "contactLinkedin",
            type: "text",
            value: filterValues[pageKey]?.contactLinkedin?.value || "",
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList", "athleteList", "allStakeList"]
        },
        //= ====================== Contact Person Filters Ends ============================ =//

        // need to do. ============================
        {
            displayName: "Reach",
            subTitle: { title1: "In Million", title2: "In Thousands", title3: "Partner Type" },
            key: "reachMetrics",
            type: "doubleRangeWithCheck",
            value:
                Object.keys(filterValues[pageKey]?.reachMetrics?.value || {})?.length > 0
                    ? filterValues[pageKey]?.reachMetrics?.value
                    : { value1: [0, 0], value2: [0, 0], operationType: "in", checkType: "ott" },
            doubleRange: { min: { min1: 0, min2: 0 }, max: { max1: 100, max2: 950 } },
            isMandatory: false,
            steps: { step1: 10, step2: 50 },
            pageKeys: ["leagueList", "teamList"]
        },
        {
            displayName: "Viewership",
            subTitle: { title1: "In Million", title2: "In Thousands", title3: "Partner Type" },
            key: "viewershipMetrics",
            type: "doubleRangeWithCheck",
            value:
                Object.keys(filterValues[pageKey]?.viewershipMetrics?.value || {})?.length > 0
                    ? filterValues[pageKey]?.viewershipMetrics?.value
                    : { value1: [0, 0], value2: [0, 0], operationType: "in", checkType: "ott" },
            doubleRange: { min: { min1: 0, min2: 0 }, max: { max1: 100, max2: 950 } },
            isMandatory: false,
            steps: { step1: 10, step2: 50 },
            pageKeys: ["leagueList", "teamList"]
        },
        {
            displayName: "Year",
            subTitle: { title1: "In Million", title2: "In Thousands", title3: "Partner Type" },
            key: "yearMetrics",
            type: "doubleRangeWithCheck",
            value:
                Object.keys(filterValues[pageKey]?.yearMetrics?.value || {})?.length > 0
                    ? filterValues[pageKey]?.yearMetrics?.value
                    : { value1: [0, 0], value2: [0, 0], operationType: "in", checkType: "ott" },
            doubleRange: { min: { min1: 0, min2: 0 }, max: { max1: 10, max2: 950 } },
            isMandatory: false,
            steps: { step1: 1, step2: 50 },
            pageKeys: ["leagueList", "teamList"]
        },

        {
            displayName: "Partners",
            key: "partnerIdMetrics",
            type: "conditionalDropDown",
            value: filterValues[pageKey]?.partnerIdMetrics?.value || { value: [], checkType: "ott" },
            isMandatory: false,
            options: [
                { label: "OTT", value: "ott" },
                { label: "Broadcast", value: "broadcast" }
            ],
            isMultiple: true,
            conditionalDropDowns: {
                ott: metadataStore?.ottPartner || [],
                broadcast: metadataStore?.broadcastPartner || []
            },
            subTitle: { title1: "Partner Type", title2: "Partners" },
            pageKeys: ["teamList", "leagueList"]
        },

        {
            displayName: "Endorsement",
            key: "endorsement",
            type: "conditionalText",
            value: filterValues[pageKey]?.endorsement?.value || "",
            subTitle: { title1: "Active" },
            isMandatory: false,
            pageKeys: ["brandList", "leagueList", "teamList"]
        }
        // need to do. ========================
    ];

    return filterConfig;
}

// {
//     displayName: 'Search Brand',
//     key: 'search',
//     type: 'text',
//     value: filterValues[pageKey]?.search?.value || '',
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Category',
//     key: 'category',
//     type: 'select',
//     value: filterValues[pageKey]?.category?.value || '',
//     options: [
//         { label: 'Electronics', value: 'electronics' },
//         { label: 'Clothing', value: 'clothing' },
//         { label: 'Books', value: 'books' },
//     ],
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Category',
//     key: 'category',
//     type: 'select',
//     value: filterValues[pageKey]?.category?.value || '',
//     options: [
//         { label: 'Electronics', value: 'electronics' },
//         { label: 'Clothing', value: 'clothing' },
//         { label: 'Books', value: 'books' },
//     ],
//     isMultiple: true,
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Date Filter',
//     key: 'dateAdded',
//     type: 'dateRange',
//     value: filterValues[pageKey]?.dateAdded?.value || { start: '', end: '' },
//     range: { start: '2024-01-01', end: '2024-12-31' },
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Age Range',
//     key: 'ageRange',
//     type: 'range',
//     value: filterValues[pageKey]?.price?.value || [0, 1000],
//     range: { min: 0, max: 1000 },
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Target Gender',
//     key: 'gender',
//     type: 'check',
//     value: filterValues[pageKey]?.gender?.value || false,
//     options: [
//         { label: 'Male', value: 'Male' },
//         { label: 'Female', value: 'Female' },
//         { label: 'Transgender', value: 'Transgender' },
//     ],
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'NCCS',
//     key: 'nccs',
//     type: 'multicheck',
//     value: filterValues[pageKey]?.nccs?.value || [],
//     options: [
//         { label: 'NCCS A', value: 'nccs_a' },
//         { label: 'NCCS B', value: 'nccs_b' },
//         { label: 'NCCS C', value: 'nccs_c' },
//     ],
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
// {
//     displayName: 'Enable Feature',
//     key: 'featureToggle',
//     type: 'toggle',
//     value: filterValues[pageKey]?.featureToggle?.value || false,
//     isMandatory: false,
//     pageKeys: ['athleteList', 'teamList', 'brandList', 'leagueList'],
// },
