// features/project/pages/MyProjectsPage.tsx

import { useState } from "react";
import { useGetMyProjects } from "@/features/project/presentation/hooks/useGetMyProjects";
import { useCreateProject } from "@/features/project/presentation/hooks/useCreateProject";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectForm } from "../components/ProjectForm";
import type { Project } from "../../domain/entities/Project";

export const MyProjectsPage = () => {
  const { projects, loading: loadingProjects, refetch } = useGetMyProjects();
  const {
    createProject,
    loading: creating,
    error,
    success,
  } = useCreateProject();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleCreate = async (data: {
    title: string;
    description: string;
    url: string;
  }) => {
    await createProject(data.title, data.description, data.url);
    if (success) {
      setShowForm(false);
      refetch();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis Proyectos</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nuevo proyecto"}
        </button>
      </div>

      {showForm && (
        <ProjectForm
          onSubmit={handleCreate}
          loading={creating}
          initialProject={editingProject || undefined}
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {loadingProjects ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
