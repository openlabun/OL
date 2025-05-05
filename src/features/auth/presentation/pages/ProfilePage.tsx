import { useAuth } from "../../../../core/context/AuthContext";
import { LogoutButton } from "../components/LogoutButton";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Bienvenido, {user?.name ?? user?.email}
        </h1>

        <div className="mb-4 text-gray-700 dark:text-gray-300">
          <p>UID: {user?.id}</p>
          <p>Email: {user?.email}</p>
        </div>

        <LogoutButton />
      </div>
    </main>
  );
};
