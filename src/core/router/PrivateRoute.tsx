import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

export const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("auth");
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem("auth");
    return <Navigate to="/login" replace />;
  }
};
