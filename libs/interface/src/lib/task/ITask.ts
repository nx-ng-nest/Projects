import { IComment } from '../comment';
import { ICommonFields, IID, OmitFields } from '../common';
import { IUser } from '../user';
export enum TaskStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In progress',
  NEED_HELP = 'Need help',
  DONE = 'Done',
}
export interface ITask<User = IUser> extends ICommonFields {
  /**
   * Task title
   */
  title: string;

  /**
   * Task description
   */
  description: string;

  /**
   * One to many relationship with comments
   */
  comments: IComment<ITask>[];

  /**
   * Optional priority
   */
  priority: number;

  /**
   * Optional user assigned for this task
   */
  assignee: User;

  startDate: Date;

  dueDate: Date;

  status: TaskStatus;
}

export interface ITaskCreateDTO extends OmitFields<ITask<IID>, ICommonFields> {}
