import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../features/auth/auth-provider/AuthProvider';

const routeObj = [
  {
    path: '/',
    element: <MainLayout />,
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
    children: [
      //   { path: 'home', element: <Home /> },
      //   { path: 'about', element: <About /> },
    ],
  },
]
function Routes() {
  const { isAuthenticated } = useAuth();
  const loginType = 'adminLogin';

  let filterRoute = [{
    path: '/',
    element: <MainLayout />,
    children: [],
  }];
  
  if (isAuthenticated) {
    routeObj?.map((d, i) => {
      let obj = {};
      if (d?.access?.indexOf(loginType) !== -1){
        obj = d;
      }

    })
  } else {
    <Navigate to="/auth/login" />
  }

  const routes = createBrowserRouter(filterRoute);
  return routes;
}


export default Routes;
