import type { ProjectRepository } from "../repositories/ProjectRepository";
import type { Project } from "../entities/Project";

export class GetMyProjects {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }
  execute(userId: string): Promise<Project[]> {
    return this.repo.getMyProjects(userId);
  }
}
