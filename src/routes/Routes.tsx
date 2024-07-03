import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../features/auth/auth-provider/AuthProvider';
import AthleteList from '../features/athlete/AthleteList';
import BrandList from '../features/brand/BrandList';
import { routeChildrenType, routeObjType } from '../types/routes/RoutesTypes';

const routeChildren: routeChildrenType[] = [
  {
    path: '/athlete/list',
    element: <AthleteList />,
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
  const loginType = 'adminLogin';

  const routeObj: routeObjType[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [],
    },
  ];

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
    routeObj[0].element = <Navigate to="/auth/login" />
  }

  const routes = createBrowserRouter(routeObj);
  return routes;
}


export default Routes;
