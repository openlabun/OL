import type { ProjectRepository } from "../repositories/ProjectRepository";
import type { Project } from "../entities/Project";

export class GetAllProjects {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }
  execute(): Promise<Project[]> {
    return this.repo.getAllProjects();
  }
}
