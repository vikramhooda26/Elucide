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

export const teamFormSchema = z.object({
    name: z.string(),
    yearOfInception: z.string().optional(),
    sportId: z.string().optional(),
    leagueId: z.string().optional(),

    ownerIds: z.string().array().optional(),
    franchiseFee: z.string().optional(),
    cityId: z.string().optional(),
    stateId: z.string().optional(),
    subPersonalityTraitIds: z.string().array().optional(),
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

    primaryMarketingPlatformIds: z.string().array().optional(),
    secondaryMarketingPlatformIds: z.string().array().optional(),

    ageIds: z.string().array().optional(),
    genderIds: z.string().array().optional(),

    primaryMarketIds: z.string().array().optional(),
    secondaryMarketIds: z.string().array().optional(),
    tertiaryIds: z.string().array().optional(),

    nccsIds: z.string().array().optional(),
    associationLevelId: z.string().optional(),
    costOfAssociation: z.string().optional(),
    viewershipMetrics: z
        .object({
            viewership: z.string(),
            year: z.string(),
            viewershipType: z.enum(["OTT", "BROADCAST"]).or(z.string()),
        })
        .array()
        .optional(),
    reachMetrics: z
        .object({
            reach: z.string(),
            year: z.string(),
        })
        .array()
        .optional(),
    contactName: z.string().optional(),
    contactDesignation: z.string().optional(),
    contactEmail: z.string().optional(),
    contactNumber: z.string().optional(),
    contactLinkedin: z.string().optional(),
    userId: z.string(),
});

export type TTeamFormSchema = z.infer<typeof teamFormSchema>;
