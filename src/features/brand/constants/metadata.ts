import z from "zod";

export const BRAND_METADATA = {
    PARENT_ORG: "parentOrg",
    CATEGORY: "category",
    CITY: "city",
    STATE: "state",
    AGENCY: "agency",
    TIER: "tier",
    PERSONALITY_TRAIT: "personalityTrait",
    TAGLINE: "tagline",
    NCCS: "nccs",
    MARKETING_PLATFORM: "marketingPlatform",
    AGE: "age",
    GENDER: "gender",
    TERTIARY: "tertiary",
    ACTIVE_CAMPAIGN: "activeCampaign",
    KEY_MARKETS: "keyMarket",
} as const;

export const brandFormSchema = z.object({
    name: z.string(),
    userId: z.string(),
    parentOrgId: z.string().optional(),
    subCategoryIds: z.string().array().optional(),
    cityId: z.string().optional(),
    stateId: z.string().optional(),
    agencyId: z.string().optional(),
    tierIds: z.string().array().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    subPersonalityTraitIds: z.string().array().optional(),
    strategyOverview: z.string().optional(),
    taglineIds: z.string().array().optional(),
    activeCampaignIds: z.string().array().optional(),
    primaryMarketIds: z.string().array().optional(),
    secondaryMarketIds: z.string().array().optional(),
    tertiaryIds: z.string().array().optional(),
    nccsIds: z.string().array().optional(),
    primaryMarketingPlatformIds: z.string().array().optional(),
    secondaryMarketingPlatformIds: z.string().array().optional(),
    ageIds: z.string().array().optional(),
    genderIds: z.string().array().optional(),
    contactPerson: z
        .array(
            z.object({
                contactName: z.string().optional(),
                contactDesignation: z.string().optional(),
                contactEmail: z.string().optional(),
                contactNumber: z.string().optional(),
                contactLinkedin: z.string().optional(),
            })
        )
        .optional(),
});

export type TBrandFormSchema = z.infer<typeof brandFormSchema>;

export type TEditBrandformSchema = {
    id?: string;
    name?: string;
    parentOrg?: {
        id?: string;
        name?: string;
    };
    subcategory?: {
        id?: string;
        name?: string;
    }[];
    maincategory?: {
        id?: string;
        name?: string;
    }[];
    city?: {
        id?: string;
        name?: string;
    };
    state?: {
        id?: string;
        name?: string;
    };
    agency?: {
        id?: string;
        name?: string;
    };
    tier?: {
        id?: string;
        name?: string;
    }[];
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
    subPersonalityTraits?: {
        id?: string;
        name?: string;
    }[];
    mainPersonalityTraits?: {
        id?: string;
        name?: string;
    }[];
    sportsDealSummary?: {
        annualValue?: string;
        assets: {
            id?: string;
            name?: string;
        }[];
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
        commencementDate: string;
        duration: string;
        expirationDate: string;
        level: {
            id?: string;
            name?: string;
        };
        mediaLink: string;
        brandName?: {
            id?: string;
            name?: string;
        };
        status: string;
        territory?: {
            id?: string;
            name?: string;
        };
        totalValue?: string;
        type: string;
    }[];
    activationSummary?: {
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
        name: string;
        type: {
            id?: string;
            name?: string;
        }[];
        market: {
            id?: string;
            name?: string;
        }[];
        year: string;
        asset: {
            id?: string;
            name?: string;
        }[];
    }[];
    contactPersons?: {
        contactId: string;
        contactName: string;
        contactDesignation: string;
        contactEmail: string;
        contactNumber: string;
        contactLinkedin: string;
    }[];
};
