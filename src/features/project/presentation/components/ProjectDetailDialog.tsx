
import type { Project } from "@/features/project/domain/entities/Project";

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectDetailDialog = ({
  project,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: Props) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <p className="text-sm text-gray-500 mb-2">
          Fecha: {project.createdAt.toLocaleDateString("es-CO")}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Autor: {project.authorName}
        </p>

        <div className="flex gap-2 justify-end mt-4">
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
      </div>
    </div>
  );
};
