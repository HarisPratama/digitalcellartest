// import './bootstrap';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    useNavigate,
    useLocation
  } from "react-router-dom";
  import { Provider } from 'react-redux'
  
import store from './store'
import './index.scss'
import Register from './components/Register'; // Import your React component
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';

const ProtectedRoute = () => {
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();
    const location = useLocation();

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const pathname = location.pathname.split('/')[1];
        if (!token) {
            if (pathname !== 'login') {
                if (pathname !== 'register') {
                    navigate('/login')
                }
            }
        } else {
            if (pathname == 'login' || pathname == 'register') navigate('/')
        }

        setMounted(true)
    }, [])
    
    if (mounted) return <Outlet />;

    return <div className='container mx-auto  h-screen flex flex-row justify-center items-start'>
        <h1>Loading...</h1>
    </div>
};

const router = createBrowserRouter([   
    {
      path: "/",
      element: <ProtectedRoute/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "about",
            element: <About/>,
        },
        {
            path: "register",
            element: <Register/>,
        },
        {
            path: "login",
            element: <Login/>,
        },
      ]
    },
]);

const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
