import { Suspense, lazy, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Loading from './components/Loading';
import PATH from './constants/path.constant';
import { AppContext } from './contexts/app.context';
import ManagementLayout from './layouts/ManagementLayout';

const Login = lazy(() => import('./pages/Login/Login'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const MyDiary = lazy(() => import('./pages/MyDiary'));
const Users = lazy(() => import('./pages/Users/'));
const AddUser = lazy(() => import('./pages/AddUser/'));
const Profile = lazy(() => import('./pages/Profile'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const StatisticTool = lazy(() => import('./pages/StatisticTool'));

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.home} />;
};

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.management} />;
};

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.home,
          element: <Navigate to={PATH.login} />,
        },
        {
          path: PATH.login,
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.home,
          element: <Navigate to={PATH.management} />,
        },
        {
          path: PATH.management,
          element: <ManagementLayout></ManagementLayout>,
          children: [
            {
              path: PATH.myDiary,
              element: (
                <Suspense fallback={<Loading />}>
                  <MyDiary />
                </Suspense>
              ),
            },
            {
              path: PATH.statisticTool,
              element: (
                <Suspense fallback={<Loading />}>
                  <StatisticTool />
                </Suspense>
              ),
            },
            {
              path: PATH.users,
              element: (
                <Suspense fallback={<Loading />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: PATH.addUser,
              element: (
                <Suspense fallback={<Loading />}>
                  <AddUser />
                </Suspense>
              ),
            },
            {
              path: PATH.profile,
              element: (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              ),
            },
            {
              path: PATH.changePassword,
              element: (
                <Suspense fallback={<Loading />}>
                  <ChangePassword />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);
  return routeElements;
}
