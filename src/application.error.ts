export class ApplicationError {
  readonly isApplicationError = true;
  code: string;
  constructor(code: string) {
    this.code = code;
  }
}
