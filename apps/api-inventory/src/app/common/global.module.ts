import {
  Global,
  Module,
} from '@nestjs/common';
import { AuthEnum } from '@projects/auth';

@Global()
@Module({
  providers: [{ provide: AuthEnum.IS_ACTIVE, useValue: true }],
  exports: [AuthEnum.IS_ACTIVE],
})
export class GlobalModule {}
