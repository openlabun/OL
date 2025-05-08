// src/container.ts
import { LoginUser } from "@/features/auth/domain/usecases/loginUser";
import { RegisterUser } from "@/features/auth/domain/usecases/registerUser";
import { LogoutUser } from "@/features/auth/domain/usecases/logoutUser";
import { GetCurrentUser } from "@/features/auth/domain/usecases/getCurrentUser";
import { FirebaseAuthService } from "@/features/auth/data/firebaseAuthService";

import { CreateProject } from "@/features/project/domain/usecases/CreateProject";
import { GetMyProjects } from "@/features/project/domain/usecases/GetMyProjects";
import { UpdateProject } from "@/features/project/domain/usecases/UpdateProject";
import { DeleteProject } from "@/features/project/domain/usecases/DeleteProject";

import { ProjectRepositoryImpl } from "@/features/project/data/repositories/ProjectRepositoryImpl";
import { FirebaseProjectDatasource } from "@/features/project/data/datasources/FirebaseProjectDatasource";
import { GetAllProjects } from "@/features/project/domain/usecases/GetAllProjects";

// Crear una instancia de todos los casos de uso
export const container = {
  loginUser: new LoginUser(new FirebaseAuthService()),
  registerUser: new RegisterUser(new FirebaseAuthService()),
  logoutUser: new LogoutUser(new FirebaseAuthService()),
  getCurrentUser: new GetCurrentUser(new FirebaseAuthService()),

  getCreateProjectUseCase: (userId: string) => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(datasource, userId);
    return new CreateProject(repository);
  },

  getGetMyProjectsUseCase: (userId: string) => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(datasource, userId);
    return new GetMyProjects(repository);
  },

  getAllProjectsUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(datasource, "");
    return new GetAllProjects(repository);
  },

  getUpdateProjectUseCase: (userId: string) => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(datasource, userId);
    return new UpdateProject(repository);
  },

  getDeleteProjectUseCase: (userId: string) => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(datasource, userId);
    return new DeleteProject(repository);
  },
};
