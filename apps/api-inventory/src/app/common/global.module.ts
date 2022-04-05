import {
  Global,
  Module,
} from '@nestjs/common';
import { AuthEnum } from '@projects/auth';

@Global()
@Module({
  providers: [{ provide: AuthEnum.IS_ACTIVE, useValue: false }],
  exports: [AuthEnum.IS_ACTIVE],
})
export class GlobalModule {}
