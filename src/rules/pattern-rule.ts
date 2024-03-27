import { ValidationRule } from './validation-rule';

export class PatternRule<T extends string> implements ValidationRule<T> {
  constructor(private pattern: RegExp) {}

  validate(value: T): boolean {
    return value === undefined || value === null || this.pattern.test(value);
  }

  getErrorMessage(): string {
    return 'The field does not match the required pattern.';
  }
}
