import { Field } from './field';

export class Schema<T extends Record<string, any>> {
  private fields: Record<keyof T, Field<any>> = {} as Record<keyof T, Field<any>>;

  field<K extends keyof T>(fieldName: K): Field<T[K]> {
    if (!this.fields[fieldName]) {
      this.fields[fieldName] = new Field<T[K]>();
    }
    return this.fields[fieldName] as Field<T[K]>;
  }

  validate(data: Partial<T>): { isValid: boolean; errors: Partial<Record<keyof T, string[]>> } {
    const errors: Partial<Record<keyof T, string[]>> = {};
  
    for (const fieldName in this.fields) {
      const field = this.fields[fieldName];
      const fieldValue = data[fieldName];
  
      if (field instanceof Field) {
        if (fieldValue === undefined && field.isOptional()) {
          continue;
        }
  
        const fieldErrors = field.validate(fieldValue as T[typeof fieldName]);
        if (fieldErrors.length > 0) {
          errors[fieldName] = fieldErrors;
        }
      } else if (fieldValue !== undefined) {
        const nestedSchema = field as Schema<T[typeof fieldName]>;
        const nestedResult = nestedSchema.validate(fieldValue as Partial<T[typeof fieldName]>);
        if (!nestedResult.isValid) {
          errors[fieldName] = ['Invalid nested object'];
        }
      }
    }
  
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  }
}
