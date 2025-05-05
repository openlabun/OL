import { useAuth } from "@/core/context/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Puedes redirigir al login si lo necesitas con react-router
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Cerrar sesión
    </button>
  );
};
