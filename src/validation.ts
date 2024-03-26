interface ValidationRule {
  validate(value: any): boolean;
  getErrorMessage(): string;
}

class RequiredRule implements ValidationRule {
  validate(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  getErrorMessage(): string {
    return 'The field is required.';
  }
}

class TypeRule implements ValidationRule {
  constructor(private type: string) {}

  validate(value: any): boolean {
    return typeof value === this.type;
  }

  getErrorMessage(): string {
    return `The field must be of type ${this.type}.`;
  }
}

class CustomRule implements ValidationRule {
  constructor(
    private validationFn: (value: any) => boolean,
    private errorMessage: string
  ) {}

  validate(value: any): boolean {
    return this.validationFn(value);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}

class MinLengthRule implements ValidationRule {
  constructor(private minLength: number) {}

  validate(value: any): boolean {
    return (
      value !== undefined && value !== null && value.length >= this.minLength
    );
  }

  getErrorMessage(): string {
    return `The field must have a minimum length of ${this.minLength}.`;
  }
}

class MaxLengthRule implements ValidationRule {
  constructor(private maxLength: number) {}

  validate(value: any): boolean {
    return (
      value === undefined || value === null || value.length <= this.maxLength
    );
  }

  getErrorMessage(): string {
    return `The field must have a maximum length of ${this.maxLength}.`;
  }
}

class PatternRule implements ValidationRule {
  constructor(private pattern: RegExp) {}

  validate(value: any): boolean {
    return value === undefined || value === null || this.pattern.test(value);
  }

  getErrorMessage(): string {
    return 'The field does not match the required pattern.';
  }
}

class Field {
  private rules: ValidationRule[] = [];

  required(): Field {
    this.rules.push(new RequiredRule());
    return this;
  }

  type(type: string): Field {
    this.rules.push(new TypeRule(type));
    return this;
  }

  custom(validationFn: (value: any) => boolean, errorMessage: string): Field {
    this.rules.push(new CustomRule(validationFn, errorMessage));
    return this;
  }

  validate(value: any): string[] {
    const errors: string[] = [];

    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        errors.push(rule.getErrorMessage());
      }
    }

    return errors;
  }

  minLength(minLength: number): Field {
    this.rules.push(new MinLengthRule(minLength));
    return this;
  }

  maxLength(maxLength: number): Field {
    this.rules.push(new MaxLengthRule(maxLength));
    return this;
  }

  pattern(pattern: RegExp): Field {
    this.rules.push(new PatternRule(pattern));
    return this;
  }
}

class Schema {
  private fields: {[key: string]: Field} = {};

  field(fieldName: string): Field {
    if (!this.fields[fieldName]) {
      this.fields[fieldName] = new Field();
    }
    return this.fields[fieldName];
  }

  validate(data: any): {isValid: boolean; errors: {[key: string]: string[]}} {
    const errors: {[key: string]: string[]} = {};

    for (const fieldName in this.fields) {
      const field = this.fields[fieldName];
      const fieldValue = data[fieldName];
      const fieldErrors = field.validate(fieldValue);

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    }

    const isValid = Object.keys(errors).length === 0;
    return {isValid, errors};
  }
}

export {
  Schema,
  Field,
  RequiredRule,
  TypeRule,
  CustomRule,
  MinLengthRule,
  MaxLengthRule,
  PatternRule,
};
