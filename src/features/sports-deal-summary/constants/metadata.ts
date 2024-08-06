import z from "zod";

export const sportsDealSummaryFormSchema = z.object({
    typeId: z.string(),
    statusId: z.string().optional(),
    levelId: z.string().optional(),
    commencementYear: z.string().optional(),
    expirationDate: z.string().optional(),
    duration: z.string().optional(),
    annualValue: z.string().optional(),
    totalValue: z.string().optional(),
    territoryId: z.string().optional(),
    mediaLink: z.string().optional(),
    assetIds: z.string().array().optional(),
    brandId: z.string(),
    leagueId: z.string().optional(),
    teamId: z.string().optional(),
    athleteId: z.string().optional(),
    userId: z.string(),
    partnerType: z.enum(["Athlete", "Team", "League"]),
});

export type TSportsDealSummaryFormSchema = z.infer<
    typeof sportsDealSummaryFormSchema
>;

export const SPORTS_DEAL_SUMMARY_KEYS = {
    SPORTS_DEAL_SUMMARY_LEVEL: "sportsDealSummaryLevel",
    SPORTS_DEAL_SUMMARY_STATUS: "sportsDealSummaryStatus",
    SPORTS_DEAL_SUMMARY_TERRITORY: "sportsDealSummaryTerritory",
    SPORTS_DEAL_SUMMARY_TYPE: "sportsDealSummaryType",
    ASSET: "asset",
    BRAND: "brand",
    TEAM: "team",
    ATHLETE: "athlete",
    LEAGUE: "league",
} as const;
