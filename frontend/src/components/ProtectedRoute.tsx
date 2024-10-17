import React, { ReactElement } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
