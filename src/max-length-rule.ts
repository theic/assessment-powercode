import { ValidationRule } from './validation-rule';

export class MaxLengthRule<T extends string> implements ValidationRule<T> {
  constructor(private maxLength: number) {}

  validate(value: T): boolean {
    return value === undefined || value === null || value.length <= this.maxLength;
  }

  getErrorMessage(): string {
    return `The field must have a maximum length of ${this.maxLength}.`;
  }
}
