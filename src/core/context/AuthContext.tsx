import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/features/auth/domain/entities/User";
import { AppError } from "@/core/errors/AppError";
import { container } from "@/core/di/container";

const loginUser = container.loginUser;
const registerUser = container.registerUser;
const logoutUser = container.logoutUser;
const getCurrentUser = container.getCurrentUser;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginUser.execute(email, password);
      setUser(user);
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await registerUser.execute(email, password, name);
      setUser(user);
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logoutUser.execute();
      setUser(null);
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser.execute();
    setUser(currentUser);
    setLoading(false);
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
