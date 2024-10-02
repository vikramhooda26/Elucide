import { useEffect } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import GlobalErrorHandler from "../components/error/ErrorPage";
import { NotFoundPage } from "../components/not-found";
import ActivationForm from "../features/activations/ActivationForm";
import ActivationList from "../features/activations/ActivationList";
import ActivationView from "../features/activations/ActivationView";
import AthleteForm from "../features/athlete/AthleteForm";
import AthleteList from "../features/athlete/AthleteList";
import AthleteView from "../features/athlete/AthleteView";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";
import Login from "../features/auth/Login";
import SignUpPage from "../features/auth/SignUp";
import BrandForm from "../features/brand/BrandForm";
import BrandList from "../features/brand/BrandList";
import BrandView from "../features/brand/BrandView";
import AthleteDashboardLayout from "../features/dashboard/athlete/AthleteDashboardLayout";
import BrandDashboardLayout from "../features/dashboard/brand/BrandDashboardLayout";
import Dashboard from "../features/dashboard/Dashboard";
import LeagueDashboardLayout from "../features/dashboard/league/LeagueDashboardLayout";
import TeamDashboardLayout from "../features/dashboard/team/TeamDashboardLayout";
import DataEntryList from "../features/data-entry/DataEntryList";
import { Home } from "../features/hero-section/Home";
import { HomePageLayout } from "../features/hero-section/HomePageLayout";
import LeagueForm from "../features/league/LeagueForm";
import LeagueList from "../features/league/LeagueList";
import LeagueView from "../features/league/LeagueView";
import ActiveCampaignForm from "../features/metadata/ActiveCampaign/ActiveCampaignForm";
import ActiveCampaignList from "../features/metadata/ActiveCampaign/ActiveCampaignList";
import ActiveCampaignView from "../features/metadata/ActiveCampaign/ActiveCampaignView";
import AgeForm from "../features/metadata/age/AgeForm";
import AgeList from "../features/metadata/age/AgeList";
import AgeView from "../features/metadata/age/AgeView";
import AgencyForm from "../features/metadata/agency/AgencyForm";
import AgencyList from "../features/metadata/agency/AgencyList";
import AgencyView from "../features/metadata/agency/AgencyView";
import AssetForm from "../features/metadata/asset/AssetForm";
import AssetList from "../features/metadata/asset/AssetList";
import AssetView from "../features/metadata/asset/AssetView";
import AssociationLevelForm from "../features/metadata/association-level/AssociationLevelForm";
import AssociationLevelList from "../features/metadata/association-level/AssociationLevelList";
import AssociationLevelView from "../features/metadata/association-level/AssociationLevelView";
import BroadcastPartnerForm from "../features/metadata/broadcast-partner/BroadcastPartnerForm";
import BroadcastPartnerList from "../features/metadata/broadcast-partner/BroadcastPartnerList";
import BroadcastPartnerView from "../features/metadata/broadcast-partner/BroadcastPartnerView";
import CityForm from "../features/metadata/city/CityForm";
import CityList from "../features/metadata/city/CityList";
import CityView from "../features/metadata/city/CityView";
import CountryForm from "../features/metadata/country/CountryForm";
import CountryList from "../features/metadata/country/CountryList";
import CountryView from "../features/metadata/country/CountryView";
import GenderForm from "../features/metadata/gender/GenderForm";
import GenderList from "../features/metadata/gender/GenderList";
import GenderView from "../features/metadata/gender/GenderView";
import KeyMarketForm from "../features/metadata/key-market/KeyMarketForm";
import KeyMarketList from "../features/metadata/key-market/KeyMarketList";
import KeyMarketView from "../features/metadata/key-market/KeyMarketView";
import LeagueOwnerForm from "../features/metadata/league-owner/LeagueOwnerForm";
import LeagueOwnerList from "../features/metadata/league-owner/LeagueOwnerList";
import LeagueOwnerView from "../features/metadata/league-owner/LeagueOwnerView";
import LevelForm from "../features/metadata/level/LevelForm";
import LevelList from "../features/metadata/level/LevelList";
import LevelView from "../features/metadata/level/LevelView";
import MainCategoryForm from "../features/metadata/main-category/MainCategoryForm";
import MainCategoryList from "../features/metadata/main-category/MainCategoryList";
import MainCategoryView from "../features/metadata/main-category/MainCategoryView";
import MarketingPlatformForm from "../features/metadata/marketing-platform/MarketingPlatformForm";
import MarketingPlatformList from "../features/metadata/marketing-platform/MarketingPlatformList";
import MarketingPlatformView from "../features/metadata/marketing-platform/MarketingPlatformView";
import NccsForm from "../features/metadata/nccs/NccsForm";
import NccsList from "../features/metadata/nccs/NccsList";
import NccsView from "../features/metadata/nccs/NccsView";
import OttPartnerForm from "../features/metadata/ott-partner/OttPartnerForm";
import OttPartnerList from "../features/metadata/ott-partner/OttPartnerList";
import OttPartnerView from "../features/metadata/ott-partner/OttPartnerView";
import ParentOrgForm from "../features/metadata/parent-organization/ParentOrgForm";
import ParentOrgList from "../features/metadata/parent-organization/ParentOrgList";
import ParentOrgView from "../features/metadata/parent-organization/ParentOrgView";
import PersonalityForm from "../features/metadata/personality/PersonalityForm";
import PersonalityList from "../features/metadata/personality/PersonalityList";
import PersonalityView from "../features/metadata/personality/PersonalityView";
import SportForm from "../features/metadata/sport/SportForm";
import SportList from "../features/metadata/sport/SportList";
import SportView from "../features/metadata/sport/SportView";
import StateForm from "../features/metadata/state/StateForm";
import StateList from "../features/metadata/state/StateList";
import StateView from "../features/metadata/state/StateView";
import SubCategoryForm from "../features/metadata/sub-category/SubCategoryForm";
import SubCategoryList from "../features/metadata/sub-category/SubCategoryList";
import SubCategoryView from "../features/metadata/sub-category/SubCategoryView";
import SubPersonalityForm from "../features/metadata/sub-personality/SubPersonalityForm";
import SubPersonalityList from "../features/metadata/sub-personality/SubPersonalityList";
import SubPersonalityView from "../features/metadata/sub-personality/SubPersonalityView";
import TaglineForm from "../features/metadata/tagline/TaglineForm";
import TaglineList from "../features/metadata/tagline/TaglineList";
import TaglineView from "../features/metadata/tagline/TaglineView";
import TeamOwnerForm from "../features/metadata/team-owner/TeamOwnerForm";
import TeamOwnerList from "../features/metadata/team-owner/TeamOwnerList";
import TeamOwnerView from "../features/metadata/team-owner/TeamOwnerView";
import TerritoryForm from "../features/metadata/territory/TerritoryForm";
import TerritoryList from "../features/metadata/territory/TerritoryList";
import TerritoryView from "../features/metadata/territory/TerritoryView";
import TierForm from "../features/metadata/tier/TierForm";
import TierList from "../features/metadata/tier/TierList";
import TierView from "../features/metadata/tier/TierView";
import SportsDealSummaryForm from "../features/sports-deal-summary/SportsDealSummaryForm";
import SportsDealSummaryList from "../features/sports-deal-summary/SportsDealSummaryList";
import SportsDealSummaryView from "../features/sports-deal-summary/SportsDealSummaryView";
import TeamForm from "../features/team/TeamForm";
import TeamList from "../features/team/TeamList";
import TeamView from "../features/team/TeamView";
import MailLayout from "../layouts/main-layout/athlete/MailLayout";
import MainLayout from "../layouts/main-layout/MainLayout";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES, TRoles } from "../lib/constants";
import ErrorService from "../services/error/ErrorService";
import UserService from "../services/features/UserService";
import { userAtom } from "../store/atoms/user";
import { loadingBarSelector } from "../store/selectors/global";
import { routeChildrenType, routeObjType } from "../types/routes/RoutesTypes";
import UserList from "../features/user/UserList";
import Explore from "../features/explore/Explore";

const routeChildren: routeChildrenType[] = [
    {
        path: "/",
        element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },

    //= ====================== dashboard routes starts here ========================= =//
    {
        path: NAVIGATION_ROUTES.DASHBOARD,
        element: <Dashboard />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.EXPLORE,
        element: <Explore />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.BRAND_DASHBOARD,
        element: <BrandDashboardLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.League_DASHBOARD,
        element: <LeagueDashboardLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.TEAM_DASHBOARD,
        element: <TeamDashboardLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.ATHLETE_DASHBOARD,
        element: <AthleteDashboardLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    //= ====================== dashboard routes ends here ========================= =//

    //= ====================== User routes starts here ========================= =//
    {
        path: NAVIGATION_ROUTES.CREATE_USER,
        element: <SignUpPage />,
        access: ["SUPER_ADMIN"]
    },
    {
        path: NAVIGATION_ROUTES.EDIT_USER + "/:id",
        element: <SignUpPage />,
        access: ["SUPER_ADMIN"]
    },
    {
        path: NAVIGATION_ROUTES.USERS_LIST,
        element: <UserList />,
        access: ["SUPER_ADMIN"]
    },
    //= ====================== dashboard routes ends here ========================= =//

    //= ============================= athlete related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.ATHLETE_LIST,
        element: <AthleteList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.ATHLETE + "/:id",
        element: <AthleteView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    //= ============================= athlete related routes ends here ======================== =//
    //= ============================= team related routes starts here ====================== =//

    {
        path: NAVIGATION_ROUTES.TEAM_LIST,
        element: <TeamList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.TEAM + "/:id",
        element: <TeamView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    //= ============================= team related routes ends here ======================== =//
    //= ============================= brand related routes starts here ====================== =//

    {
        path: NAVIGATION_ROUTES.BRAND_LIST,
        element: <BrandList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.BRAND + "/:id",
        element: <BrandView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    //= ============================= brand related routes ends here ======================== =//
    //= ============================= league related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.LEAGUE_LIST,
        element: <LeagueList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    {
        path: NAVIGATION_ROUTES.LEAGUE + "/:id",
        element: <LeagueView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    },
    //= ============================= league related routes ends here ======================== =//

    {
        path: NAVIGATION_ROUTES.DATA_ENTRY_LIST,
        element: <DataEntryList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        children: [
            {
                path: NAVIGATION_ROUTES.CREATE_LEAGUE,
                element: <LeagueForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.EDIT_LEAGUE + "/:id",
                element: <LeagueForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.CREATE_BRAND,
                element: <BrandForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.EDIT_BRAND + "/:id",
                element: <BrandForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.ATHLETE_ADMIN,
                element: <AthleteList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.CREATE_TEAM,
                element: <TeamForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.EDIT_TEAM + "/:id",
                element: <TeamForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TEAM_ADMIN,
                element: <TeamList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.BRAND_ADMIN,
                element: <BrandList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.LEAGUE_ADMIN,
                element: <LeagueList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.CREATE_ATHLETE,
                element: <AthleteForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.EDIT_ATHLETE + "/:id",
                element: <AthleteForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            //= ============================= age related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.AGE_CREATE,
                element: <AgeForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.AGE_EDIT + "/:id",
                element: <AgeForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.AGE_LIST,
                element: <AgeList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.AGE + "/:id",
                element: <AgeView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= age related routes ends here ======================== =//
            //= ============================= gender related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.GENDER_CREATE,
                element: <GenderForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.GENDER_EDIT + "/:id",
                element: <GenderForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.GENDER_LIST,
                element: <GenderList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.GENDER + "/:id",
                element: <GenderView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= gender related routes ends here ======================== =//
            //= ============================= activation related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.ACTIVATION_CREATE,
                element: <ActivationForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION_EDIT + "/:id",
                element: <ActivationForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION_LIST,
                element: <ActivationList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION + "/:id",
                element: <ActivationView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= activation related routes ends here ======================== =//
            //= ============================= active campaign related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_CREATE,
                element: <ActiveCampaignForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_EDIT + "/:id",
                element: <ActiveCampaignForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_LIST,
                element: <ActiveCampaignList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN + "/:id",
                element: <ActiveCampaignView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= active campaign related routes ends here ======================== =//
            //= ============================= personality related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.PERSONALITY_CREATE,
                element: <PersonalityForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY_EDIT + "/:id",
                element: <PersonalityForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY_LIST,
                element: <PersonalityList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY + "/:id",
                element: <PersonalityView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION + "/:id",
                element: <ActivationView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= personality related routes ends here ======================== =//
            //= ============================= agency related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.AGENCY_CREATE,
                element: <AgencyForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.AGENCY_EDIT + "/:id",
                element: <AgencyForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.AGENCY_LIST,
                element: <AgencyList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.AGENCY + "/:id",
                element: <AgencyView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= agency related routes ends here ======================== =//
            //= ============================= asset related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.ASSET_CREATE,
                element: <AssetForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.ASSET_EDIT + "/:id",
                element: <AssetForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.ASSET_LIST,
                element: <AssetList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.ASSET + "/:id",
                element: <AssetView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= asset related routes ends here ======================== =//
            //= ============================= broadcast partner related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.BROADCAST_PARTNER_CREATE,
                element: <BroadcastPartnerForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.BROADCAST_PARTNER_EDIT + "/:id",
                element: <BroadcastPartnerForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.BROADCAST_PARTNER_LIST,
                element: <BroadcastPartnerList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.BROADCAST_PARTNER + "/:id",
                element: <BroadcastPartnerView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= broadcast partner related routes ends here ======================== =//
            //= ============================= city related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.CITY_CREATE,
                element: <CityForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.CITY_EDIT + "/:id",
                element: <CityForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.CITY_LIST,
                element: <CityList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.CITY + "/:id",
                element: <CityView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= city related routes ends here ======================== =//
            //= ============================= state related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.STATE_CREATE,
                element: <StateForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.STATE_EDIT + "/:id",
                element: <StateForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.STATE_LIST,
                element: <StateList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.STATE + "/:id",
                element: <StateView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= state related routes ends here ======================== =//
            //= ============================= sub category related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.SUB_CATEGORY_CREATE,
                element: <SubCategoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_CATEGORY_EDIT + "/:id",
                element: <SubCategoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_CATEGORY_LIST,
                element: <SubCategoryList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_CATEGORY + "/:id",
                element: <SubCategoryView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= sub category related routes ends here ======================== =//
            //= ============================= main category related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.MAIN_CATEGORY_CREATE,
                element: <MainCategoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.MAIN_CATEGORY_EDIT + "/:id",
                element: <MainCategoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.MAIN_CATEGORY_LIST,
                element: <MainCategoryList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.MAIN_CATEGORY + "/:id",
                element: <MainCategoryView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= main category related routes ends here ======================== =//
            //= ============================= nccs related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.NCCS_CREATE,
                element: <NccsForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.NCCS_EDIT + "/:id",
                element: <NccsForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.NCCS_LIST,
                element: <NccsList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.NCCS + "/:id",
                element: <NccsView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= nccs related routes ends here ======================== =//
            //= ============================= key market related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.KEY_MARKET_CREATE,
                element: <KeyMarketForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.KEY_MARKET_EDIT + "/:id",
                element: <KeyMarketForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.KEY_MARKET_LIST,
                element: <KeyMarketList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.KEY_MARKET + "/:id",
                element: <KeyMarketView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= key market related routes ends here ======================== =//
            //= ============================= league owner related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.LEAGUE_OWNER_CREATE,
                element: <LeagueOwnerForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.LEAGUE_OWNER_EDIT + "/:id",
                element: <LeagueOwnerForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.LEAGUE_OWNER_LIST,
                element: <LeagueOwnerList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.LEAGUE_OWNER + "/:id",
                element: <LeagueOwnerView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= league owner related routes ends here ======================== =//
            //= ============================= level related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.LEVEL_CREATE,
                element: <LevelForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.LEVEL_EDIT + "/:id",
                element: <LevelForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.LEVEL_LIST,
                element: <LevelList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.LEVEL + "/:id",
                element: <LevelView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= level related routes ends here ======================== =//
            //= ============================= sub personality related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.SUB_PERSONALITY_CREATE,
                element: <SubPersonalityForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_PERSONALITY_EDIT + "/:id",
                element: <SubPersonalityForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_PERSONALITY_LIST,
                element: <SubPersonalityList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.SUB_PERSONALITY + "/:id",
                element: <SubPersonalityView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= sub personality related routes ends here ======================== =//
            //= ============================= marketing platform related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.MARKETING_PLATFORM_CREATE,
                element: <MarketingPlatformForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.MARKETING_PLATFORM_EDIT + "/:id",
                element: <MarketingPlatformForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.MARKETING_PLATFORM_LIST,
                element: <MarketingPlatformList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.MARKETING_PLATFORM + "/:id",
                element: <MarketingPlatformView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= marketing platform related routes ends here ======================== =//
            //= ============================= ott partner related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.OTT_PARTNER_CREATE,
                element: <OttPartnerForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.OTT_PARTNER_EDIT + "/:id",
                element: <OttPartnerForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.OTT_PARTNER_LIST,
                element: <OttPartnerList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.OTT_PARTNER + "/:id",
                element: <OttPartnerView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= ott partner related routes ends here ======================== =//
            //= ============================= parent organization related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.PARENT_ORG_CREATE,
                element: <ParentOrgForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.PARENT_ORG_EDIT + "/:id",
                element: <ParentOrgForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.PARENT_ORG_LIST,
                element: <ParentOrgList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.PARENT_ORG + "/:id",
                element: <ParentOrgView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= parent organization related routes ends here ======================== =//
            //= ============================= sport related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.SPORT_CREATE,
                element: <SportForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.SPORT_EDIT + "/:id",
                element: <SportForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SPORT_LIST,
                element: <SportList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.SPORT + "/:id",
                element: <SportView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= sport related routes ends here ======================== =//
            //= ============================= tagline routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.TAGLINE_CREATE,
                element: <TaglineForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.TAGLINE_EDIT + "/:id",
                element: <TaglineForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TAGLINE_LIST,
                element: <TaglineList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.TAGLINE + "/:id",
                element: <TaglineView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= tagline routes ends here ======================== =//
            //= ============================= team owner routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.TEAM_OWNER_CREATE,
                element: <TeamOwnerForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.TEAM_OWNER_EDIT + "/:id",
                element: <TeamOwnerForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TEAM_OWNER_LIST,
                element: <TeamOwnerList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.TEAM_OWNER + "/:id",
                element: <TeamOwnerView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= team owner routes ends here ======================== =//
            //= ============================= territory routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.TERRITORY_CREATE,
                element: <TerritoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TERRITORY_EDIT + "/:id",
                element: <TerritoryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TERRITORY_LIST,
                element: <TerritoryList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.TERRITORY + "/:id",
                element: <TerritoryView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= territory routes ends here ======================== =//
            //= ============================= tiers routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.TIER_CREATE,
                element: <TierForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TIER_EDIT + "/:id",
                element: <TierForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.TIER_LIST,
                element: <TierList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.TIER + "/:id",
                element: <TierView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= tiers routes ends here ======================== =//
            //= ============================= countries routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.COUNTRY_CREATE,
                element: <CountryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.COUNTRY_EDIT + "/:id",
                element: <CountryForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.COUNTRY_LIST,
                element: <CountryList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.COUNTRY + "/:id",
                element: <CountryView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= countries routes ends here ======================== =//
            //= ============================= sports deal summary related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY,
                element: <SportsDealSummaryForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.EDIT_SPORTS_DEAL_SUMMARY + "/:id",
                element: <SportsDealSummaryForm />,
                access: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
                element: <SportsDealSummaryList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY + "/:id",
                element: <SportsDealSummaryView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            //= ============================= sports deal summary related routes ends here ======================== =//
            //= ============================= association level related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.ASSOCIATION_LEVEL_CREATE,
                element: <AssociationLevelForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"]
            },
            {
                path: NAVIGATION_ROUTES.ASSOCIATION_LEVEL_EDIT + "/:id",
                element: <AssociationLevelForm />,
                access: ["SUPER_ADMIN"]
            },
            {
                path: NAVIGATION_ROUTES.ASSOCIATION_LEVEL_LIST,
                element: <AssociationLevelList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            },
            {
                path: NAVIGATION_ROUTES.ASSOCIATION_LEVEL + "/:id",
                element: <AssociationLevelView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
            }
            //= ============================= association level related routes ends here ======================== =//
        ]
    },
    {
        path: NAVIGATION_ROUTES.TEMP_MAIL,
        element: <MailLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"]
    }
];

const unProtectedRoute = [
    {
        path: NAVIGATION_ROUTES.HOME,
        element: <Home />
    },
    {
        path: NAVIGATION_ROUTES.LOGIN,
        element: <Login />
    }
];

function Routes() {
    const { isAuthenticated, logout } = useAuth();
    const [user, setUser] = useRecoilState(userAtom);
    const setIsLoading = useSetRecoilState(loadingBarSelector);

    const getUserDetails = async () => {
        try {
            setIsLoading(true);
            const response = await UserService.fetchUserDetails();
            if (response.status === HTTP_STATUS_CODES.OK) {
                setUser({
                    id: response.data.userId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                });
            }
        } catch (error: any) {
            ErrorService.handleCommonErrors(error, logout);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !user?.role) {
            getUserDetails();
        }

        if (!isAuthenticated) {
            setUser(null);
        }
    }, [isAuthenticated, setUser]);

    const userRole: TRoles | undefined = user?.role;

    const protectedRoutes: routeObjType[] = routeChildren
        .filter((route: routeChildrenType) =>
            route.access.some((role) => role === userRole)
        )
        .map((route) => ({
            path: route.path,
            element: route.element,
            children: route.children
        }));

    const routeObj: routeObjType[] = [
        {
            path: "/",
            element:
                isAuthenticated && protectedRoutes.length > 0 ? (
                    <MainLayout />
                ) : (
                    <Navigate to={NAVIGATION_ROUTES.HOME} />
                ),
            children: protectedRoutes.length > 0 ? protectedRoutes : [],
            errorElement: <GlobalErrorHandler />
        },
        {
            path: "/elucide",
            element: <HomePageLayout />,
            children: unProtectedRoute
        },
        {
            path: "*",
            element: <NotFoundPage />
        }
    ];

    return createBrowserRouter(routeObj);
}

export default Routes;
