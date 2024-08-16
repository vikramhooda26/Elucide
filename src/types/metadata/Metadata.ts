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
    brand?: {
        id: string; 
        name: string;
    };
    partner?: {
        id: string; 
        name: string;
    };
    type?: string;
    status?: string | null;
    level?: {
        id: string; 
        name: string;
    };
    athlete?: {
        id: string; 
        name: string;
    };
    commencementDate?: string | null;
    expirationDate?: string | null;
    duration?: string | null;
    annualValue?: string;
    totalValue?: string;
    territory?: {
        id: string; 
        name: string;
    };
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

export type contactPersons = {
    "contactId": string;
    "contactName": string;
    "contactDesignation": string;
    "contactEmail": string;
    "contactLinkedin": string;
    "contactNumber": number;
}