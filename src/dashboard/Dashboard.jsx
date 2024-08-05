import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

// import useCard from "../hooks/useCard";

const Dashboard = () => {
  // TODO: get isAdmin value from the db
  const [isAdmin] = useAdmin();
  //   const [cart] = useCard()

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-sky-400">
        <ul className="menu">
          {isAdmin ? (
            <>

              <li>
                <NavLink to="/dashboard/addProduct">Add Product</NavLink>
              </li> 
              <li>
                <NavLink to="/dashboard/allUsers">All Users</NavLink>
              </li> 
              <li>
                <NavLink to="/dashboard/allOrder">All orders</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/customer">Customers</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/productPage">All Product</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/salesAmount">
                 Sales Amount
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/profile">
                  Participent Profile
                </NavLink>
              </li>
               
        
            </>
          )}
          {/* shared li */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
