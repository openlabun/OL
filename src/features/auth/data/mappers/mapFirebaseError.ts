import { AppError } from "@/core/errors/AppError";
import { FirebaseError } from "firebase/app";

export const mapFirebaseErrorToAppError = (error: unknown): AppError => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return new AppError("El correo ya está registrado.");
      case "auth/invalid-email":
        return new AppError("El correo ingresado no es válido.");
      case "auth/weak-password":
        return new AppError("La contraseña es demasiado débil.");
      case "auth/user-not-found":
        return new AppError("No se encontró una cuenta con ese correo.");
      case "auth/wrong-password":
        return new AppError("La contraseña es incorrecta.");
      case "auth/too-many-requests":
        return new AppError("Demasiados intentos. Inténtalo más tarde.");
      default:
        return new AppError("Ocurrió un error inesperado.");
    }
  }
  return new AppError("Ocurrió un error desconocido.");
};
