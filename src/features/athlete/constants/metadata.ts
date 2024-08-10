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
    TIER: "tier",
} as const;

export const athleteFormSchema = z.object({
    name: z.string().min(1, "Required"),
    associationLevelId: z.string().optional(),
    costOfAssociation: z.string().optional(),
    userId: z.string().min(1, "Required"),
    sportId: z.string().optional(),
    agencyId: z.string().optional(),
    age: z.date().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    subPersonalityTraitIds: z.string().array().optional(),
    tierIds: z.string().array().optional(),
    genderIds: z.string().array().optional(),
    nccsIds: z.string().array().optional(),
    primaryMarketIds: z.string().array().optional(),
    secondaryMarketIds: z.string().array().optional(),
    tertiaryIds: z.string().array().optional(),
    stateId: z.string().optional(),
    nationalityId: z.string().optional(),
    primarySocialMediaPlatformIds: z.string().array().optional(),
    secondarySocialMediaPlatformIds: z.string().array().optional(),
    statusId: z.string().optional(),
    contactName: z.string().optional(),
    contactDesignation: z.string().optional(),
    contactEmail: z.string().optional(),
    contactNumber: z.string().optional(),
    contactLinkedin: z.string().optional(),
});

export type TAthleteFormSchema = z.infer<typeof athleteFormSchema>;

export type TEditAthleteFormSchema = {
    id?: string;
    name?: string;
    nationality?: string;
    associationId?: string;
    sport?: string;
    agency?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    twitter?: string;
    facebook?: string;
    primaryKeyMarket?: string[];
    secondaryKeyMarket?: string[];
    tertiary?: string[];
    primarySocialMedia?: (string | undefined)[];
    secondarySocialMedia?: (string | undefined)[];
    tier?: (string | undefined)[];
    subPersonalityTraits?: string[];
    mainPersonalityTraits?: string[];
    age?: string;
    associationLevel?: string;
    costOfAssociation?: string;
    activations?: {
        year?: string | null;
        name?: string | null;
        type?: string[];
        assets?: string[];
        market?: string[];
        brandName?: string;
        athleteName?: string;
        leagueName?: string;
        teamName?: string;
    }[];
    sportsDealsummary?: {
        annualValue?: string | null;
        totalValue?: string | null;
        assets?: string[];
        commencementDate?: string | null;
        expirationDate?: string | null;
        duration?: string | null;
        territory?: string | null;
        mediaLink?: string | null;
        level?: string | null;
        status?: string | null;
        type?: string | null;
        brandName?: string;
        athleteName?: string;
        leagueName?: string;
        teamName?: string;
    }[];
    contactPersons?: {
        id: string;
        name: string;
        email?: string;
        linkedin?: string;
        number?: string;
        designation?: string;
    }[];
    gender?: string[];
    nccs?: string[];
    primaryMarketingPlatform?: string;
    secondaryMarketingPlatform?: string;
    status?: string;
    state?: string;
};
