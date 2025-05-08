// features/project/pages/MyProjectsPage.tsx

import { useState } from "react";
import { useGetMyProjects } from "@/features/project/presentation/hooks/useGetMyProjects";
import { useCreateProject } from "@/features/project/presentation/hooks/useCreateProject";
import { ProjectCard } from "../components/Blog";

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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
