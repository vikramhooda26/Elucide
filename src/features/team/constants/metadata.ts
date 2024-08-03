import { z } from "zod";

export const TEAM_METADATA = {
    SPORT: "sport",
    LEAGUE: "league",
    LEAGUE_OWNER: "leagueOwner",
    CITY: "city",
    STATE: "state",
    PERSONALITY_TRAIT: "personalityTrait",
    TIER: "tier",
    TAGLINE: "tagline",
    ACTIVE_CAMPAIGN: "activeCampaign",
    MARKETING_PLATFORM: "marketingPlatform",
    AGE: "age",
    GENDER: "gender",
    NCCS: "nccs",
    KEY_MARKETS: "keyMarket",
    TERTIARY: "tertiary",
    ASSET: "asset",
    ASSOCIATION_LEVEL: "associationLevel",
} as const;


// team create 
export const teamFormSchema = z.object({
    teamName: z.string(),
    teamId: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    yearOfInception: z.string().optional(),
    sportId: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    leagueId: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    teamOwnerIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    franchiseFee: z.string().optional(),
    hqCityId: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    hqStateId: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    personalityTraitIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    tierIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    strategyOverview: z.string().optional(),
    taglineIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),

    activeCampaignIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),

    marketingPlatformPrimaryIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    marketingPlatformSecondaryIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),

    ageIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    genderIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),

    primaryMarketIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    secondaryMarketIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    tertiaryIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),

    nccsIds: z.object({
        value: z.string(),
        labele: z.string(),
    }).array().optional(),
    associationLevelId: z.object({
        value: z.string(),
        labele: z.string(),
    }).optional(),
    associationCost:z.string(),

    metrics: z
        .object({
            viewership: z.string().optional(),
            reach: z.string().optional(),
            year: z.string().optional(),
            viewshipType: z.enum(["OTT", "BROADCAST"]).optional(),
        })
        .array()
        .optional(),
});