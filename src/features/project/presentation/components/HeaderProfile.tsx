import { useState } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import { useGetMyProjects } from "../hooks/useGetMyProjects";
import type { Project } from "../../domain/entities/Project";
import { CreateForm } from "./CreateForm";
import SVGComponent from "@/shared/components/SVGComponent";
import { useAuth } from "@/core/context/AuthContext";

export const HeaderProfile = () => {
  const { user } = useAuth();
  const { refetch } = useGetMyProjects();
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
    <div className="overflow-hidden bg-gray-900">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              Bienvenido, <br className="hidden md:block" />
              <span className="text-teal-accent-400">{user?.name}</span>
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
              Esta es tu zona de creación total: diseña proyectos desde cero,
              edítalos a tu estilo y explora lo que otros han construido. Tienes
              control completo para darle vida a tus ideas, ajustar cada detalle
              y compartir tus creaciones con quien quieras.
              <span className="text-teal-accent-400">¿Inspiración?</span> Aquí
              encontrarás proyectos increíbles para motivarte. El poder está en
              tus manos.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              aria-label="Mostrar/ocultar formulario"
              className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 cursor-pointer focus:outline-none"
            >
              ¡Crea un nuevo proyecto!
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </button>
          </div>
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
              >
                <defs>
                  <pattern
                    id="766323e1-e594-4ffd-a688-e7275079d540"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                  width="52"
                  height="24"
                />
              </svg>
              {showForm ? (
                <CreateForm
                  onSubmit={handleCreate}
                  loading={creating}
                  initialProject={editingProject || undefined}
                />
              ) : (
                <SVGComponent percental={"90%"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
