import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../error/Error";
import Home from "../pages/homePage/Home";
import Register from '../authentication/Register';
import Login from '../authentication/Login';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
        }
        ,{
          path:'/login',
          element:<Login></Login>
        },{
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
  ]);

  export default router;