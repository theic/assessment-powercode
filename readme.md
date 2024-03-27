# Validation Library

A simple and flexible validation library for validating data schemas in TypeScript.

## Installation

To install the validation library, use the following command:

```bash
npm install assessment-powercode
```

## Usage

### Importing the Library

```typescript
import { Schema } from 'assessment-powercode';
```

### Creating a Schema

To create a schema, instantiate the `Schema` class:

```typescript
const schema = new Schema();
```

### Defining Fields and Validation Rules

Use the `field` method to define fields and chain validation rules:

```typescript
schema.field('name').required().type('string');
schema.field('age').required().type('number').custom((value) => value >= 18, 'The age must be at least 18.');
```

Available validation rules:
- `required()`: Marks the field as required.
- `type(type: string)`: Specifies the expected type of the field.
- `custom(validationFn: (value: any) => boolean, errorMessage: string)`: Adds a custom validation rule with a validation function and error message.

### Validating Data

To validate an object against the defined schema, use the `validate` method:

```typescript
const data = {
  name: 'John Doe',
  age: 25,
};

const validationResult = schema.validate(data);
console.log(validationResult);
```

The `validate` method returns an object with the following properties:
- `isValid`: A boolean indicating whether the validation passed or failed.
- `errors`: An object containing validation errors, where the keys are the field names and the values are arrays of error messages.

### Example

```typescript
import { Schema } from 'assessment-powercode';

// Example 1: Basic validation
const userSchema = new Schema<{ name: string; email: string; age: number }>();
userSchema.field('name').required().type('string');
userSchema.field('email').required().type('string').custom(value => /\S+@\S+\.\S+/.test(value), 'Invalid email format');
userSchema.field('age').required().type('number').custom(value => value >= 18, 'Age must be at least 18');

const validUser = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 25,
};

const invalidUser = {
  name: 'Jane Doe',
  email: 'invalid-email',
  age: 17,
};

console.log(userSchema.validate(validUser));
// Output: { isValid: true, errors: {} }

console.log(userSchema.validate(invalidUser));
// Output: { isValid: false, errors: { email: ['Invalid email format'], age: ['Age must be at least 18'] } }

// Example 2: Optional fields and arrays
const bookSchema = new Schema<{ title: string; author: string; genres?: string[]; publicationYear?: number }>();
bookSchema.field('title').required().type('string');
bookSchema.field('author').required().type('string');
bookSchema.field('genres').optional().array().type('string');
bookSchema.field('publicationYear').optional().type('number').custom(value => value >= 1900 && value <= new Date().getFullYear(), 'Invalid publication year');

const validBook = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  genres: ['Fiction', 'Classic'],
  publicationYear: 1925,
};

const invalidBook = {
  title: 'Invalid Book',
  author: 'Unknown Author',
  publicationYear: 2050,
};

console.log(bookSchema.validate(validBook));
// Output: { isValid: true, errors: {} }

console.log(bookSchema.validate(invalidBook));
// Output: { isValid: false, errors: { publicationYear: ['Invalid publication year'] } }
```

## Testing

The validation library comes with a test suite using the Jest testing framework. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
