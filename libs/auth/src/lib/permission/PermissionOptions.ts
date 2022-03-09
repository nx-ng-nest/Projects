export type PermissionOptions =
  | {
      [scope: string]:
        | {
            [resourceName: string]:
              | {
                  [method: string]: boolean;
                }
              | boolean;
          }
        | boolean;
    }
  | true;
