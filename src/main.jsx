import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import { AppProvider } from './hooks/AppContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
     <RouterProvider router={router} />
     </AppProvider>
  </React.StrictMode>,
)
