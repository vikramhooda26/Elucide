import z from "zod";

export const activationFormSchema = z.object({
    userId: z.string(),
    activationName: z.string(),
    leagueId: z.string().optional(),
    teamId: z.string().optional(),
    athleteId: z.string().optional(),
    brandId: z.string(),
    typeIds: z.string().array().optional(),
    marketIds: z.string().array().optional(),
    assetIds: z.string().array().optional(),
    year: z.string().optional(),
    partnerType: z.enum(["Athlete", "Team", "League"]),
});

export type TActivationFormSchema = z.infer<typeof activationFormSchema>;

export const ACTIVATION_KEYS = {
    LEAGUE: "league",
    TEAM: "team",
    ATHLETE: "athlete",
    BRAND: "brand",
    MARKETING_PLATFORM: "marketingPlatform", // this is the activation type
    STATE: "state", // this is the activation market
    ASSET: "asset",
} as const;
