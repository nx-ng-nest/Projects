import {
  Global,
  Module,
} from '@nestjs/common';
import { AuthEnum } from '@projects/auth';

import { environment } from '../../environments/environment';

@Global()
@Module({
  providers: [
    { provide: AuthEnum.IS_ACTIVE, useValue: environment.production },
  ],
  exports: [AuthEnum.IS_ACTIVE],
})
export class GlobalModule {}
