import type { Project } from "@/features/project/domain/entities/Project";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-1">
        {project.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Autor: {project.authorName} • Creado:{" "}
        {project.createdAt.toLocaleDateString()}
      </p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-2 block"
        >
          Ver proyecto
        </a>
      )}

      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
};
