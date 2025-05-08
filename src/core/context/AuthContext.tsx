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

  // Función centralizada para cargar el usuario
  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("auth");

      if (storedToken) {
        const userData = await getCurrentUser.execute();
        console.log("Usuario obtenido:", userData);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error al cargar usuario:", err);
      localStorage.removeItem("auth");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar el usuario al montar el componente
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginUser.execute(email, password);
      localStorage.setItem("auth", user.token);
      setUser(user);
    } catch (err) {
      handleAuthError(err);
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
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logoutUser.execute();
      localStorage.removeItem("auth");
      setUser(null);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  // Función helper para manejar errores
  const handleAuthError = (err: unknown) => {
    if (err instanceof AppError) {
      setError(err.message);
    } else {
      setError("Ocurrió un error inesperado");
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
