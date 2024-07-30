import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type TAge = {
    id: string;
    range: string;
};

type TGender = {
    id: string;
    gender: string;
};

type TCity = {
    id: string;
    name: string;
};

type TState = {
    id: string;
    name: string;
};

type TActiveCampaign = {
    id: string;
    name: string;
};

type TAgency = {
    id: string;
    name: string;
};

type TAsset = {
    id: string;
    name: string;
};

type TBroadcastPartner = {
    id: string;
    name: string;
};

type TCategory = {
    id: string;
    name: string;
};

type TFormat = {
    id: string;
    format: string;
};

type TKeyMarket = {
    id: string;
    zone: string;
};

type TLeague = {
    id: string;
    name: string;
};

type TLeagueOwner = {
    id: string;
    name: string;
};

type TMarketingPlatform = {
    id: string;
    name: string;
};

type TNCCS = {
    id: string;
    class: string;
};

type TOTTPartner = {
    id: string;
    name: string;
};

type TParentOrg = {
    id: string;
    name: string;
};

type TPersonalityTrait = {
    id: string;
    name: string;
};

type TSportsDealSummaryLevel = {
    id: string;
    name: string;
};

type TSportsDealSummaryStatus = {
    id: string;
    status: string;
};

type TSportsDealSummaryTerritory = {
    id: string;
    name: string;
};

type TSportsDealSummaryType = {
    id: string;
    name: string;
};

type TTagline = {
    id: string;
    name: string;
};

type TTeamOwner = {
    id: string;
    name: string;
};

type TTertiary = {
    id: string;
    name: string;
};

type TSport = {
    id: string;
    name: string;
};

type TTier = {
    id: string;
    name: string;
};

type TAssociationLevel = {
    id: string;
    name: string;
};

export type TMetadataStore = {
    age: TAge[];
    gender: TGender[];
    city: TCity[];
    state: TState[];
    activeCampaign: TActiveCampaign[];
    agency: TAgency[];
    asset: TAsset[];
    broadcastPartner: TBroadcastPartner[];
    category: TCategory[];
    format: TFormat[];
    keyMarkets: TKeyMarket[];
    league: TLeague[];
    leagueOwner: TLeagueOwner[];
    marketingPlatform: TMarketingPlatform[];
    nccs: TNCCS[];
    ottPartner: TOTTPartner[];
    parentOrg: TParentOrg[];
    personalityTrait: TPersonalityTrait[];
    sportsDealSummaryLevel: TSportsDealSummaryLevel[];
    sportsDealSummaryStatus: TSportsDealSummaryStatus[];
    sportsDealSummaryTerritory: TSportsDealSummaryTerritory[];
    sportsDealSummaryType: TSportsDealSummaryType[];
    tagline: TTagline[];
    teamOwner: TTeamOwner[];
    tertiary: TTertiary[];
    sport: TSport[];
    tier: TTier[];
    associationLevel: TAssociationLevel[];
} | null;

export const metadataStoreAtom = atom<TMetadataStore>({
    key: "metadataStoreAtom",
    default: null,
    effects_UNSTABLE: [persistAtom],
});
