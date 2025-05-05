import type { Project } from "../../domain/entities/Project";
import type { ProjectDTO } from "../dto/ProjectDTO";

export const ProjectMapper = {
  toDTO: (project: Project): ProjectDTO => ({
    id: project.id,
    userId: project.authorId,
    title: project.title,
    description: project.description,
    createdAt: project.createdAt.toISOString(),
  }),

  toDomain: (dto: ProjectDTO): Project => ({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
    url: dto.url ?? "",
    authorId: dto.userId,
    authorName: dto.authorName ?? "",
  }),
};
