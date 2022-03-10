import {
  Exclude,
  Expose,
} from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { PasswordFieldValidation } from '@projects/validation';

@Exclude()
export class ResetPasswordDTO {
  @Expose()
  @ApiProperty({ default: 'password', type: 'string', format: 'password' })
  @PasswordFieldValidation()
  password: string;
}
