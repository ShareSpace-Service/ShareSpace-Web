import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import ErrorPage from './ErrorPage';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import SignInfo from '@/pages/SignInfo';

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
]);

export default router;
