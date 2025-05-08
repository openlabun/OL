// features/project/pages/MyProjectsPage.tsx

import { useState } from "react";
import { useGetMyProjects } from "@/features/project/presentation/hooks/useGetMyProjects";

import type { Project } from "../../domain/entities/Project";
import { ProjectList } from "../components/ProjectList";
import { useAuth } from "@/core/context/AuthContext";
import { useCreateProject } from "../hooks/useCreateProject";

export const MyProjectsPage = () => {
  const { user } = useAuth();
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
      <div className="mb-10">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 lg:w-20 lg:h-20">
          <svg
            className="w-10 h-10 text-deep-purple-accent-400 lg:w-16 lg:h-16"
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
        <div className="flex flex-col lg:flex-row">
          <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Bienvenido
              <br className="hidden md:block" />{" "}
              <span className="inline-block text-deep-purple-accent-400">
                {user?.name}
              </span>
            </h2>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Crear nuevo proyecto
            </a>
          </div>
          <div className="lg:w-1/2">
            <p className="text-base text-gray-700">
              Esta es tu zona de creación total: diseña proyectos desde cero,
              edítalos a tu estilo y explora lo que otros han construido. Tienes
              control completo para darle vida a tus ideas, ajustar cada detalle
              y compartir tus creaciones con quien quieras. ¿
              <span className="text-deep-purple-accent-400">Inspiración</span>?
              Aquí encontrarás proyectos increíbles para motivarte. El poder
              está en tus manos.
            </p>
          </div>
        </div>
      </div>
      <ProjectList projects={projects} loading={loadingProjects} />
    </div>
  );
};
