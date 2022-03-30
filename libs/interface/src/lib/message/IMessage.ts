import { ICommonFields, IID, OmitFields } from '../common';
import { IUser } from '../user';

export interface IMessage<User = IUser> extends ICommonFields {
  /**
   * Sender
   */
  from: User;

  /**
   * Receiver
   */
  to: User;

  /**
   * Subject
   */
  subject: string;

  /**
   * Message
   */
  body: string;
}

export interface IMessageCreateDTO
  extends OmitFields<IMessage<IID>, ICommonFields> {}
