export type activation = {
    id?: string;
    name?: string | null;
    type?: string[];
    asset?: string[];
    year?: string | null;
    teamName?: string;
    athleteName?: string;
    leagueName?: string;
    brandName?: string;
};

export type nameAndId = { id: string; name: string };

export type personality = {
    personalityId: string;
    personalityName: string;
    subpersonalities: [nameAndId]
};

export type subPersonality = {
    id: string;
    subpersonalityName: string;
    personality: nameAndId;
};

export type sportsDealSummary = {
    id?: string;
    brandName?: string;
    partnerName?: string;
    type?: string;
    status?: string | null;
    level?: string;
    commencementDate?: string | null;
    expirationDate?: string | null;
    duration?: string | null;
    annualValue?: string;
    totalValue?: string;
    territory?: string;
    mediaLink?: string | null;
    assets?: string[];
}

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