import { useEffect } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import ActivationForm from "../features/activations/ActivationForm";
import AthleteForm from "../features/athlete/AthleteForm";
import AthleteList from "../features/athlete/AthleteList";
import AthleteView from "../features/athlete/AthleteView";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";
import Login from "../features/auth/login/Login";
import BrandForm from "../features/brand/BrandForm";
import BrandList from "../features/brand/BrandList";
import BrandView from "../features/brand/BrandView";
import Dashboard from "../features/dashboard/Dashboard";
import DataEntryList from "../features/data-entry/DataEntryList";
import { Home } from "../features/hero-section/Home";
import { HomePageLayout } from "../features/hero-section/HomePageLayout";
import LeagueForm from "../features/league/LeagueForm";
import LeagueList from "../features/league/LeagueList";
import LeagueView from "../features/league/LeagueView";
import ActivationList from "../features/metadata/Activation/ActivationList";
import ActivationView from "../features/metadata/Activation/ActivationView";
import ActiveCampaignForm from "../features/metadata/ActiveCampaign/ActiveCampaignForm";
import ActiveCampaignList from "../features/metadata/ActiveCampaign/ActiveCampaignList";
import ActiveCampaignView from "../features/metadata/ActiveCampaign/ActiveCampaignView";
import AgeForm from "../features/metadata/age/AgeForm";
import AgeList from "../features/metadata/age/AgeList";
import AgeView from "../features/metadata/age/AgeView";
import GenderForm from "../features/metadata/gender/GenderForm";
import GenderList from "../features/metadata/gender/GenderList";
import GenderView from "../features/metadata/gender/GenderView";
import TeamForm from "../features/team/TeamForm";
import TeamList from "../features/team/TeamList";
import TeamView from "../features/team/TeamView";
import MailLayout from "../layouts/main-layout/athlete/MailLayout";
import MainLayout from "../layouts/main-layout/MainLayout";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES, TRoles } from "../lib/constants";
import AuthService from "../services/auth/AuthService";
import ErrorService from "../services/error/ErrorService";
import { userAtom } from "../store/atoms/user";
import { loadingBarSelector } from "../store/selectors/global";
import { routeChildrenType, routeObjType } from "../types/routes/RoutesTypes";
import PersonalityForm from "../features/metadata/personality/PersonalityForm";
import PersonalityList from "../features/metadata/personality/PersonalityList";
import PersonalityView from "../features/metadata/personality/PersonalityView";
import SportsDealSummaryForm from "../features/sports-deal-summary/SportsDealSummaryForm";

const routeChildren: routeChildrenType[] = [
    {
        path: "/",
        element: (
            <Navigate
                to={NAVIGATION_ROUTES.DASHBOARD}
                replace
            />
        ),
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.DASHBOARD,
        element: <Dashboard />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= athlete related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_ATHLETE,
        element: <AthleteForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.ATHLETE_LIST,
        element: <AthleteList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.ATHLETE + "/:id",
        element: <AthleteView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= athlete related routes ends here ======================== =//
    //= ============================= team related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_TEAM,
        element: <TeamForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
    },
    {
        path: NAVIGATION_ROUTES.TEAM_LIST,
        element: <TeamList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.TEAM + "/:id",
        element: <TeamView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= team related routes ends here ======================== =//
    //= ============================= brand related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_BRAND,
        element: <BrandForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
    },
    {
        path: NAVIGATION_ROUTES.BRAND_LIST,
        element: <BrandList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.BRAND + "/:id",
        element: <BrandView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= brand related routes ends here ======================== =//
    //= ============================= league related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_LEAGUE,
        element: <LeagueForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
    },
    {
        path: NAVIGATION_ROUTES.LEAGUE_LIST,
        element: <LeagueList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.LEAGUE + "/:id",
        element: <LeagueView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= league related routes ends here ======================== =//
    //= ============================= activation related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_ACTIVATION,
        element: <ActivationForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
    },

    //= ============================= activation related routes ends here ======================== =//

    //= ============================= sports deal summary related routes starts here ====================== =//
    {
        path: NAVIGATION_ROUTES.CREATE_SPORTS_DEAL_SUMMARY,
        element: <SportsDealSummaryForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
    },
    {
        path: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
        element: <LeagueList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY + "/:id",
        element: <LeagueView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= sports deal summary related routes ends here ======================== =//
    {
        path: NAVIGATION_ROUTES.DATA_ENTRY_LIST,
        element: <DataEntryList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
        children: [
            {
                path: NAVIGATION_ROUTES.ATHLETE_ADMIN,
                element: <AthleteList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.TEAM_ADMIN,
                element: <TeamList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.BRAND_ADMIN,
                element: <BrandList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.LEAGUE_ADMIN,
                element: <LeagueList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },

            //= ============================= age related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.AGE_CREATE,
                element: <AgeForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.AGE_EDIT + "/:id",
                element: <AgeForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.AGE_LIST,
                element: <AgeList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.AGE + "/:id",
                element: <AgeView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            //= ============================= age related routes ends here ======================== =//
            //= ============================= gender related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.GENDER_CREATE,
                element: <GenderForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.GENDER_EDIT + "/:id",
                element: <GenderForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.GENDER_LIST,
                element: <GenderList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.GENDER + "/:id",
                element: <GenderView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            //= ============================= gender related routes ends here ======================== =//
            //= ============================= activation related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.ACTIVATION_CREATE,
                element: <ActivationForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION_EDIT + "/:id",
                element: <ActivationForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION_LIST,
                element: <ActivationList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.ACTIVATION + "/:id",
                element: <ActivationView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            //= ============================= activation related routes ends here ======================== =//
            //= ============================= active campaign related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_CREATE,
                element: <ActiveCampaignForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_EDIT + "/:id",
                element: <ActiveCampaignForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN_LIST,
                element: <ActiveCampaignList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.CAMPAIGN + "/:id",
                element: <ActiveCampaignView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            //= ============================= active campaign related routes ends here ======================== =//
            //= ============================= personality related routes starts here ====================== =//
            {
                path: NAVIGATION_ROUTES.PERSONALITY_CREATE,
                element: <PersonalityForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY_EDIT + "/:id",
                element: <PersonalityForm />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF"],
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY_LIST,
                element: <PersonalityList />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
            {
                path: NAVIGATION_ROUTES.PERSONALITY + "/:id",
                element: <PersonalityView />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
        //= ============================= personality related routes ends here ======================== =//

        ]
    },
    {
        path: NAVIGATION_ROUTES.TEMP_MAIL,
        element: <MailLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
];

const unProtectedRoute = [
    {
        path: NAVIGATION_ROUTES.HOME,
        element: <Home />,
    },
    {
        path: NAVIGATION_ROUTES.LOGIN,
        element: <Login />,
    },
];

function Routes() {
    const { isAuthenticated, logout } = useAuth();
    const [user, setUser] = useRecoilState(userAtom);
    const setIsLoading = useSetRecoilState(loadingBarSelector);

    const getUserDetails = async () => {
        try {
            setIsLoading(true);
            const response = await AuthService.fetchUserDetails();
            if (response.status === HTTP_STATUS_CODES.OK) {
                setUser({
                    id: response.data.userId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role,
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
            children: route.children,
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
        },
        {
            path: "/elucide",
            element: <HomePageLayout />,
            children: unProtectedRoute,
        },
        // {
        //     path: "*",
        //     element: <Navigate to={NAVIGATION_ROUTES.HOME} />,
        // },
    ];

    return createBrowserRouter(routeObj);
}

export default Routes;
