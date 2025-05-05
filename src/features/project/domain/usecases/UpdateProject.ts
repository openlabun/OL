import type { ProjectRepository } from "../repositories/ProjectRepository";
import type { Project } from "../entities/Project";

export class UpdateProject {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }

  execute(project: Project): Promise<void> {
    return this.repo.update(project);
  }
}
