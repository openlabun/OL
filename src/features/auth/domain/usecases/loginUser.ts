import type { AuthRepository } from "../repositories/AuthRepository";
import type { User } from "../entities/User";

export class LoginUser {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(email: string, password: string): Promise<User> {
    return await this.authRepo.login(email, password);
  }
}
