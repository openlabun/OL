import type { AuthRepository } from "../repositories/AuthRepository";
import type { User } from "../entities/User";

export class RegisterUser {
  private authRepo: AuthRepository;
  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(email: string, password: string, name: string): Promise<User> {
    return await this.authRepo.register(email, password, name);
  }
}
