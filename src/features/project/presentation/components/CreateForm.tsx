import { useEffect, useState } from "react";

import type { Project } from "../../domain/entities/Project";

interface CreateFormProps {
  onSubmit: (data: { title: string; description: string; url: string }) => void;
  loading?: boolean;
  initialProject?: Project;
}

export const CreateForm = ({
  onSubmit,
  loading = false,
  initialProject,
}: CreateFormProps) => {
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
    <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
      <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
        Tu proyecto
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-1 sm:mb-2">
          <label htmlFor="name" className="inline-block mb-1 font-medium">
            Titulo
          </label>
          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="titulo"
            name="titulo"
            required
          />
        </div>
        <div className="mb-1 sm:mb-2">
          <label className="inline-block mb-1 font-medium">Descripción</label>
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            required
          />
        </div>
        <div className="mb-1 sm:mb-2">
          <label htmlFor="password" className="inline-block mb-1 font-medium">
            Link
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="url"
              name="url"
              required
            />
          </div>
        </div>
        <div className="mt-4 mb-2 sm:mb-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
          >
            {loading ? "Cargando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};
