import { Navigate, createBrowserRouter } from "react-router-dom";
import AthleteList from "../features/athlete/AthleteList";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";
import Login from "../features/auth/login/Login";
import BrandList from "../features/brand/BrandList";
import Dashboard from "../features/dashboard/Dashboard";
import TeamList from "../features/team/TeamList";
import TemplateLayout from "../features/templates/examples/layout";
import TaskPage from "../features/templates/examples/tasks/page";
import MainLayout from "../layouts/main-layout/MainLayout";
import { HomePageLayout } from "../features/hero-section/HomePageLayout";
import { routeChildrenType, routeObjType } from "../types/routes/RoutesTypes";
import { Home } from "../features/hero-section/Home";
import TeamForm from "../features/team/TeamForm";
import TeamView from "../features/team/TeamView";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES, TRoles } from "../lib/constants";
import MailLayout from "../layouts/main-layout/athlete/MailLayout";
import { useEffect } from "react";
import AuthService from "../services/auth/AuthService";
import { loadingBarSelector } from "../store/selectors/global";
import AjaxService from "../services/AjaxService";

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
    {
        path: NAVIGATION_ROUTES.ATHLETE_LIST,
        element: <AthleteList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
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
        path: NAVIGATION_ROUTES.TEAM,
        element: <TeamView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= team related routes ends here ======================== =//
    {
        path: NAVIGATION_ROUTES.BRAND_LIST,
        element: <BrandList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: "/template",
        element: <TemplateLayout />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
        children: [
            {
                path: "/template/task",
                element: <TaskPage />,
                access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
            },
        ],
    },
    {
        path: "/task/list",
        element: <TaskPage />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.LEAGUE_LIST,
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
            AjaxService.handleCommonErrors(error, logout);
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
        {
            path: "*",
            element: <Navigate to={NAVIGATION_ROUTES.HOME} />,
        },
    ];

    return createBrowserRouter(routeObj);
}

export default Routes;
