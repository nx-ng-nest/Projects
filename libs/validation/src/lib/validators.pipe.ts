import { ValidationPipe } from '@nestjs/common';

export const ValidateCreate = new ValidationPipe({
  transform: true,
  transformOptions: {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
    exposeDefaultValues: false,
  },
});

export const ValidateUpdate = new ValidationPipe({
  skipMissingProperties: true,
  skipNullProperties: true,
  skipUndefinedProperties: true,
  transform: true,
  transformOptions: {
    excludeExtraneousValues: true,
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  },
});
