import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from '../pages/Landing';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
