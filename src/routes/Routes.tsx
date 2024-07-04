import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../features/auth/auth-provider/AuthProvider';
import AthleteList from '../features/athlete/AthleteList';
import BrandList from '../features/brand/BrandList';
import { routeChildrenType, routeObjType } from '../types/routes/RoutesTypes';
import Dashboard from '../features/dashboard/Dashboard';
import TeamList from '../features/team/TeamList';

const routeChildren: routeChildrenType[] = [
  {
    path: '/dashboard',
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
]
function Routes() {
  const { isAuthenticated } = useAuth();
  // Later take from session response.
  const loginType = 'adminLogin';

  const routeObj: routeObjType[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [],
    },
  ];

  // If user authenticated with valid login then the allowed into protected route. 
  if (isAuthenticated) {
    const protectedRoutes: routeObjType[] = routeChildren?.filter((d: routeChildrenType, i: number) => {
      let obj: routeObjType = { path: '', element: '' };
      if (d?.access?.indexOf(loginType) !== -1) {
        obj.path = d?.path;
        obj.element = d?.element;
        return obj;
      }
    })
    routeObj[0].children = protectedRoutes;
  } else {
    // If no login detected or not a valid user then navigate/redirect to un-protected route.
    routeObj[0].element = <Navigate to="/auth/login" />
  }

  const routes = createBrowserRouter(routeObj);

  return routes;
}


export default Routes;
