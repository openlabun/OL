import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/features/auth/presentation/pages/LoginPage";
import { RegisterPage } from "@/features/auth/presentation/pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { ProfilePage } from "@/features/auth/presentation/pages/ProfilePage";
import { MyProjectsPage } from "@/features/project/presentation/pages/MyProjectsPage"; // ✅ IMPORTACIÓN

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Privadas */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/mis-proyectos"
          element={
            <PrivateRoute>
              <MyProjectsPage />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
