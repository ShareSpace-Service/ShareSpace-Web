import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import ErrorPage from './ErrorPage';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import SignInfo from '@/pages/SignInfo';
import EmailVerify from '@/pages/EmailVerify';
import GuestHome from '@/guest/pages/GuestHome';
import Layout from '@/layout/Layout';
import GuestProductRegist from '@/guest/pages/GuestProductRegist';
import GuestPlace from '@/guest/pages/GuestPlace';
import Profile from '@/pages/Profile';
import Note from '@/pages/Note';
import GuestPlaceFilter from '@/guest/pages/GuestPlaceFilter';
import ProductWrapper from '@/component/wrapper/ProductWrapper';
import PlaceRegister from '@/pages/PlaceRegister';
import HomeWrapper from '@/component/wrapper/HomeWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/createaccount',
    element: <SignInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/emailverify',
    element: <EmailVerify />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/place-register',
    element: <PlaceRegister />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: (
      <Layout>
        <HomeWrapper />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/productregist',
    element: (
      <Layout>
        <GuestProductRegist />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/placelist',
    element: (
      <Layout>
        <GuestPlace />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/matching/by-place',
    element: (
      <Layout>
        <GuestPlaceFilter />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/product',
    element: <ProductWrapper />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/message',
    element: (
      <Layout>
        <Note />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
