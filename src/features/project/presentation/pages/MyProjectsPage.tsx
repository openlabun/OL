import { useGetMyProjects } from "@/features/project/presentation/hooks/useGetMyProjects";
import { HeaderProfile } from "../components/HeaderProfile";
import { ProjectList } from "../components/ProjectList";

export const MyProjectsPage = () => {
  const { projects, loading: loadingProjects, refetch } = useGetMyProjects();

  return (
    <div>
      <HeaderProfile />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <p className="max-w-xl mb-4 text-base text-gray-600 md:text-lg">
          Tus proyectos:
        </p>
        <ProjectList
          projects={projects}
          loading={loadingProjects}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
};
