import { Schema } from '../src';

interface TestData {
  name?: string;
  age?: number;
  tags?: string[];
}

describe('Schema', () => {
  let schema: Schema<TestData>;

  beforeEach(() => {
    schema = new Schema<TestData>();
  });

  test('should validate a valid object', () => {
    schema.field('name').required().type('string');
    schema.field('age').required().type('number').custom((value) => (value as number) >= 18, 'The age must be at least 18.');

    const data: TestData = {
      name: 'John Doe',
      age: 25,
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  test('should invalidate an object with missing required fields', () => {
    schema.field('name').required().type('string');
    schema.field('age').required().type('number');

    const data: TestData = {
      name: 'John Doe',
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      age: [
        'The field is required.',
        'The field must be of type number.',
      ],
    });
  });

  test('should invalidate an object with incorrect field types', () => {
    schema.field('name').required().type('string');
    schema.field('age').required().type('number');

    const data: TestData = {
      name: 123 as unknown as string,
      age: '25' as unknown as number,
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      name: ['The field must be of type string.'],
      age: ['The field must be of type number.'],
    });
  });

  test('should invalidate an object with custom validation rules', () => {
    schema.field('age').required().type('number').custom((value) => (value ?? 0) >= 18, 'The age must be at least 18.');

    const data: TestData = {
      age: 15,
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      age: ['The age must be at least 18.'],
    });
  });

  test('should validate an object with optional fields', () => {
    schema.field('name').optional().type('string');
    schema.field('age').optional().type('number');

    const data: TestData = {
      name: 'John Doe',
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  test('should validate an object with array fields', () => {
    schema.field('tags').array().type('string');

    const data: TestData = {
      tags: ['javascript', 'typescript'],
    };

    const validationResult = schema.validate(data);

    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });
});
