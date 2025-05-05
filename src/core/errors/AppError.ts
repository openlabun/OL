export class AppError extends Error {
  public message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "AppError";
  }
}
