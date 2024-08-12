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
    associationId: z.string().optional(),
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
            id: z.string().optional(),
            viewership: z.string(),
            year: z.string(),
            viewershipType: z.enum(["OTT", "BROADCAST"]).or(z.string()),
        })
        .array()
        .optional(),
    reachMetrics: z
        .object({
            id: z.string().optional(),
            reach: z.string(),
            year: z.string(),
        })
        .array()
        .optional(),
    contactPerson: z
        .array(
            z.object({
                contactId: z.string().optional(),
                contactName: z.string().optional(),
                contactDesignation: z.string().optional(),
                contactEmail: z.string().optional(),
                contactNumber: z.string().optional(),
                contactLinkedin: z.string().optional(),
            })
        )
        .optional(),
    userId: z.string(),
});

export type TTeamFormSchema = z.infer<typeof teamFormSchema>;

type viewship_type = "OTT" | "BROADCAST";

export type TEditTeamFormSchema = {
    id?: string;
    name?: string;
    owners?: {
        id?: string;
        name?: string;
    }[];
    sport?: {
        id?: string;
        name?: string;
    };
    league?: {
        id?: string;
        name?: string;
    };
    yearOfInception?: string;
    franchiseFee?: string;
    city?: {
        id?: string;
        name?: string;
    };
    state?: {
        id?: string;
        name?: string;
    };
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    strategyOverview?: string;
    taglines?: {
        id?: string;
        name?: string;
    }[];
    endorsements?: {
        id?: string;
        name?: string;
    }[];
    activeCampaigns?: {
        id?: string;
        name?: string;
    }[];
    primaryMarketingPlatform?: {
        id?: string;
        name?: string;
    }[];
    secondaryMarketingPlatform?: {
        id?: string;
        name?: string;
    }[];
    age?: {
        id?: string;
        name?: string;
    }[];
    gender?: {
        id?: string;
        name?: string;
    }[];
    nccs?: {
        id?: string;
        name?: string;
    }[];
    primaryKeyMarket?: {
        id?: string;
        name?: string;
    }[];
    secondaryKeyMarket?: {
        id?: string;
        name?: string;
    }[];
    tertiary?: {
        id?: string;
        name?: string;
    }[];
    associationLevel?: {
        id?: string;
        name?: string;
    };
    costOfAssociation?: string;
    associationId?: string;
    tiers?: {
        id?: string;
        name?: string;
    }[];
    subPersonalityTraits?: {
        id?: string;
        name?: string;
    }[];
    mainPersonalityTraits?: {
        id?: string;
        name?: string;
    }[];
    sportsDealSummary?: {
        annualValue: string;
        assets: {
            id?: string;
            name?: string;
        }[];
        commencementDate: string;
        duration: string;
        expirationDate: string;
        level: {
            id?: string;
            name?: string;
        };
        mediaLink: string;
        athleteName?: {
            id?: string;
            name?: string;
        };
        leagueName?: {
            id?: string;
            name?: string;
        };
        teamName?: {
            id?: string;
            name?: string;
        };
        brandName?: {
            id?: string;
            name?: string;
        };
        status: string;
        territory?: {
            id?: string;
            name?: string;
        };
        totalValue: string;
        type: string;
    }[];
    activationSummary?: {
        asset: {
            id?: string;
            name?: string;
        }[];
        market: {
            id?: string;
            name?: string;
        }[];
        name: string;
        type: {
            id?: string;
            name?: string;
        }[];
        year: string;
        athleteName?: {
            id?: string;
            name?: string;
        };
        leagueName?: {
            id?: string;
            name?: string;
        };
        teamName?: {
            id?: string;
            name?: string;
        };
        brandName?: {
            id?: string;
            name?: string;
        };
    }[];
    contactPersons?: {
        contactId: string;
        contactName: string;
        contactDesignation: string;
        contactEmail: string;
        contactNumber: string;
        contactLinkedin: string;
    }[];
    viewershipMetrics?: {
        id?: string;
        viewership: string;
        viewershipType: viewship_type;
        year: string;
    }[];
    reachMetrics?: {
        id?: string;
        reach: string;
        year: string;
    }[];
};
