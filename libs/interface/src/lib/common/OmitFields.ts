import { ICommonFields } from './ICommonFields';

/**
 * ex. OmitFields<ActualInterface, OmittedInterface>
 */
export type OmitFields<T, C> = Omit<T, keyof C>;
