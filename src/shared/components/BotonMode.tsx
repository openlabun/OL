import { useTheme } from "@/core/context/ThemeContext";

export default function ButonMode() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="mt-4 text-sm text-gray-800 dark:text-gray-400 underline hover:text-teal-accent-700 transition-colors"
    >
      Cambiar el tema ({darkMode ? "Oscuro" : "Claro"})
    </button>
  );
}
