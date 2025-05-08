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
    <div>
      <div className="p-8 bg-white border rounded shadow-sm">
        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
          <a
            href="/"
            className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            aria-label="Category"
          >
            Desarrollo
          </a>{" "}
          <span className="text-gray-600">
            — {project.createdAt.getDate().toString().padStart(2, "0")} -{" "}
            {
              [
                "ene",
                "feb",
                "mar",
                "abr",
                "may",
                "jun",
                "jul",
                "ago",
                "sep",
                "oct",
                "nov",
                "dic",
              ][project.createdAt.getMonth()]
            }{" "}
            - {project.createdAt.getFullYear()}
          </span>
        </p>
        <a
          href="/"
          aria-label="Article"
          title="Jingle Bells"
          className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          {project.title}
        </a>
        <p className="mb-5 text-gray-700">{project.description}</p>
        <div className="flex items-center">
          <a href="/" aria-label="Author" title="Author" className="mr-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="avatar"
              className="object-cover w-10 h-10 rounded-full shadow-sm"
            />
          </a>
          <div>
            <a
              href="/"
              aria-label="Author"
              title="Author"
              className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              {project.authorName || "John Doe"}
            </a>
            <p className="text-sm font-medium leading-4 text-gray-600">Autor</p>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50">
            <svg
              className="w-12 h-12 text-teal-accent-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-semibold leading-5">{project.title}</h6>
          <p className="mb-3 text-sm text-gray-900">{project.description}</p>
        </div>
        <a
          href={project.url}
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-400"
        >
          Ir al sitio
        </a>
      </div> */}

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
