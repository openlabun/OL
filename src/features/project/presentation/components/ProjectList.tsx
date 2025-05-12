import type { Project } from "@/features/project/domain/entities/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import { useAuth } from "@/core/context/AuthContext";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { useGetMyProjects } from "../hooks/useGetMyProjects";

export const ProjectList = () => {
  const { user } = useAuth();

  const { projects = [], loading, refetch } = useGetMyProjects();

  const { updateProject } = useUpdateProject();

  const { deleteProject } = useDeleteProject();

  const handleEdit = async (data: Project) => {
    await updateProject(data);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  if (loading) {
    return (
      <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No tienes proyectos aún.
      </p>
    );
  }

  return (
    <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isOwner={project.authorId === user?.id}
          onClick={() => {}}
          onEdit={(data) => {
            handleEdit(data);
          }}
          onDelete={(id) => {
            handleDelete(id);
          }}
        />
      ))}
    </div>
  );
};
