import { IID } from '../common';

export interface ClockIn extends IID {
  start: Date;
  stop: Date;
  user: IID;
  store: IID;
}
