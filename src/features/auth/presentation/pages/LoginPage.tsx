import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Iniciar sesión
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};
