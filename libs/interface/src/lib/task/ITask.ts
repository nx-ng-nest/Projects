import { IID } from '../common';

export interface ITask extends IID {
  title: string;
  description: string;
  priority: number;
  assignee: IID;
}
