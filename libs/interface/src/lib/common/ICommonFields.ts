import { IID, IIDS } from './IID';
import { IStatus } from './IStatus';
import { ITimestamp } from './ITimestamp';

export interface ICommonFields extends IID, IIDS, ITimestamp, IStatus {}
