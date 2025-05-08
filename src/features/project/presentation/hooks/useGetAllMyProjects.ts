import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import type { Project } from "@/features/project/domain/entities/Project";

export const useGetAllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const getAllProjectsUseCase = container.getAllProjectsUseCase();

      setLoading(true);
      setError(null);

      try {
        const result = await getAllProjectsUseCase.execute();
        setProjects(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleRefetch = async () => {
    const getAllProjectsUseCase = container.getAllProjectsUseCase();

    setLoading(true);
    setError(null);

    try {
      const result = await getAllProjectsUseCase.execute();
      setProjects(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refetch: () => handleRefetch(),
  };
};
