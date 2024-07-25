import { Navigate, createBrowserRouter } from "react-router-dom";
import AthleteList from "../features/athlete/AthleteList";
import { useAuth } from "../features/auth/auth-provider/AuthProvider";
import Login from "../features/auth/login/Login";
import BrandList from "../features/brand/BrandList";
import Dashboard from "../features/dashboard/Dashboard";
import TeamList from "../features/team/TeamList";
import TemplateLayout from "../features/templates/examples/layout";
import MailPage from "../features/templates/examples/mail/page";
import TaskPage from "../features/templates/examples/tasks/page";
import MainLayout from "../layouts/main-layout/MainLayout";
import ShowOffLayout from "../layouts/showoff-layout/ShowOffLayout";
import { loginType, routeChildrenType, routeObjType } from "../types/routes/RoutesTypes";
import { Hero } from "../features/hero-section/Hero";
import AuthService from "../services/auth/AuthService";
import TeamForm from "../features/team/TeamForm";
import TeamView from "../features/team/TeamView";

const routeChildren: routeChildrenType[] = [
    {
        path: "/",
        element: <Dashboard />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: "/athlete/list",
        element: <AthleteList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= team related routes starts here ====================== =//
    {
        path: "/team/create",
        element: <TeamForm />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: "/team/list",
        element: <TeamList />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    {
        path: "/team/view/:id",
        element: <TeamView />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
    //= ============================= team related routes ends here ======================== =//
    {
        path: "/brand/list",
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
        path: "/mail/list",
        element: <MailPage />,
        access: ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"],
    },
];

const unProtectedRoute = [
    {
        path: "/elucide/home",
        element: <Hero />,
    },
    {
        path: "/elucide/login",
        element: <Login />,
    },
];

function Routes() {
    const { isAuthenticated } = useAuth();
    const user = AuthService.getUser();
    const loginRole: loginType = user?.role
    const isUserExists = Object.keys(user)?.length > 0;

    const routeObj: routeObjType[] = [
        {
            path: "/",
            element: isAuthenticated || isUserExists ? (
                <MainLayout />
            ) : (
                <Navigate to="/elucide/home" />
            ),
            children: [],
        },
        {
            path: "/elucide",
            element: !isAuthenticated || !isUserExists ? <ShowOffLayout /> : <Navigate to="/" />,
            children: unProtectedRoute,
        },
        {
            path: '*',
            element: <Navigate to="/" />
        }
    ];

    // If user authenticated with valid login then the allowed into protected route.
    if (isAuthenticated || isUserExists) {
        const protectedRoutes: routeObjType[] = routeChildren?.filter(
            (d: routeChildrenType) => {
                let obj: routeObjType = { path: "", element: "" };
                if (d?.access?.indexOf(loginRole) !== -1) {
                    obj.path = d?.path;
                    obj.element = d?.element;
                    obj.children = d?.children;
                    return obj;
                }
            }
        );
        if (protectedRoutes?.length > 0) {
            routeObj[0].children = protectedRoutes;
        } else {
            routeObj[0].element = <Navigate to="/elucide/home" />
        }
    }
    else {
        // If no login detected or not a valid user then navigate/redirect to un-protected route.
        routeObj[0].element = <Navigate to="/elucide/home" />
    }

    const routes = createBrowserRouter(routeObj);

    return routes;
}

export default Routes;
