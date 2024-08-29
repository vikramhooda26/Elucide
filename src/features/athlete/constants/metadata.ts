import z from "zod";

export const ATHLETE_METADATA = {
    ASSOCIATION_LEVELS: "associationLevel",
    SPORT: "sport",
    AGENCY: "agency",
    PERSONALITY_TRAIT: "personalityTrait",
    GENDER: "gender",
    NCCS: "nccs",
    KEY_MARKETS: "keyMarket",
    TERTIARY: "tertiary",
    STATE: "state",
    NATIONALITY: "nationality",
    SOCIAL_MEDIA: "socialMedia",
    ATHLETE_STATUS: "athleteStatus",
    TIER: "tier"
} as const;

export const athleteFormSchema = z.object({
    name: z.string().min(1, "Required"),
    userId: z.string().min(1, "Required"),
    sportId: z.string().optional(),
    agencyId: z.string().optional(),
    strategyOverview: z.string().optional(),
    ageIds: z.string().array().optional(),
    genderIds: z.string().array().optional(),
    athleteGenderId: z.string().optional(),
    athleteAge: z.date().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    subPersonalityTraitIds: z.string().array().optional(),
    tierIds: z.string().array().optional(),
    nccsIds: z.string().array().optional(),
    primaryMarketIds: z.string().array().optional(),
    secondaryMarketIds: z.string().array().optional(),
    tertiaryIds: z.string().array().optional(),
    stateId: z.string().optional(),
    nationalityId: z.string().optional(),
    primarySocialMediaPlatformIds: z.string().array().optional(),
    secondarySocialMediaPlatformIds: z.string().array().optional(),
    statusId: z.string().optional(),
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
        .optional()
});

export type TAthleteFormSchema = z.infer<typeof athleteFormSchema>;

export type TEditAthleteFormSchema = {
    id?: string;
    name?: string;
    nationality?: {
        id?: string;
        name?: string;
    };
    sport?: {
        id?: string;
        name?: string;
    };
    agency?: {
        id?: string;
        name?: string;
    };
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    twitter?: string;
    facebook?: string;
    strategyOverview?: string;
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
    tier?: {
        id?: string;
        name?: string;
    }[];
    age?: {
        id?: string;
        name?: string;
    }[];
    athleteAge?: string;
    mainPersonalityTraits?: {
        id?: string;
        name?: string;
        subPersonalityTraits?: {
            id?: string;
            name?: string;
        }[];
    }[];
    association?: {
        associationId?: string;
        associationLevel?: {
            id?: string;
            name?: string;
        };
        costOfAssociation?: string;
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
    sportsDealsummary?: {
        id?: string;
        annualValue?: string;
        totalValue?: string;
        assets?: {
            id: string;
            name: string;
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
    contactPersons?: {
        contactId: string;
        contactName: string;
        contactEmail?: string;
        contactLinkedin?: string;
        contactNumber?: string;
        contactDesignation?: string;
    }[];
    gender?: {
        id?: string;
        name?: string;
    }[];
    athleteGender?: {
        id?: string;
        name?: string;
    };
    nccs?: {
        id?: string;
        name?: string;
    }[];
    status?: {
        id?: string;
        name?: string;
    };
    state?: {
        id?: string;
        name?: string;
    };
};
