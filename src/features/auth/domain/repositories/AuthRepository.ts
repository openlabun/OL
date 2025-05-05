import type { User } from "../entities/User";

export interface AuthRepository {
  register(email: string, password: string, name: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}
