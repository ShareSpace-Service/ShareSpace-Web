import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './utils/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="commonLayoutContainer">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
