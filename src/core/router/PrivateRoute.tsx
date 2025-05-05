import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
