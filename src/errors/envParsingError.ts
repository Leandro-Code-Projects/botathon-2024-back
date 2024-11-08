import { AppError } from "./appError";

export class EnvParsingError extends AppError {
  public name: string;
  constructor(public message: string) {
    super(message);
    this.name = "EnvParsingError";
  }
}
