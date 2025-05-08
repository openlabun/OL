import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import type { Project } from "../../domain/entities/Project";
import { FirebaseProjectDatasource } from "../datasources/FirebaseProjectDatasource";
import { ProjectMapper } from "../mappers/ProjectMapper";

export class ProjectRepositoryImpl implements ProjectRepository {
  private readonly datasource: FirebaseProjectDatasource;
  private readonly userId: string;

  constructor(datasource: FirebaseProjectDatasource, userId: string) {
    this.datasource = datasource;
    this.userId = userId;
  }
  async getAllProjects(): Promise<Project[]> {
    const dtos = await this.datasource.getAllProjects();
    return dtos.map(ProjectMapper.toDomain);
  }

  async create(project: Omit<Project, "id" | "createdAt">): Promise<void> {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now()),
    };
    const dto = ProjectMapper.toDTO(newProject);
    await this.datasource.create(dto);
  }

  async getMyProjects(): Promise<Project[]> {
    const dtos = await this.datasource.getMyProjects(this.userId);
    return dtos.map(ProjectMapper.toDomain);
  }

  async update(project: Project): Promise<void> {
    const dto = ProjectMapper.toDTO(project);
    await this.datasource.update(dto);
  }

  async delete(projectId: string): Promise<void> {
    await this.datasource.delete(projectId);
  }
}
