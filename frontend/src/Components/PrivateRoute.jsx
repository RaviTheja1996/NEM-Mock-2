import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.isAuth);
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
