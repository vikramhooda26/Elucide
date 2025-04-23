import z from "zod";

export const sportsDealSummaryFormSchema = z.object({
  type: z.string().min(1, "Type is required"),
  status: z.string().optional(),
  levelId: z.string().optional(),
  commencementYear: z.string().optional(),
  expirationDate: z.string().optional(),
  duration: z.string().optional(),
  annualValue: z.string().optional(),
  totalValue: z.string().optional(),
  territoryId: z.string().optional(),
  mediaLink: z.string().optional(),
  assetIds: z.string().array().optional(),
  brandId: z.string().min(1, "Brand is required"),
  leagueId: z.string().optional(),
  teamId: z.string().optional(),
  athleteId: z.string().optional(),
  userId: z.string(),
  partnerType: z.enum(["Athlete", "Team", "League"])
});

export type TSportsDealSummaryFormSchema = z.infer<typeof sportsDealSummaryFormSchema>;

export const SPORTS_DEAL_SUMMARY_KEYS = {
  SPORTS_DEAL_SUMMARY_LEVEL: "sportsDealSummaryLevel",
  SPORTS_DEAL_SUMMARY_STATUS: "sportsDealSummaryStatus",
  SPORTS_DEAL_SUMMARY_TERRITORY: "sportsDealSummaryTerritory",
  SPORTS_DEAL_SUMMARY_TYPE: "sportsDealSummaryType",
  ASSET: "asset",
  BRAND: "brand",
  TEAM: "team",
  ATHLETE: "athlete",
  LEAGUE: "league"
} as const;

export type TEditSportsDealSummaryFormSchema = {
  id?: string;
  brand?: {
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
  team?: {
    id?: string;
    name?: string;
  };
  type?: string;
  status?: string;
  level?: {
    id?: string;
    name?: string;
  };
  commencementDate?: string;
  expirationDate?: string;
  duration?: string;
  annualValue?: string;
  totalValue?: string;
  territory?: {
    id?: string;
    name?: string;
  };
  mediaLink?: string;
  assets?: {
    id?: string;
    name?: string;
  }[];
};
