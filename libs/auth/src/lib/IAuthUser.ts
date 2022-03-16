export interface IAuthUser<Permissions = any> {
  id?: number;
  username: string;
  password: string;
  permissions: Permissions;
}
