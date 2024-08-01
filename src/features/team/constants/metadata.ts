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
    teamId: z.string(),
    yearOfInception: z.string().optional(),
    sportId: z.string().optional(),
    leagueId: z.string().optional(),
    teamOwnerIds: z.string().array().optional(),
    franchiseFee: z.number().optional(),
    hqCityId: z.string().optional(),
    hqStateId: z.string().optional(),
    personalityTraitIds: z.string().array().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    tierIds: z.string().array().optional(),
    strategyOverview: z.string().optional(),
    taglineIds: z.string().array().optional(),

    activeCampaignIds: z.string().array().optional(),

    marketingPlatformPrimaryIds: z.string().array().optional(),
    marketingPlatformSecondaryIds: z.string().array().optional(),

    ageIds: z.string().array().optional(),
    genderIds: z.string().array().optional(),

    primaryMarketIds: z.string().array().optional(),
    secondaryMarketIds: z.string().array().optional(),
    tertiaryIds: z.string().array().optional(),

    nccsIds: z.string().array().optional(),
    associationId: z.string().optional(),

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