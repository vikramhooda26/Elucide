import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Option } from "../../components/ui/multi-select";

const { persistAtom } = recoilPersist();

interface TAge extends Option {}

interface TGender extends Option {}

interface TCity extends Option {}

interface TState extends Option {}

interface TActiveCampaign extends Option {}

interface TAgency extends Option {}

interface TAsset extends Option {}

interface TBroadcastPartner extends Option {}

interface TCategory extends Option {}

interface TFormat extends Option {}

interface TKeyMarket extends Option {}

interface TLeague extends Option {}

interface TLeagueOwner extends Option {}

interface TMarketingPlatform extends Option {}

interface TNCCS extends Option {}

interface TOTTPartner extends Option {}

interface TParentOrg extends Option {}

interface TPersonalityTrait extends Option {}

interface TSportsDealSummaryLevel extends Option {}

interface TSportsDealSummaryStatus extends Option {}

interface TSportsDealSummaryTerritory extends Option {}

interface TSportsDealSummaryType extends Option {}

interface TTagline extends Option {}

interface TTeamOwner extends Option {}

interface TTertiary extends Option {}

interface TSport extends Option {}

interface TTier extends Option {}

interface TAssociationLevel extends Option {}

interface TCountry extends Option {}

interface TSocialMediaPlatform extends Option {}

interface TStatus extends Option {}

interface TTeam extends Option {}

interface TBrand extends Option {}

interface TAthlete extends Option {}

interface TMaincategory extends Option {}

interface TMainpersonality extends Option {}

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
  keyMarket: TKeyMarket[];
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
  nationality: TCountry[];
  socialMedia: TSocialMediaPlatform[];
  athleteStatus: TStatus[];
  team: TTeam[];
  athlete: TAthlete[];
  brand: TBrand[];
  maincategory: TMaincategory[];
  mainpersonality: TMainpersonality[];
} | null;

export const metadataStoreAtom = atom<TMetadataStore>({
  key: "metadataStoreAtom",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
