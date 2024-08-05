import { useEffect } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import AthleteList from "../features/athlete/AthleteList";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";
import Login from "../features/auth/login/Login";
import BrandList from "../features/brand/BrandList";
import Dashboard from "../features/dashboard/Dashboard";
import { Home } from "../features/hero-section/Home";
import { HomePageLayout } from "../features/hero-section/HomePageLayout";
import LeagueForm from "../features/league/LeagueForm";
import LeagueList from "../features/league/LeagueList";
import LeagueView from "../features/league/LeagueView";
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
import AthleteView from "../features/athlete/AthleteView";
import BrandView from "../features/brand/BrandView";
import AthleteForm from "../features/athlete/AthleteForm";
import BrandForm from "../features/brand/BrandForm";
import DataEntryList from "../features/data-entry/DataEntryList";
import ActivationForm from "../features/activations/ActivationForm";

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
    {
        path: NAVIGATION_ROUTES.ACTIVATION_LIST,
        element: <LeagueList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.ACTIVATION + "/:id",
        element: <LeagueView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= activation related routes ends here ======================== =//
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
