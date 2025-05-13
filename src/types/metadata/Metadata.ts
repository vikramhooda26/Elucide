import { z } from "zod";

export type activation = {
  id?: string;
  name?: string | null;
  type?: {
    id?: string;
    name?: string;
  }[];
  asset?: {
    id?: string;
    name?: string;
  }[];
  marketIds?: {
    id?: string;
    name?: string;
  }[];
  year?: string | null;
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

export type nameAndId = { id: string; name: string };

export type personality = {
  personalityId: string;
  personalityName: string;
  subpersonalities: [nameAndId];
};

export type subPersonality = {
  id: string;
  subpersonalityName: string;
  personality: nameAndId;
};

export type sportsDealSummary = {
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

export type ageRange = {
  ageRangeId: string;
  ageRange: string;
};

export type mainCategory = {
  categoryId: string;
  categoryName: string;
  subcategories: [nameAndId];
};

export type subCategory = {
  subcategoryId: string;
  subcategoryName: string;
  category: nameAndId;
};

export type contactPersons = {
  contactId: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  contactLinkedin: string;
  contactNumber: number;
};

export const ALL_METADATA = {
  AGE: "age",
  GENDER: "gender",
  CITY: "city",
  STATE: "state",
  ACTIVE_CAMPAIGN: "activeCampaign",
  AGENCY: "agency",
  ASSET: "asset",
  BROADCAST_PARTNER: "broadcastPartner",

  MAINCATEGORY: "maincategory",
  CATEGORY: "category",
  MAINPERSONALITY: "mainpersonality",
  PERSONALITY_TRAIT: "personalityTrait",

  FORMAT: "format",
  KEY_MARKET: "keyMarket",
  LEAGUE: "league",
  LEAGUE_OWNER: "leagueOwner",
  MARKETING_PLATFORM: "marketingPlatform",
  NCCS: "nccs",
  OTT_PARTNER: "ottPartner",
  PARENT_ORG: "parentOrg",

  SPORTS_DEAL_SUMMARY_LEVEL: "sportsDealSummaryLevel",
  SPORTS_DEAL_SUMMARY_STATUS: "sportsDealSummaryStatus",
  SPORTS_DEAL_SUMMARY_TERRITORY: "sportsDealSummaryTerritory",
  SPORTS_DEAL_SUMMARY_TYPE: "sportsDealSummaryType",
  TAGLINE: "tagline",
  TEAM_OWNER: "teamOwner",
  TERTIARY: "tertiary",
  SPORT: "sport",
  TIER: "tier",
  ASSOCIATION_LEVEL: "associationLevel",
  NATIONALITY: "nationality",
  SOCIAL_MEDIA: "socialMedia",
  ATHLETE_STATUS: "athleteStatus",
  TEAM: "team",
  ATHLETE: "athlete",
  BRAND: "brand"
} as const;

export const allColumnsSchema = () =>
  z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    league: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    // Athlete-specific fields
    athleteAge: z.string().optional(),
    athleteGender: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    format: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    nationality: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),

    city: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    team: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    // Association-specific fields
    association: z
      .array(
        z.object({
          associationId: z.string().optional(),
          associationLevel: z
            .object({
              id: z.string().optional(),
              name: z.string().optional()
            })
            .optional(),
          costOfAssociation: z.string().optional()
        })
      )
      .optional(),
    associationValues: z
      .array(
        z.object({
          associationId: z.string().optional(),
          associationLevel: z
            .object({
              id: z.string().optional(),
              name: z.string().optional()
            })
            .optional(),
          costOfAssociation: z.string().optional()
        })
      )
      .optional(),

    // Brand-specific fields
    parentOrg: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    mainCategories: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          subCategories: z
            .array(
              z.object({
                id: z.string().optional(),
                name: z.string().optional()
              })
            )
            .optional()
        })
      )
      .optional(),
    subCategories: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    // League-specific fields
    owners: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    yearOfInception: z.string().optional(),
    ottPartnerMetrics: z
      .array(
        z.object({
          id: z.string(),
          viewership: z.string(),
          reach: z.string(),
          year: z.string(),
          ottPartner: z.object({
            id: z.string(),
            name: z.string()
          })
        })
      )
      .optional(),
    broadcastPartnerMetrics: z
      .array(
        z.object({
          id: z.string(),
          reach: z.string(),
          viewership: z.string(),
          year: z.string(),
          broadcastPartner: z.object({
            id: z.string(),
            name: z.string()
          })
        })
      )
      .optional(),

    // Team-specific fields
    franchiseFee: z.string().optional(),

    // Common fields
    taglines: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    sport: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    agency: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    strategyOverview: z.string().optional(),
    primaryKeyMarket: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    secondaryKeyMarket: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    tertiary: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    primaryMarketingPlatform: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    secondaryMarketingPlatform: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    tiers: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    age: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    mainPersonalityTraits: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          subPersonalityTraits: z
            .array(
              z.object({
                id: z.string().optional(),
                name: z.string().optional()
              })
            )
            .optional()
        })
      )
      .optional(),

    contactPersons: z
      .array(
        z.object({
          contactId: z.string(),
          contactName: z.string(),
          contactEmail: z.string().optional(),
          contactLinkedin: z.string().optional(),
          contactNumber: z.string().optional(),
          contactDesignation: z.string().optional()
        })
      )
      .optional(),
    gender: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    nccs: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    status: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    state: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    activeCampaigns: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    marketplaceLink: z.string().optional(),
    documents: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
          type: z.string(),
          link: z.string()
        })
      )
      .optional(),
    endorsement: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
          active: z.boolean()
        })
      )
      .optional(),
    endorsements: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
          active: z.boolean()
        })
      )
      .optional(),
    //= ================= custom keys ======================= =//
    ottPartner: z
      .object({
        id: z.string(),
        name: z.string()
      })
      .optional(),
    subPersonalityTraits: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional()
        })
      )
      .optional(),
    associationLevel: z
      .object({
        id: z.string().optional(),
        name: z.string().optional()
      })
      .optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().optional(),
    contactDesignation: z.string().optional(),
    contactNumber: z.string().optional(),
    contactLinkedin: z.string().optional(),

    reachMetrics: z.string().optional(),
    viewershipMetrics: z.string().optional(),
    yearMetrics: z.string().optional(),
    partnerIdMetrics: z.string().optional(),
    leagueOwners: z.string().optional()
  });

export type AllColumns = z.infer<ReturnType<typeof allColumnsSchema>>;

export const matched = "Data Matched";
export const notMatched = "Not Matched";

export type TMatrics = {
  id: string;
  viewership: string;
  reach: string;
  year: string;
  ottPartner?: {
    id: string;
    name: string;
  };
  broadcastPartner?: {
    id: string;
    name: string;
  };
};
