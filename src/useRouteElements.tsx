import { Suspense, lazy, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import PATH from './constants/path.constant';
import { AppContext } from './contexts/app.context';
import ManagementLayout from './layouts/ManagementLayout';
import Loading from './components/Loading';

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const MyDiary = lazy(() => import('./pages/MyDiary'));
const Users = lazy(() => import('./pages/Users/'));
const AddUser = lazy(() => import('./pages/AddUser/'));

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <RejectedRoute />,
      children: [],
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [],
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
      ],
    },
    {
      path: '',
      index: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: PATH.register,
      element: (
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      ),
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
