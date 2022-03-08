export type EntityPermissionField =
  | {
      [resourceName: string]:
        | {
            [methodName: string]:
              | {
                  [fieldName: string]: boolean;
                }
              | boolean;
          }
        | boolean;
    }
  | boolean;

export type SingleResourcePermission<ResourceNames = string> = {
  resourceName: ResourceNames;
  method?: 'get' | 'post' | 'patch' | 'delete';
};

export class PermissionManager {
  constructor(
    private readonly requiredPermission: SingleResourcePermission,
    private readonly userPermission: EntityPermissionField
  ) {}

  hasPermisison() {
    if (this.userPermission == true) {
      return true;
    }

    const { resourceName, method } = this.requiredPermission;

    if (this.userPermission[resourceName] == true) {
      return true;
    }

    if (this.userPermission[resourceName][method] == true) {
      return true;
    }

    return false;
  }
}
