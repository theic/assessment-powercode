import {
  CustomRule,
  MaxLengthRule,
  MinLengthRule,
  PatternRule,
  RequiredRule,
  TypeRule,
  ValidationRule,
} from './rules';

export class Field<T> {
  private rules: ValidationRule<T>[] = [];

  required(): Field<T> {
    this.rules.push(new RequiredRule<T>());
    return this;
  }

  optional(): Field<T | undefined> {
    this.rules = this.rules.filter((rule) => !(rule instanceof RequiredRule));
    return this as unknown as Field<T | undefined>;
  }

  array(): Field<T[]> {
    return this as unknown as Field<T[]>;
  }

  type(type: string): Field<T> {
    this.rules.push(new TypeRule<T>(type));
    return this;
  }

  custom(validationFn: (value: T) => boolean, errorMessage: string): Field<T> {
    this.rules.push(new CustomRule<T>(validationFn, errorMessage));
    return this;
  }

  minLength(minLength: number): Field<T & string> {
    this.rules.push(new MinLengthRule<T & string>(minLength));
    return this as unknown as Field<T & string>;
  }

  maxLength(maxLength: number): Field<T & string> {
    this.rules.push(new MaxLengthRule<T & string>(maxLength));
    return this as unknown as Field<T & string>;
  }

  pattern(pattern: RegExp): Field<T & string> {
    this.rules.push(new PatternRule<T & string>(pattern));
    return this as unknown as Field<T & string>;
  }

  validate(value: T): string[] {
    const errors: string[] = [];

    if (Array.isArray(value)) {
      for (const item of value) {
        for (const rule of this.rules) {
          if (!rule.validate(item)) {
            errors.push(rule.getErrorMessage());
          }
        }
      }
    } else {
      for (const rule of this.rules) {
        if (!rule.validate(value)) {
          errors.push(rule.getErrorMessage());
        }
      }
    }

    return errors;
  }

  isOptional(): boolean {
    return !this.rules.some(rule => rule instanceof RequiredRule);
  }
}
