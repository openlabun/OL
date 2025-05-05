import type { Project } from "@/features/project/domain/entities/Project";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectList = ({
  projects,
  onEdit,
  onDelete,
}: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No tienes proyectos aún.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
