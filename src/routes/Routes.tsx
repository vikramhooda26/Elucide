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
import ShowOffLayout from "../layouts/showoff-layout/ShowOffLayout";
import { routeChildrenType, routeObjType } from "../types/routes/RoutesTypes";
import { Hero } from "../features/hero-section/Hero";
import TeamForm from "../features/team/TeamForm";
import TeamView from "../features/team/TeamView";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { NAVIGATION_ROUTES, TRoles } from "../lib/constants";
import MailLayout from "../layouts/main-layout/athlete/MailLayout";

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
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.TEAM_LIST,
        element: <TeamList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: NAVIGATION_ROUTES.TEAM+'/:id',
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
        element: <Hero />,
    },
    {
        path: NAVIGATION_ROUTES.LOGIN,
        element: <Login />,
    },
];

function Routes() {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useRecoilState(userAtom);
    const loginRole: TRoles | undefined = user?.role;
    const isUserExists = Boolean(user);

    const routeObj: routeObjType[] = [
        {
            path: "/",
            element:
                isAuthenticated || isUserExists ? (
                    <MainLayout />
                ) : (
                    <Navigate to={NAVIGATION_ROUTES.HOME} />
                ),
            children: [],
        },
        {
            path: "/elucide",
            element:
                !isAuthenticated || !isUserExists ? (
                    <ShowOffLayout />
                ) : (
                    <Navigate to={NAVIGATION_ROUTES.DASHBOARD} />
                ),
            children: unProtectedRoute,
        },
        {
            path: "*",
            element:
                isAuthenticated || isUserExists ? (
                    <Navigate to={NAVIGATION_ROUTES.DASHBOARD} />
                ) : (
                    <Navigate to={NAVIGATION_ROUTES.HOME} />
                ),
        },
    ];

    // If user authenticated with valid login then the allowed into protected route.
    if (isAuthenticated || isUserExists) {
        const protectedRoutes: routeObjType[] = routeChildren?.filter(
            (route: routeChildrenType) => {
                let obj: routeObjType = { path: "", element: "" };
                if (loginRole) {
                    if (route?.access?.some((role) => loginRole === role)) {
                        obj.path = route?.path;
                        obj.element = route?.element;
                        obj.children = route?.children;
                        return obj;
                    }
                }
            }
        );
        if (protectedRoutes?.length > 0) {
            routeObj[0].children = protectedRoutes;
        } else {
            setUser(null);
            routeObj[0].element = <Navigate to={NAVIGATION_ROUTES.HOME} />;
        }
    } else {
        // If no login detected or not a valid user then navigate/redirect to un-protected route.
        routeObj[0].element = <Navigate to={NAVIGATION_ROUTES.HOME} />;
    }

    const routes = createBrowserRouter(routeObj);

    return routes;
}

export default Routes;
