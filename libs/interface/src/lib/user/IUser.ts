import { ICommonFields, OmitFields } from '../common';

export interface IUser extends ICommonFields {
  username: string;
  password: string;
  permissions: string[];
}

export interface IUserCreateDTO extends OmitFields<IUser, ICommonFields> {}
