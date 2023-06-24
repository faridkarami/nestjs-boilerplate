export class ValidationFieldErrors {
  static TYPE = {
    string: 'The entered field type must be a string',
    object: 'The entered field type must be a object',
    number: 'The entered field type must be a number',
    array: 'The entered field type must be a array',
    uuid: 'The entered field type must be a uuid',
    boolean: 'The entered field type must be a boolean',
  };
  static LENGTH = {
    min: (count = 3) =>
      `The minimum length of the entered field is ${count} characters`,
    max: (count = 255) =>
      `The maximum length of the entered field is ${count} characters`,
  };
  static OTHER = {
    empty: 'The desired field must not be empty',
    positive: 'Input must be positive',
    enum: 'The value of the field is inconsistent with the defined values',
  };
  static RANGE = {
    min: (count = 0) => `The minimum value of this range is ${count}`,
    max: (count = 75) => `The minimum value of this range is ${count}`,
  };
}
