import {
  ArgumentMetadata,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';

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

export class QueryValidationPipe<T = any> implements PipeTransform {
  constructor(private readonly schema: ClassConstructor<T>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const instance = plainToClass(this.schema, value);
    console.log(instance);
    return value;
  }
}

// export const QueryValidationPipe = new ({
//   skipMissingProperties: true,
//   skipNullProperties: true,
//   skipUndefinedProperties: true,

//   transform: true,
//   transformOptions: {
//     groups: [TransformGroups.QUERY],
//     exposeDefaultValues: false,
//     exposeUnsetFields: false,
//   },
// });
