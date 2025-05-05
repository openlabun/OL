import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/context/AuthContext";
import { AppError } from "@/core/errors/AppError";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password || !displayName) {
      setError("Por favor completa todos los campos.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      await register(email, password, displayName);
      navigate("/perfil");
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto space-y-4 p-4 border rounded shadow bg-white dark:bg-gray-800"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Registrarse"}
      </button>
    </form>
  );
};
