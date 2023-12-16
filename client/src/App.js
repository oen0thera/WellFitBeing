import './App.css';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import Mainpage from './components/Mainpage/Mainpage';
import {createBrowserRouter,RouterProvider,useNavigate} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Mainpage/>
  },
  {
    path: '/Join',
    element: <Join/>,
  },
  {
    path: '/Login',
    element: <Login/>,
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
