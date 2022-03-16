import {
  Length,
  Matches,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';

export function PasswordFieldValidation() {
  return applyDecorators(
    Length(6, 100),
    Matches(/[0-9]{1,}/, {
      message: 'Password must contain at least one number.',
    }),
    Matches(/[A-Z]{1,}/, {
      message: 'Password must contain at least one uppsercase letter.',
    }),
    Matches(/[a-z]{1,}/, {
      message: 'Password must contain at least one lowercase letter.',
    }),
    Matches(/[!@#$%^&*(<>?)]{1,}/, {
      message: 'Password must contain at least one special character.',
    })
  );
}
