export interface ValidationRule<T> {
  validate(value: T): boolean;
  getErrorMessage(): string;
}
