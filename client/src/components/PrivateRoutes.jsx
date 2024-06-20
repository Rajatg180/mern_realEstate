import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

//  this is private route which is wrapped to /profile route in App.jsx file
//  here if the current user is present then /profle route will come to <Outlet/>   else we will navigate to /sign-in route

// Navigate is component which is used to navigate
// useNavigate is hook
