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
    TAGLINE: "tagline"
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
            id: z.string().optional(),
            viewership: z.string(),
            year: z.string(),
            viewershipType: z.enum(["OTT", "BROADCAST"]).or(z.string())
        })
        .array()
        .optional(),
    reachMetrics: z
        .object({
            id: z.string().optional(),
            reach: z.string(),
            year: z.string()
        })
        .array()
        .optional(),
    association: z
        .object({
            associationId: z.string().optional(),
            associationLevelId: z.string().optional(),
            costOfAssociation: z.string().optional()
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
                contactLinkedin: z.string().optional()
            })
        )
        .optional(),
    userId: z.string()
});

export type TLeagueFormSchema = z.infer<typeof leagueFormSchema>;

type viewship_type = "OTT" | "BROADCAST";

export type TEditLeagueFormSchema = {
    id?: string;
    name?: string;
    sport?: {
        id?: string;
        name?: string;
    };
    owners?: {
        id?: string;
        name?: string;
    }[];
    createdBy?: {
        id?: string;
        name?: string;
    };
    modifiedBy?: {
        id?: string;
        name?: string;
    };
    createdDate?: string;
    modifiedDate?: string;
    yearOfInception?: string;
    broadcastPartner?: {
        id?: string;
        name?: string;
    };
    ottPartner?: {
        id?: string;
        name?: string;
    };
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    twitter?: string;
    strategyOverview?: string;
    taglines?: {
        id?: string;
        name?: string;
    }[];
    activeCampaigns?: {
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
    primaryMarketingPlatform?: {
        id?: string;
        name?: string;
    }[];
    secondaryMarketingPlatform?: {
        id?: string;
        name?: string;
    }[];
    association?: {
        associationId?: string;
        associationLevel?: {
            id?: string;
            name?: string;
        };
        costOfAssociation?: string;
    }[];
    tiers?: {
        id?: string;
        name?: string;
    }[];
    subPersonalityTriats?: {
        id?: string;
        name?: string;
    }[];
    mainPersonalityTraits?: {
        id?: string;
        name?: string;
    }[];
    team?: {
        id?: string;
        name?: string;
    }[];
    gender?: {
        id?: string;
        name?: string;
    }[];
    endorsements?: {
        id?: string;
        name?: string;
    }[];
    format?: {
        id?: string;
        name?: string;
    };
    age?: {
        id?: string;
        name?: string;
    }[];
    nccs?: {
        id?: string;
        name?: string;
    }[];
    sportsDealSummary?: {
        id?: string;
        annualValue?: string;
        totalValue?: string;
        assets?: {
            id?: string;
            name?: string;
        }[];
        commencementDate?: string;
        expirationDate?: string;
        duration?: string;
        territory?: {
            id?: string;
            name?: string;
        };
        mediaLink?: string;
        level?: {
            id?: string;
            name?: string;
        };
        status?: string;
        type?: string;
        brandName?: {
            id?: string;
            name?: string;
        };
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
    }[];
    activations?: {
        id?: string;
        year?: string;
        name?: string;
        type?: {
            id?: string;
            name?: string;
        }[];
        assets?: {
            id?: string;
            name?: string;
        }[];
        market?: {
            id?: string;
            name?: string;
        }[];
        brandName?: {
            id?: string;
            name?: string;
        };
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
    }[];
    contactPersons?: {
        contactId: string;
        contactName: string;
        contactEmail?: string;
        contactLinkedin?: string;
        contactNumber?: string;
        contactDesignation?: string;
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
