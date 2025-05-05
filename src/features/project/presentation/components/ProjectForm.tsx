// features/project/components/ProjectForm.tsx

import { useState, useEffect } from "react";
import type { Project } from "@/features/project/domain/entities/Project";

interface ProjectFormProps {
  onSubmit: (data: { title: string; description: string; url: string }) => void;
  loading?: boolean;
  initialProject?: Project;
}

export const ProjectForm = ({
  onSubmit,
  loading = false,
  initialProject,
}: ProjectFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title);
      setDescription(initialProject.description);
      setUrl(initialProject.url);
    }
  }, [initialProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !url) return;
    onSubmit({ title, description, url });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        type="url"
        placeholder="URL del proyecto"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Guardando..."
          : initialProject
          ? "Actualizar"
          : "Crear proyecto"}
      </button>
    </form>
  );
};
