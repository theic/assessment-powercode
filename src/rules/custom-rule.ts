import { ValidationRule } from './validation-rule';

export class CustomRule<T> implements ValidationRule<T> {
  constructor(
    private validationFn: (value: T) => boolean,
    private errorMessage: string
  ) {}

  validate(value: T): boolean {
    return this.validationFn(value);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
