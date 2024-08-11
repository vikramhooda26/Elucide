import z from "zod";

export const LEAGUE_METADATA = {
    SPORT: "sport",
    LEAGUE_OWNER: "leagueOwner",
    PERSONALITY_TRAIT: "personalityTrait",
    TIER: "tier",
    ACTIVE_CAMPAIGN: "activeCampaign",
    MARKETING_PLATFORM: "marketingPlatform",
    AGE: "age",
    GENDER: "gender",
    KEY_MARKETS: "keyMarket",
    TERTIARY: "tertiary",
    NCCS: "nccs",
    FORMAT: "format",
    BROADCAST_PARTNER: "broadcastPartner",
    OTT_PARTNER: "ottPartner",
    ASSOCIATION_LEVEL: "associationLevel",
    TAGLINE: "tagline",
} as const;

export const leagueFormSchema = z.object({
    name: z.string().min(1, "Required"),
    sportId: z.string().optional(),
    ownerIds: z.string().array().optional(),
    subPersonalityTraitIds: z.string().array().optional(),
    tierIds: z.string().array().optional(),
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
    yearOfInception: z.string().optional(),
    formatId: z.string().optional(),
    broadCastPartnerId: z.string().optional(),
    ottPartnerId: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    strategyOverview: z.string().optional(),
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
    associationLevelId: z.string().optional(),
    costOfAssociation: z.string().optional(),
    contactPerson: z.array(
        z.object({
            contactName: z.string().optional(),
            contactDesignation: z.string().optional(),
            contactEmail: z.string().optional(),
            contactNumber: z.string().optional(),
            contactLinkedin: z.string().optional(),
        })
    ).optional(),
    userId: z.string(),
});

export type TLeagueFormSchema = z.infer<typeof leagueFormSchema>;
