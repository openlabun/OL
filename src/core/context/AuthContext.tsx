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

  // Función para verificar el estado de autenticación en localStorage
  const checkToken = async () => {
    const storedToken = localStorage.getItem("auth");
    if (storedToken) {
      try {
        const userData = await getCurrentUser.execute(); // Obtenemos el usuario actual desde el contenedor
        setUser(userData); // Establecemos el usuario
      } catch (err) {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  };

  // Llamar la función para verificar el token al iniciar
  useEffect(() => {
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginUser.execute(email, password);

      localStorage.setItem("auth", user.token);
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
      localStorage.removeItem("auth");
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
  }, []);

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
