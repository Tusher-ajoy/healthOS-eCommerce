import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
