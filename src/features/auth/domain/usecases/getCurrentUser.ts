import type { AuthRepository } from "../repositories/AuthRepository";
import type { User } from "../entities/User";

export class GetCurrentUser {
  private authRepo: AuthRepository;
  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  execute(): User | null {
    return this.authRepo.getCurrentUser();
  }
}
