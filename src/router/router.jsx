import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../error/Error";
import Home from "../pages/homePage/Home";
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Dashboard from '../dashboard/Dashboard';
import Allorder from '../dashboard/Allorder';
import Customer from '../dashboard/Customer';
import ProductPage from '../dashboard/ProductPage';
import SalesAmount from '../dashboard/SalesAmount';
import Profile from '../dashboard/Profile';
import { FcPrivacy } from 'react-icons/fc';
import PrivateRoute from '../provider/PrivateRoute';
import AddProduct from '../dashboard/AddProduct';
import AllUsers from '../dashboard/AllUsers';

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
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'allOrder',
          element:<Allorder></Allorder>
        },
        {
          path:'addProduct',
          element:<AddProduct></AddProduct>
        },
        {
          path:'customer',
          element:<Customer></Customer>
        },
        {
          path:'productPage',
          element:<ProductPage></ProductPage>
        },
        {
          path:'salesAmount',
          element:<SalesAmount></SalesAmount>
        },
        {
          path:'profile',
          element:<Profile></Profile>
        },
        {
          path:'allUsers',
          element:<AllUsers></AllUsers>
        }
      ]
    }
  ]);

  export default router;