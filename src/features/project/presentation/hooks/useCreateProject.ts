import { useState } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { container } from "@/core/di/container";

export const useCreateProject = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createProject = async (
    title: string,
    description: string,
    url: string
  ): Promise<void | null> => {
    if (!user) {
      setError("Usuario no autenticado.");
      return null;
    }

    const createProjectUseCase = container.getCreateProjectUseCase(user.id);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        title,
        description,
        url,
        authorId: user.id,
        authorName: user.name,
      };
      await createProjectUseCase.execute(payload);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
    success,
  };
};
