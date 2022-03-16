export enum PermissionType {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

export class Permissions {
  private toPermission(permissionType: PermissionType, resource?: string) {
    if (resource) {
      return `${permissionType}:${resource}`;
    }
    return permissionType;
  }
}
