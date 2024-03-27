import { ValidationRule } from './validation-rule';

export class RequiredRule<T> implements ValidationRule<T> {
  validate(value: T): boolean {
    return value !== undefined && value !== null && String(value).trim() !== '';
  }

  getErrorMessage(): string {
    return 'The field is required.';
  }
}
