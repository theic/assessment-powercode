import { ValidationRule } from './validation-rule';

export class MinLengthRule<T extends string> implements ValidationRule<T> {
  constructor(private minLength: number) {}

  validate(value: T): boolean {
    return value !== undefined && value !== null && value.length >= this.minLength;
  }

  getErrorMessage(): string {
    return `The field must have a minimum length of ${this.minLength}.`;
  }
}
