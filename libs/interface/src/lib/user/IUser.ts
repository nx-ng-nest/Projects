import { IID } from '../common';

export interface IUser extends IID {
  username: string;
  password: string;
  permissions: string[];
}
