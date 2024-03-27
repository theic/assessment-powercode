import { ValidationRule } from './validation-rule';

export class TypeRule<T> implements ValidationRule<T> {
  constructor(private type: string) {}

  validate(value: T): boolean {
    return typeof value === this.type;
  }

  getErrorMessage(): string {
    return `The field must be of type ${this.type}.`;
  }
}
