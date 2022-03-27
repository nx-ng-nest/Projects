import { IID } from '../common';

export interface IMessage extends IID {
  from: IID;
  to: IID;
  subject: string;
  body: string;
}
