import type { AuthRepository } from "../domain/repositories/AuthRepository";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { User } from "../domain/entities/User";
import { firebaseToDomainUser } from "./mappers/firebase-to-domain-user.mapper";
import { mapFirebaseErrorToAppError } from "./mappers/mapFirebaseError";

const auth = getAuth();

export class FirebaseAuthService implements AuthRepository {
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      return firebaseToDomainUser(userCredential.user);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return firebaseToDomainUser(userCredential.user);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  getCurrentUser(): User | null {
    try {
      const current = auth.currentUser;
      return current ? firebaseToDomainUser(current) : null;
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }
}
