import { ValidationPipe } from '@nestjs/common';

export const CreateValidationPipe = new ValidationPipe();

export const UpdateValidationPipe = new ValidationPipe({
  skipMissingProperties: true,
  skipNullProperties: true,
  skipUndefinedProperties: true,
  transform: true,
  transformOptions: {
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  },
});
