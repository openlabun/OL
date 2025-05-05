import type { User as FirebaseUser } from "firebase/auth";
import type { User } from "../../domain/entities/User";

export const firebaseToDomainUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email ?? "",
  name: firebaseUser.displayName ?? "",
});
