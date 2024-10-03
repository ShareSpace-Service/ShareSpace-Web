import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './utils/AppRouter';

function App() {
  return (
    <div className="commonLayoutContainer">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
