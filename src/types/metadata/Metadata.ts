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
