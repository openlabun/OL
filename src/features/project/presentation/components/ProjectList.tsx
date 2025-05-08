import type { Project } from "@/features/project/domain/entities/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
}

export const ProjectList = ({ projects, loading }: ProjectListProps) => {
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
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
