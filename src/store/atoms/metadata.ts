import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type TAgeRanges = {
    id: string;
    range: string;
};

type TGenders = {
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

type TTertiaries = {
    id: string;
    name: string;
};

type TSports = {
    id: string;
    name: string;
};

export type TMetadataStore = {
    ageRanges: TAgeRanges[];
    genders: TGenders[];
    cities: TCity[];
    states: TState[];
    activeCampaigns: TActiveCampaign[];
    agencies: TAgency[];
    assets: TAsset[];
    broadcastPartners: TBroadcastPartner[];
    categories: TCategory[];
    formats: TFormat[];
    keyMarkets: TKeyMarket[];
    leagues: TLeague[];
    leagueOwners: TLeagueOwner[];
    marketingPlatforms: TMarketingPlatform[];
    nccs: TNCCS[];
    ottPartners: TOTTPartner[];
    parentOrgs: TParentOrg[];
    personalityTraits: TPersonalityTrait[];
    sportsDealSummaryLevels: TSportsDealSummaryLevel[];
    sportsDealSummaryStatuses: TSportsDealSummaryStatus[];
    sportsDealSummaryTerritories: TSportsDealSummaryTerritory[];
    sportsDealSummaryTypes: TSportsDealSummaryType[];
    taglines: TTagline[];
    teamOwners: TTeamOwner[];
    tertiaries: TTertiaries[];
    sports: TSports[];
} | null;

export const metadataStoreAtom = atom<TMetadataStore>({
    key: "metadataStoreAtom",
    default: null,
    effects_UNSTABLE: [persistAtom],
});
