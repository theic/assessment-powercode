import { ValidationRule } from './validation-rule';
import { RequiredRule } from './required-rule';
import { TypeRule } from './type-rule';
import { CustomRule } from './custom-rule';
import { MinLengthRule } from './min-length-rule';
import { MaxLengthRule } from './max-length-rule';
import { PatternRule } from './pattern-rule';

export class Field<T> {
  private rules: ValidationRule<T>[] = [];

  required(): Field<T> {
    this.rules.push(new RequiredRule<T>());
    return this;
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

    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        errors.push(rule.getErrorMessage());
      }
    }

    return errors;
  }
}
