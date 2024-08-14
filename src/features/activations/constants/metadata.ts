import z from "zod";

const partnerType = ["Athlete", "Team", "League"] as const;
export type TPartnerType = (typeof partnerType)[number];

export const activationFormSchema = z.object({
    userId: z.string(),
    name: z.string(),
    leagueId: z.string().optional(),
    teamId: z.string().optional(),
    athleteId: z.string().optional(),
    brandId: z.string(),
    typeIds: z.string().array().optional(),
    marketIds: z.string().array().optional(),
    assetIds: z.string().array().optional(),
    year: z.string().optional(),
    partnerType: z.enum(partnerType),
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

export type TEditActivationFormSchema = {
    id?: string;
    name?: string;
    type?: {
        id?: string;
        name?: string;
    }[];
    marketIds?: {
        id?: string;
        name?: string;
    }[];
    asset?: {
        id?: string;
        name?: string;
    }[];
    year?: string;
    team?: {
        id?: string;
        name?: string;
    };
    athlete?: {
        id?: string;
        name?: string;
    };
    league?: {
        id?: string;
        name?: string;
    };
    brand?: {
        id?: string;
        name?: string;
    };
};
