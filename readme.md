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

const schema = new Schema();
schema.field('name').required().type('string');
schema.field('age').required().type('number').custom((value) => value >= 18, 'The age must be at least 18.');

const data = {
  name: 'John Doe',
  age: 25,
};

const validationResult = schema.validate(data);
console.log(validationResult);
```

Output:
```json
{
  "isValid": true,
  "errors": {}
}
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
