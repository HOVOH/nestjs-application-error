export class ApplicationError extends Error{
  readonly isApplicationError = true;
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}
