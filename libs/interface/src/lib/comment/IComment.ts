import { ICommonFields, OmitFields } from '../common';
import { IUser } from '../user';

export interface IComment<Target> extends ICommonFields {
  /**
   * Comment
   */
  comment: string;

  /**
   * User made the comment
   */
  user: IUser;

  /**
   * The entity on which the comment belongs to
   */
  target: Target;
}

export interface ICommentCreateDTO<Target>
  extends OmitFields<IComment<Target>, ICommonFields> {}
