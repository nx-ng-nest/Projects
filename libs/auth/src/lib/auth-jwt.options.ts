import { v4 } from 'uuid';

import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtOptions: JwtModuleOptions = Object.freeze({
  secret: process.env.JWT_SECRET || v4(),
  signOptions: {
    expiresIn: '30 days',
  },
});
