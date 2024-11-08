import { Exception } from "."

export class NotFoundException extends Exception {
  constructor() {
    super(`not found`, 404)
  }
}
