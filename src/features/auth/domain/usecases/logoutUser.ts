import type { AuthRepository } from "../repositories/AuthRepository";

export class LogoutUser {
  private authRepo: AuthRepository;
  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(): Promise<void> {
    await this.authRepo.logout();
  }
}
