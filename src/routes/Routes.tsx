import { Navigate, createBrowserRouter } from 'react-router-dom';
import AthleteList from '../features/athlete/AthleteList';
import { useAuth } from '../features/auth/auth-provider/AuthProvider';
import Login from '../features/auth/login/Login';
import BrandList from '../features/brand/BrandList';
import Dashboard from '../features/dashboard/Dashboard';
import Home from '../features/hero-section/Home';
import TeamList from '../features/team/TeamList';
import TemplateLayout from '../features/templates/examples/layout';
import MailPage from '../features/templates/examples/mail/page';
import TaskPage from '../features/templates/examples/tasks/page';
import MainLayout from '../layouts/MainLayout';
import ShowOffLayout from '../layouts/ShowOffLayout';
import { routeChildrenType, routeObjType } from '../types/routes/RoutesTypes';

const routeChildren: routeChildrenType[] = [
  {
    path: '/',
    element: <Dashboard />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    path: '/athlete/list',
    element: <AthleteList />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    path: '/team/list',
    element: <TeamList />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    path: '/brand/list',
    element: <BrandList />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    path: '/template',
    element: <TemplateLayout />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
    children: [
      {
        path: '/template/task',
        element: <TaskPage />,
        access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
      }
    ],
  },
  {
    path: '/task/list',
    element: <TaskPage />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
  {
    path: '/mail/list',
    element: <MailPage />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin', 'leagueLogin'],
  },
]
function Routes() {
  const { isAuthenticated } = useAuth();
  // Later take from session response.
  const loginType = 'adminLogin';

  const routeObj: routeObjType[] = [
    {
      path: '/',
      element: isAuthenticated ? <MainLayout /> : <Navigate to="/elucide/home" />,
      children: [],
    },
    {
      path: '/elucide',
      element: !isAuthenticated ? <ShowOffLayout /> : <Navigate to="/" />,
      children: [
        {
          path: '/elucide/home',
          element: <Home />,
        },
      ]
    },
    {
      // path: '/auth',
      // // element: <></>,
      // children: [
      //   {
      path: '/login',
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
      //   },
      // ]
    },
  ];

  // If user authenticated with valid login then the allowed into protected route. 
  // if (isAuthenticated) {
  const protectedRoutes: routeObjType[] = routeChildren?.filter((d: routeChildrenType,) => {
    let obj: routeObjType = { path: '', element: '' };
    if (d?.access?.indexOf(loginType) !== -1) {
      obj.path = d?.path;
      obj.element = d?.element;
      obj.children = d?.children;
      return obj;
    }
  })
  routeObj[0].children = protectedRoutes;
  // } 
  // else {
  //   // If no login detected or not a valid user then navigate/redirect to un-protected route.
  //   routeObj[0].element = <Navigate to="/elucide/login" />
  // }

  const routes = createBrowserRouter(routeObj);

  return routes;
}


export default Routes;
