import { EntityPermissionField } from './permission';

/**
 * The user details which is stored in the Auth token
 */
export interface JWTUserDetails {
  id: number;
  username: string;
  permission: EntityPermissionField;
}
