import type { ProjectRepository } from "../repositories/ProjectRepository";

export class DeleteProject {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }
  execute(projectId: string): Promise<void> {
    return this.repo.delete(projectId);
  }
}
